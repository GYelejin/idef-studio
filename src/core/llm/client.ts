import { LlmConfig, BlockGenerationTask, ChatMessage } from './types';
import { buildProjectOverviewPrompt, buildBlockUserPrompt } from './promptBuilder';

function cleanPythonCode(raw: string): string {
  let text = raw.trim();
  const match = text.match(/```(?:python|py)?\s*([\s\S]*?)```/i);
  if (match) {
    text = match[1].trim();
  }
  // Strip any accidental IDEF0 / ICOM comments if LLM hallucinated them
  text = text
    .replace(/[ \t]*#.*(?:idef0|icom|листовой блок|activity block).*/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // If text starts before 'def ', strip any leading text up to the first 'def '
  const defIdx = text.indexOf('def ');
  if (defIdx > 0) {
    text = text.substring(defIdx);
  }

  return text;
}

export function initConversationHistory(
  config: LlmConfig,
  tasks: BlockGenerationTask[],
  projectName: string
): ChatMessage[] {
  const history: ChatMessage[] = [
    { role: 'system', content: config.systemPrompt },
    { role: 'user', content: buildProjectOverviewPrompt(tasks, projectName) },
    {
      role: 'assistant',
      content: 'Понял. Я буду пошагово реализовывать каждую функцию на русском языке без транслита, с внутренними импортами, начиная с `def` и завершая `return`, без упоминания терминов IDEF0/ICOM.',
    },
  ];
  return history;
}

async function callChatCompletions(
  config: LlmConfig,
  messages: ChatMessage[],
  signal?: AbortSignal,
  temperature = 0.2
): Promise<string> {
  let base = (config.apiUrl || '').trim().replace(/\/+$/, '');
  if (!base) {
    base = 'https://api.openai.com/v1';
  }
  const endpoint = base.endsWith('/chat/completions') ? base : `${base}/chat/completions`;

  const payload = {
    model: config.model || 'gpt-4o',
    messages,
    temperature,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (config.apiKey && config.apiKey.trim()) {
    headers['Authorization'] = `Bearer ${config.apiKey.trim()}`;
  }

  const timeoutSec = config.timeoutSeconds && config.timeoutSeconds > 0 ? config.timeoutSeconds : 120;
  const timeoutMs = timeoutSec * 1000;
  const timeoutController = new AbortController();
  const timeoutTimer = setTimeout(() => {
    timeoutController.abort(new Error(`Timeout after ${timeoutSec}s waiting for LLM response.`));
  }, timeoutMs);

  const onParentAbort = () => {
    timeoutController.abort();
  };
  if (signal) {
    signal.addEventListener('abort', onParentAbort);
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: timeoutController.signal,
    });
  } catch (err: unknown) {
    if (signal?.aborted) {
      throw new Error('Генерация отменена пользователем', { cause: err });
    }
    if (timeoutController.signal.aborted) {
      throw new Error(`Превышено время ожидания ответа (${timeoutSec} сек). Сервер или прокси не ответил вовремя.`, { cause: err });
    }
    throw err;
  } finally {
    clearTimeout(timeoutTimer);
    if (signal) {
      signal.removeEventListener('abort', onParentAbort);
    }
  }

  if (!response.ok) {
    let errDetail: string;
    try {
      const errJson = await response.json();
      errDetail = errJson.error?.message || JSON.stringify(errJson);
    } catch {
      errDetail = await response.text();
    }

    if (response.status === 504) {
      throw new Error(
        `API error 504 (Gateway Timeout): Шлюз не получил ответ от модели за ${timeoutSec} сек. Попробуйте выбрать более быструю модель (например gpt-4o-mini / deepseek-chat) или увеличить таймаут в настройках.`
      );
    }

    throw new Error(`API error (${response.status}): ${errDetail || response.statusText}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error('LLM вернул пустой ответ');
  }
  return rawContent;
}

export async function generateFunctionInChat(
  config: LlmConfig,
  task: BlockGenerationTask,
  taskIndex: number,
  totalTasks: number,
  history: ChatMessage[],
  signal?: AbortSignal
): Promise<string> {
  const userPrompt = buildBlockUserPrompt(task, taskIndex, totalTasks);
  const messagesToSend: ChatMessage[] = [...history, { role: 'user', content: userPrompt }];
  const rawContent = await callChatCompletions(config, messagesToSend, signal, 0.2);
  const cleanedCode = cleanPythonCode(rawContent);

  history.push({ role: 'user', content: userPrompt });
  history.push({ role: 'assistant', content: cleanedCode });

  return cleanedCode;
}

export interface VerificationResult {
  passed: boolean;
  issues: string[];
}

/**
 * Deterministic structural check before semantic LLM audit.
 */
export function validatePythonStructure(code: string, task: BlockGenerationTask): VerificationResult {
  const issues: string[] = [];
  if (!new RegExp(`def\\s+${task.functionName}\\s*\\(`).test(code)) {
    issues.push(`Отсутствует объявление функции def ${task.functionName}(...)`);
  }
  if (!/\breturn\b/.test(code)) {
    issues.push('Отсутствует оператор return');
  }
  if (!task.isLeaf && task.childFunctionNames && task.childFunctionNames.length > 0) {
    for (const childFn of task.childFunctionNames) {
      if (!new RegExp(`(?:^|[^\\p{L}0-9_])${childFn}\\s*\\(`, 'u').test(code)) {
        issues.push(`Родительская функция не вызывает дочернюю подпрограмму ${childFn}()`);
      }
    }
  }
  return { passed: issues.length === 0, issues };
}

/**
 * Stateless independent verification using the same LLM without generator conversation history.
 */
export async function verifyFunctionStateless(
  config: LlmConfig,
  task: BlockGenerationTask,
  code: string,
  signal?: AbortSignal
): Promise<VerificationResult> {
  const { inputs, controls, mechanisms, outputs } = task.icom;
  const childList = task.childFunctionNames?.length ? task.childFunctionNames.join(', ') : 'нет (листовой блок)';

  const verifierMessages: ChatMessage[] = [
    {
      role: 'system',
      content:
        'Ты независимый аудитор Python-кода. Ты НЕ видел историю генерации. Проверь функцию строго по спецификации: ' +
        '1) все входные, управляющие и ресурсные параметры реально используются (или имеют корректные значения по умолчанию); ' +
        '2) возвращаемое значение соответствует ожидаемым выходам; ' +
        '3) если указаны дочерние функции, они реально вызываются в теле; ' +
        '4) нет глобальных переменных и скрытых побочных эффектов. ' +
        'Ответь СТРОГО в JSON: {"verdict": "PASS" | "FAIL", "issues": ["краткое описание проблемы"]}.',
    },
    {
      role: 'user',
      content:
        `Функция: ${task.functionName} (задача: "${task.name}")\n` +
        `Входы: ${inputs.join(', ') || 'нет'}\n` +
        `Управление: ${controls.join(', ') || 'нет'}\n` +
        `Механизмы: ${mechanisms.join(', ') || 'нет'}\n` +
        `Ожидаемые выходы: ${outputs.join(', ') || 'нет'}\n` +
        `Дочерние функции для вызова: ${childList}\n\n` +
        `Код на проверку:\n\`\`\`python\n${code}\n\`\`\``,
    },
  ];

  const raw = await callChatCompletions(config, verifierMessages, signal, 0.0);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as { verdict?: string; issues?: unknown };
      const verdict = String(parsed.verdict || '').toUpperCase();
      const issues = Array.isArray(parsed.issues)
        ? parsed.issues.map((x) => String(x)).filter(Boolean)
        : [];
      if (verdict === 'PASS' && issues.length === 0) {
        return { passed: true, issues: [] };
      }
      return { passed: verdict === 'PASS', issues };
    } catch {
      // fallback below
    }
  }

  const upper = raw.toUpperCase();
  if (upper.includes('PASS') && !upper.includes('FAIL')) {
    return { passed: true, issues: [] };
  }
  return { passed: false, issues: [raw.trim().slice(0, 200)] };
}

export async function generateAndVerifyFunctionInChat(
  config: LlmConfig,
  task: BlockGenerationTask,
  taskIndex: number,
  totalTasks: number,
  history: ChatMessage[],
  signal?: AbortSignal,
  maxRepairs = 2
): Promise<{ code: string; verified: boolean; issues: string[]; repairAttempts: number }> {
  let code = await generateFunctionInChat(config, task, taskIndex, totalTasks, history, signal);
  let repairAttempts = 0;

  for (let attempt = 0; attempt <= maxRepairs; attempt++) {
    const structCheck = validatePythonStructure(code, task);
    if (!structCheck.passed) {
      if (attempt === maxRepairs) {
        return { code, verified: false, issues: structCheck.issues, repairAttempts };
      }
      repairAttempts++;
      const repairPrompt =
        `Автоматическая проверка структуры выявила ошибки в ${task.functionName}:\n` +
        structCheck.issues.map((i) => `- ${i}`).join('\n') +
        `\nИсправь функцию ${task.functionName} полностью, начиная с def и завершая return.`;
      const repairedRaw = await callChatCompletions(
        config,
        [...history, { role: 'user', content: repairPrompt }],
        signal,
        0.2
      );
      code = cleanPythonCode(repairedRaw);
      history.push({ role: 'user', content: repairPrompt });
      history.push({ role: 'assistant', content: code });
      continue;
    }

    const audit = await verifyFunctionStateless(config, task, code, signal);
    if (audit.passed || attempt === maxRepairs) {
      return { code, verified: audit.passed, issues: audit.issues, repairAttempts };
    }

    repairAttempts++;
    const repairPrompt =
      `Независимая проверка кода выявила замечания в ${task.functionName}:\n` +
      audit.issues.map((i) => `- ${i}`).join('\n') +
      `\nИсправь код функции ${task.functionName} полностью, начиная с def и завершая return.`;
    const repairedRaw = await callChatCompletions(
      config,
      [...history, { role: 'user', content: repairPrompt }],
      signal,
      0.2
    );
    code = cleanPythonCode(repairedRaw);
    history.push({ role: 'user', content: repairPrompt });
    history.push({ role: 'assistant', content: code });
  }

  return { code, verified: false, issues: [], repairAttempts };
}

function extractFunctionParams(code?: string, functionName?: string): string[] {
  if (!code || !functionName) return [];
  const regex = new RegExp(`def\\s+${functionName}\\s*\\(([^)]*)\\)`);
  const match = code.match(regex);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((s) => s.trim().split(':')[0].split('=')[0].trim())
    .filter(Boolean)
    .filter((a) => a !== '*args' && a !== '**kwargs');
}

function getSmartDefaultValue(paramName: string): string {
  const p = paramName.toLowerCase();
  if (p.includes('logic') || p.includes('логик') || p.includes('rule') || p.includes('правил') || p.includes('управлен')) {
    return '(0, 1)  # Базовая логика генерации (начальные члены F0=0, F1=1)';
  }
  if (p.includes('gen') || p.includes('ген') || p.includes('rnd') || p.includes('random') || p.includes('механизм') || p.includes('mechanism')) {
    return 'random.Random(int(input("Введите seed генератора случайных чисел [Enter: 42]: ") or "42"))';
  }
  if (p.includes('razmer') || p.includes('размер') || p.includes('size') || p.includes('dim')) {
    return 'int(input("Введите размерность матрицы (N x N) [Enter: 3]: ") or "3")';
  }
  if (p.includes('kol') || p.includes('кол') || p.includes('count') || p.includes('num') || p.includes('dlina') || p.includes('длин')) {
    return 'int(input("Введите количество элементов для генерации [Enter: 5]: ") or "5")';
  }
  if (p.includes('matrix') || p.includes('матриц')) {
    return '[[0, 0, 0], [0, 0, 0], [0, 0, 0]]  # Начальная матрица';
  }
  if (p.includes('pos') || p.includes('позиц')) {
    return '(0, 0)  # Координаты ячейки (строка, столбец)';
  }
  if (p.includes('flag') || p.includes('is_') || p.includes('has_') || p.includes('запрос') || p.includes('сигнал')) {
    return 'True  # Сигнальный флаг';
  }
  return `input("Введите значение для ${paramName}: ")`;
}

export function assembleMainPy(tasks: BlockGenerationTask[], projectName: string): string {
  let fileContent = `"""
${projectName || 'Программа'}
Сгенерировано автоматически в едином диалоговом контексте.
Стиль: чистые функции, внутренние импорты.
"""

from __future__ import annotations

# ==============================================================================
# Функции
# ==============================================================================

`;

  for (const task of tasks) {
    fileContent += `# [${task.code}] ${task.name}\n`;
    if (task.generatedCode) {
      fileContent += `${task.generatedCode.trim()}\n\n`;
    } else {
      fileContent += `def ${task.functionName}(*args, **kwargs):\n`;
      fileContent += `    raise NotImplementedError("Функция ${task.name} не реализована")\n\n`;
    }
  }

  // Root context task is the last one
  const rootTask = tasks[tasks.length - 1];

  fileContent += `# ==============================================================================\n`;
  fileContent += `# Точка входа и ввод данных\n`;
  fileContent += `# ==============================================================================\n\n`;
  fileContent += `def main() -> None:\n`;
  fileContent += `    import random\n`;
  fileContent += `    print("=== Запуск: ${projectName || 'Программа'} ===")\n\n`;

  if (rootTask) {
    const fnParams = extractFunctionParams(rootTask.generatedCode, rootTask.functionName);
    const inputs = rootTask.icom?.inputs || [];
    const controls = rootTask.icom?.controls || [];
    const mechanisms = rootTask.icom?.mechanisms || [];
    const allIcom = [...inputs, ...controls, ...mechanisms];

    fileContent += `    # Подготовка входных данных конвейера:\n`;

    if (fnParams.length > 0) {
      // If we could extract concrete parameter names from the function signature
      const argsToPass: string[] = [];
      for (const param of fnParams) {
        const val = getSmartDefaultValue(param);
        fileContent += `    ${param} = ${val}\n`;
        argsToPass.push(`${param}=${param}`);
      }
      fileContent += `\n    try:\n`;
      fileContent += `        результат = ${rootTask.functionName}(${argsToPass.join(', ')})\n`;
      fileContent += `        print("Выполнение завершено успешно:")\n`;
      fileContent += `        if isinstance(результат, list):\n`;
      fileContent += `            for строка in результат:\n`;
      fileContent += `                print(" ", строка)\n`;
      fileContent += `        else:\n`;
      fileContent += `            print(результат)\n`;
      fileContent += `    except Exception as e:\n`;
      fileContent += `        print(f"Ошибка при выполнении конвейера: {e}")\n`;
    } else if (allIcom.length > 0) {
      // In case generated code is not ready yet, scaffold parameters based on ICOM definitions
      fileContent += `    # Интерактивный ввод данных пользователем:\n`;
      fileContent += `    размер = int(input("Введите размерность матрицы (N x N) [Enter: 3]: ") or "3")\n`;
      fileContent += `    количество = int(input("Введите количество элементов для генерации [Enter: 5]: ") or "5")\n`;
      fileContent += `    генератор = random.Random(int(input("Введите seed генератора случайных чисел [Enter: 42]: ") or "42"))\n\n`;
      fileContent += `    try:\n`;
      fileContent += `        результат = ${rootTask.functionName}(\n`;
      fileContent += `            размер=размер,\n`;
      fileContent += `            количество=количество,\n`;
      fileContent += `            генератор_случайных_чисел=генератор\n`;
      fileContent += `        )\n`;
      fileContent += `        print("Выполнение завершено успешно:")\n`;
      fileContent += `        if isinstance(результат, list):\n`;
      fileContent += `            for строка in результат:\n`;
      fileContent += `                print(" ", строка)\n`;
      fileContent += `        else:\n`;
      fileContent += `            print(результат)\n`;
      fileContent += `    except TypeError:\n`;
      fileContent += `        # Альтернативный вызов по позиционным аргументам\n`;
      fileContent += `        try:\n`;
      fileContent += `            результат = ${rootTask.functionName}(размер, количество, генератор)\n`;
      fileContent += `            print("Выполнение завершено успешно:")\n`;
      fileContent += `            if isinstance(результат, list):\n`;
      fileContent += `                for строка in результат:\n`;
      fileContent += `                    print(" ", строка)\n`;
      fileContent += `            else:\n`;
      fileContent += `                print(результат)\n`;
      fileContent += `        except Exception as e:\n`;
      fileContent += `            print(f"Ошибка при вызове функции: {e}")\n`;
    } else {
      fileContent += `    try:\n`;
      fileContent += `        результат = ${rootTask.functionName}()\n`;
      fileContent += `        print("Выполнение завершено успешно:")\n`;
      fileContent += `        print(результат)\n`;
      fileContent += `    except Exception as e:\n`;
      fileContent += `        print(f"Ошибка при выполнении: {e}")\n`;
    }
  } else {
    fileContent += `    print("В конвейере нет функций.")\n`;
  }

  fileContent += `\n\nif __name__ == "__main__":\n`;
  fileContent += `    main()\n`;

  return fileContent;
}

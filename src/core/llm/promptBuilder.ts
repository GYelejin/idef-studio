import { BlockGenerationTask } from './types';

export function buildProjectOverviewPrompt(tasks: BlockGenerationTask[], projectName: string): string {
  let text = `Мы реализуем программу на языке Python: «${projectName || 'Функциональный конвейер'}».\n`;
  text += `Все функции будут реализованы пошагово снизу вверх в рамках этого диалога.\n\n`;
  text += `План реализации функций (от базовых операций до корневой функции):\n`;
  tasks.forEach((t, i) => {
    text += `  Шаг ${i + 1}: функция \`${t.functionName}\` (блок ${t.code})\n`;
  });
  text += `\nПодтверди готовность реализовывать функции по одной строго по запросу.`;
  return text;
}

export function buildBlockUserPrompt(
  task: BlockGenerationTask,
  taskIndex: number,
  totalTasks: number
): string {
  const { name, functionName, isLeaf, icom, childFunctionNames } = task;

  let prompt = `Шаг ${taskIndex + 1} из ${totalTasks}: Реализуй функцию \`def ${functionName}(...):\`.\n`;
  prompt += `Назначение: ${name}.\n\n`;

  const inFlows = [...icom.inputs, ...icom.controls, ...icom.mechanisms];
  if (inFlows.length > 0) {
    prompt += `Входные параметры: ${inFlows.join(', ')}\n`;
  } else {
    prompt += `Входные параметры: нет (используй аргументы по умолчанию при необходимости)\n`;
  }

  if (icom.outputs.length > 0) {
    prompt += `Возвращаемое значение: ${icom.outputs.join(', ')}\n\n`;
  } else {
    prompt += `Возвращаемое значение: результат вычислений\n\n`;
  }

  if (!isLeaf && childFunctionNames && childFunctionNames.length > 0) {
    prompt += `Вызовы дочерних функций:\n`;
    prompt += `Вызови и свяжи результаты ранее определенных в диалоге функций:\n`;
    for (const childFn of childFunctionNames) {
      prompt += `  - \`${childFn}\`\n`;
    }
    prompt += `Объедини их в чистый конвейер и верни итоговый результат.\n\n`;
  }

  prompt += `ТРЕБОВАНИЯ:\n`;
  prompt += `1. Имя функции: строго \`${functionName}\` (на русском языке, без транслита).\n`;
  prompt += `2. Все нужные импорты размести строго ВНУТРИ тела функции.\n`;
  prompt += `3. Функция начинается с \`def ${functionName}(...\` и завершается оператором \`return ...\`.\n`;
  prompt += `4. Никаких комментариев про IDEF0 или ICOM.\n`;
  prompt += `5. Верни ТОЛЬКО валидный код функции без лишнего текста.`;

  return prompt;
}

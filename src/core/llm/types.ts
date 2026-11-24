import { Block, Diagram, Project } from '../../types/idef0';

export interface LlmConfig {
  apiUrl: string;
  apiKey: string;
  model: string;
  timeoutSeconds: number;
  systemPrompt: string;
}

export type TaskStatus = 'pending' | 'generating' | 'completed' | 'error';

export interface BlockIcomContext {
  inputs: string[];
  controls: string[];
  mechanisms: string[];
  outputs: string[];
}

export interface BlockGenerationTask {
  id: string; // block.id
  code: string; // e.g., 'A0', 'A1', 'A31'
  name: string;
  functionName: string;
  diagramCode: string;
  diagramTitle: string;
  isLeaf: boolean;
  childBlockCodes?: string[];
  childFunctionNames?: string[];
  icom: BlockIcomContext;
  status: TaskStatus;
  generatedCode?: string;
  error?: string;
  block: Block;
  diagram: Diagram;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const DEFAULT_LLM_CONFIG: LlmConfig = {
  apiUrl: (import.meta as any).env?.VITE_LLM_API_URL || 'https://assistant.korolev-ai.bmstu.ru/v1',
  apiKey: (import.meta as any).env?.VITE_LLM_API_KEY || '',
  model: (import.meta as any).env?.VITE_LLM_MODEL || 'korolev-k5',
  timeoutSeconds: 120,
  systemPrompt: `Ты ведущий инженер функционального программирования на Python.
Мы пошагово создаем полностью РАБОЧЕЕ приложение в одном непрерывном диалоге.
На каждом шаге ты реализуешь ровно одну чистую функцию для указанной задачи.

ПРАВИЛА АРХИТЕКТУРЫ И СОВМЕСТИМОСТИ ТИПОВ:
1. Имена функций и аргументов пиши строго на русском языке в нижнем регистре (snake_case) без транслита (например: def создание_матрицы_заданного_размера_a1(...):).
2. Все необходимые модули (typing, random, math и т.д.) импортируй строго ВНУТРИ тела самой функции в ее начале.
3. Функция начинается сразу со строки def <имя_функции>(...): и завершается оператором return ...
4. Принимай стандартные типы Python: числа (int, float), списки (list), кортежи (tuple), генераторы случайных чисел (например объект random.Random или модуль random).
5. Не делай предположений о сложной внутренней структуре управляющих параметров (например, если параметр "логика_генерации", задавай разумные значения по умолчанию: начальные числа Фибоначчи 0 и 1, если передан None или строка).
6. Никаких внешних классов, глобальных переменных и побочных эффектов. Только чистый функциональный стиль.
7. Запрещено добавлять комментарии с упоминанием терминологии или методологии IDEF0/ICOM.
8. Вызывай ранее объявленные функции строго с аргументами тех типов, которые они ожидают.
9. Возвращай ИСКЛЮЧИТЕЛЬНО валидный Python-код без лишнего текста вокруг.`,
};

export const LLM_STORAGE_KEY = 'idef0_llm_config';

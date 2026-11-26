import { describe, it, expect, afterEach } from 'bun:test';
import {
  validatePythonStructure,
  verifyFunctionStateless,
  generateAndVerifyFunctionInChat,
  initConversationHistory,
  assembleMainPy,
} from '../../src/core/llm/client';
import { BlockGenerationTask, LlmConfig } from '../../src/core/llm/types';

const mockConfig: LlmConfig = {
  apiUrl: 'http://localhost:9999/v1',
  apiKey: 'test-key',
  model: 'test-model',
  timeoutSeconds: 10,
  systemPrompt: 'sys',
};

const leafTask: BlockGenerationTask = {
  id: 'b1',
  code: 'A1',
  name: 'Фильтрация',
  functionName: 'фильтрация_a1',
  diagramCode: 'A0',
  diagramTitle: 'A0',
  isLeaf: true,
  icom: {
    inputs: ['Данные'],
    controls: ['Порог'],
    mechanisms: ['Процессор'],
    outputs: ['Результат'],
  },
  status: 'pending',
  block: { id: 'b1', nodeNumber: 1, name: 'Фильтрация', x: 0, y: 0, width: 140, height: 80 },
  diagram: { id: 'd1', code: 'A0', title: 'A0', parentBlockId: null, blocks: [], arrows: [], junctions: [] },
};

const parentTask: BlockGenerationTask = {
  ...leafTask,
  id: 'b0',
  code: 'A0',
  name: 'Конвейер',
  functionName: 'конвейер_a0',
  isLeaf: false,
  childFunctionNames: ['фильтрация_a1'],
};

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('LLM Stateless Verifier & Repair Loop', () => {
  it('validatePythonStructure catches missing def, return, and child calls', () => {
    const badLeaf = validatePythonStructure('print(1)', leafTask);
    expect(badLeaf.passed).toBe(false);
    expect(badLeaf.issues.length).toBe(2);

    const badParent = validatePythonStructure('def конвейер_a0(x):\n    return x', parentTask);
    expect(badParent.passed).toBe(false);
    expect(badParent.issues.some((i) => i.includes('фильтрация_a1'))).toBe(true);

    const badClass = validatePythonStructure('class Foo:\n    pass\ndef фильтрация_a1(x):\n    global y\n    return x', leafTask);
    expect(badClass.passed).toBe(false);
    expect(badClass.issues.length).toBe(2);

    const goodParent = validatePythonStructure(
      'def конвейер_a0(x):\n    return фильтрация_a1(x)',
      parentTask
    );
    expect(goodParent.passed).toBe(true);
  });

  it('verifyFunctionStateless calls LLM without generator history and parses PASS/FAIL JSON', async () => {
    let capturedMessagesCount = 0;
    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body || '{}'));
      capturedMessagesCount = body.messages?.length ?? 0;
      return new Response(
        JSON.stringify({
          choices: [{ message: { content: '{"verdict": "PASS", "issues": []}' } }],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }) as typeof fetch;

    const res = await verifyFunctionStateless(mockConfig, leafTask, 'def фильтрация_a1(x):\n    return x');
    expect(res.passed).toBe(true);
    expect(res.issues).toEqual([]);
    // Strictly 2 messages (system + user), no generator conversation history
    expect(capturedMessagesCount).toBe(2);
  });

  it('generateAndVerifyFunctionInChat repairs code when stateless verifier returns FAIL', async () => {
    let callNum = 0;
    globalThis.fetch = (async () => {
      callNum++;
      if (callNum === 1) {
        return new Response(
          JSON.stringify({ choices: [{ message: { content: 'def фильтрация_a1(данные):\n    return данные' } }] }),
          { status: 200 }
        );
      }
      if (callNum === 2) {
        return new Response(
          JSON.stringify({ choices: [{ message: { content: '{"verdict":"FAIL","issues":["Не используется параметр Порог"]}' } }] }),
          { status: 200 }
        );
      }
      if (callNum === 3) {
        return new Response(
          JSON.stringify({ choices: [{ message: { content: 'def фильтрация_a1(данные, порог=0):\n    return [x for x in данные if x > порог]' } }] }),
          { status: 200 }
        );
      }
      return new Response(
        JSON.stringify({ choices: [{ message: { content: '{"verdict":"PASS","issues":[]}' } }] }),
        { status: 200 }
      );
    }) as typeof fetch;

    const history = initConversationHistory(mockConfig, [leafTask], 'Test');
    const out = await generateAndVerifyFunctionInChat(mockConfig, leafTask, 0, 1, history);
    expect(out.verified).toBe(true);
    expect(out.repairAttempts).toBe(1);
    expect(out.code).toContain('порог');
  });

  it('verifyFunctionStateless routes requests to dedicated verifierModel/verifierApiUrl when configured', async () => {
    let capturedUrl = '';
    let capturedModel = '';
    let capturedAuth = '';
    globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
      capturedUrl = String(url);
      const body = JSON.parse(String(init?.body || '{}'));
      capturedModel = body.model;
      capturedAuth = String((init?.headers as Record<string, string>)?.Authorization || '');
      return new Response(
        JSON.stringify({ choices: [{ message: { content: '{"verdict": "PASS", "issues": []}' } }] }),
        { status: 200 }
      );
    }) as typeof fetch;

    const splitConfig: LlmConfig = {
      ...mockConfig,
      verifierApiUrl: 'http://verifier.local:8000/v1',
      verifierApiKey: 'verifier-secret',
      verifierModel: 'critic-model-v2',
    };

    const res = await verifyFunctionStateless(splitConfig, leafTask, 'def фильтрация_a1(x):\n    return x');
    expect(res.passed).toBe(true);
    expect(capturedUrl).toContain('http://verifier.local:8000/v1');
    expect(capturedModel).toBe('critic-model-v2');
    expect(capturedAuth).toBe('Bearer verifier-secret');
  });

  it('assembleMainPy sanitizes multiline block names and project titles into valid Python', () => {
    const multilineTask: BlockGenerationTask = {
      ...leafTask,
      name: 'Первая строка\nВторая строка блока',
      generatedCode: 'def фильтрация_a1(данные):\n    return данные',
    };
    const py = assembleMainPy([multilineTask], 'Проект\nСо второй строкой');
    expect(py).toContain('# [A1] Первая строка Вторая строка блока');
    expect(py).not.toContain('# [A1] Первая строка\nВторая строка блока');
    expect(py).toContain('print("=== Запуск: Проект Со второй строкой ==="');
  });
});

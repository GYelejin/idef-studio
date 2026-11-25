import { useRef, useState } from 'react';
import { Project } from '../../types/idef0';
import { BlockGenerationTask, DEFAULT_LLM_CONFIG, LlmConfig } from '../../core/llm/types';
import { buildBottomUpBlockTasks } from '../../core/llm/treeOrder';
import {
  assembleMainPy,
  generateAndVerifyFunctionInChat,
  initConversationHistory,
} from '../../core/llm/client';
import { saveFileNativeOrBrowser } from '../../core/filePlatform';

const LLM_STORAGE_KEY = 'idef0_llm_config_v1';

function loadInitialLlmConfig(): LlmConfig {
  if (typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(LLM_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.apiUrl === 'https://api.openai.com/v1') {
          return DEFAULT_LLM_CONFIG;
        }
        return { ...DEFAULT_LLM_CONFIG, ...parsed };
      }
    } catch {
      // ignore invalid stored config
    }
  }
  return DEFAULT_LLM_CONFIG;
}

export function useLlmGeneration(project: Project) {
  const [config, setConfig] = useState<LlmConfig>(loadInitialLlmConfig);
  const [tasks, setTasks] = useState<BlockGenerationTask[]>(() =>
    project ? buildBottomUpBlockTasks(project) : []
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(() => {
    const initial = project ? buildBottomUpBlockTasks(project) : [];
    return initial.length > 0 ? initial[0].id : null;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mainPyCode, setMainPyCode] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleConfigChange = (field: keyof LlmConfig, value: string | number) => {
    const updated = { ...config, [field]: value };
    setConfig(updated);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LLM_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleStartGeneration = async (onMissingKey: () => void) => {
    if (!config.apiKey && !config.apiUrl.includes('localhost') && !config.apiUrl.includes('127.0.0.1')) {
      alert('Укажите ключ API в настройках для вызова LLM.');
      onMissingKey();
      return;
    }

    setIsGenerating(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const updatedTasks: BlockGenerationTask[] = tasks.map((t) => ({
      ...t,
      status: 'pending',
      generatedCode: undefined,
      error: undefined,
      verificationStatus: undefined,
      verificationNotes: undefined,
      repairAttempts: undefined,
    }));
    setTasks([...updatedTasks]);

    try {
      const chatHistory = initConversationHistory(config, updatedTasks, project.name);

      for (let i = 0; i < updatedTasks.length; i++) {
        if (controller.signal.aborted) break;

        const task = updatedTasks[i];
        setSelectedTaskId(task.id);
        task.status = 'generating';
        setTasks([...updatedTasks]);

        try {
          const result = await generateAndVerifyFunctionInChat(
            config,
            task,
            i,
            updatedTasks.length,
            chatHistory,
            controller.signal
          );
          task.status = 'completed';
          task.generatedCode = result.code;
          task.verificationStatus = result.verified ? 'verified' : 'warning';
          task.verificationNotes = result.issues;
          task.repairAttempts = result.repairAttempts;
        } catch (err: unknown) {
          if (controller.signal.aborted) {
            task.status = 'pending';
            break;
          }
          task.status = 'error';
          task.error = err instanceof Error ? err.message : 'Ошибка генерации';
        }

        setTasks([...updatedTasks]);
      }

      setMainPyCode(assembleMainPy(updatedTasks, project.name));
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  };

  const handleDownloadMainPy = async () => {
    const content = mainPyCode || assembleMainPy(tasks, project.name);
    await saveFileNativeOrBrowser(
      'main.py',
      new Blob([content], { type: 'text/x-python;charset=utf-8' }),
      [{ name: 'Python Script', extensions: ['py'] }]
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetConfig = () => {
    setConfig(DEFAULT_LLM_CONFIG);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LLM_STORAGE_KEY, JSON.stringify(DEFAULT_LLM_CONFIG));
    }
  };

  return {
    config,
    tasks,
    selectedTaskId,
    setSelectedTaskId,
    isGenerating,
    copied,
    mainPyCode,
    handleConfigChange,
    resetConfig,
    handleStartGeneration,
    handleStopGeneration,
    handleDownloadMainPy,
    handleCopyCode,
  };
}

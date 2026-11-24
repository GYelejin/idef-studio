import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Wand2,
  Settings,
  Play,
  Square,
  Download,
  Copy,
  Check,
  AlertCircle,
  Code2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
  GitFork,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Box,
  CornerDownRight,
} from 'lucide-react';
import { Project } from '../../types/idef0';
import {
  LlmConfig,
  DEFAULT_LLM_CONFIG,
  LLM_STORAGE_KEY,
  BlockGenerationTask,
} from '../../core/llm/types';
import { buildBottomUpBlockTasks } from '../../core/llm/treeOrder';
import {
  initConversationHistory,
  generateFunctionInChat,
  assembleMainPy,
} from '../../core/llm/client';
import { buildPipelineTree, PipelineTreeNode } from './pipelineTree';

interface LlmGeneratorModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const LlmGeneratorModal: React.FC<LlmGeneratorModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [config, setConfig] = useState<LlmConfig>(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(LLM_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // If stored config still points to openai default, update to new default
          if (parsed.apiUrl === 'https://api.openai.com/v1') {
            return DEFAULT_LLM_CONFIG;
          }
          return { ...DEFAULT_LLM_CONFIG, ...parsed };
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_LLM_CONFIG;
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'settings' | 'mainpy'>('pipeline');
  const [tasks, setTasks] = useState<BlockGenerationTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [mainPyCode, setMainPyCode] = useState<string>('');

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen && project) {
      const generatedTasks = buildBottomUpBlockTasks(project);
      setTasks(generatedTasks);
      setMainPyCode('');
      setCurrentTaskIndex(null);
      setIsGenerating(false);
      if (generatedTasks.length > 0) {
        setSelectedTaskId(generatedTasks[0].id);
      }
    }
  }, [isOpen, project]);

  const handleConfigChange = (field: keyof LlmConfig, value: string | number) => {
    const updated = { ...config, [field]: value };
    setConfig(updated);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LLM_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleStartGeneration = async () => {
    if (!config.apiKey && !config.apiUrl.includes('localhost') && !config.apiUrl.includes('127.0.0.1')) {
      alert('Укажите ключ API в настройках для вызова LLM.');
      setActiveTab('settings');
      return;
    }

    setIsGenerating(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const updatedTasks = [...tasks];
    for (const t of updatedTasks) {
      t.status = 'pending';
      t.generatedCode = undefined;
      t.error = undefined;
    }
    setTasks([...updatedTasks]);

    try {
      const chatHistory = initConversationHistory(config, updatedTasks, project.name);

      for (let i = 0; i < updatedTasks.length; i++) {
        if (controller.signal.aborted) break;

        setCurrentTaskIndex(i);
        const task = updatedTasks[i];
        setSelectedTaskId(task.id);
        task.status = 'generating';
        setTasks([...updatedTasks]);

        try {
          const code = await generateFunctionInChat(
            config,
            task,
            i,
            updatedTasks.length,
            chatHistory,
            controller.signal
          );
          task.status = 'completed';
          task.generatedCode = code;
        } catch (err: any) {
          if (controller.signal.aborted) {
            task.status = 'pending';
            break;
          }
          task.status = 'error';
          task.error = err?.message || 'Ошибка генерации';
        }

        setTasks([...updatedTasks]);
      }

      const fullPy = assembleMainPy(updatedTasks, project.name);
      setMainPyCode(fullPy);
    } finally {
      setIsGenerating(false);
      setCurrentTaskIndex(null);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  };

  const handleDownloadMainPy = () => {
    const content = mainPyCode || assembleMainPy(tasks, project.name);
    const blob = new Blob([content], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'main.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const pipelineTree = buildPipelineTree(tasks);
  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const renderTreeNode = (node: PipelineTreeNode) => {
    const isSelected = selectedTask?.id === node.task.id;
    const isRunning = node.task.status === 'generating';
    const isDone = node.task.status === 'completed';
    const isErr = node.task.status === 'error';

    return (
      <div key={node.task.id} style={{ marginLeft: `${node.level * 20}px`, marginTop: '4px' }}>
        <div
          onClick={() => setSelectedTaskId(node.task.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: isSelected ? '#e0e7ff' : '#ffffff',
            border: isSelected ? '1px solid #6366f1' : '1px solid #e2e8f0',
            userSelect: 'text',
            transition: 'all 0.15s ease',
          }}
        >
          {node.level > 0 && <CornerDownRight size={13} style={{ color: '#94a3b8', flexShrink: 0 }} />}
          <Box size={14} style={{ color: node.children.length > 0 ? '#4f46e5' : '#059669', flexShrink: 0 }} />

          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '12px',
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: isSelected ? '#4338ca' : '#f1f5f9',
              color: isSelected ? '#ffffff' : '#334155',
            }}
          >
            {node.task.code}
          </span>

          <span
            style={{
              flex: 1,
              fontSize: '12px',
              fontWeight: isSelected ? 600 : 500,
              color: '#1e293b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={node.task.name}
          >
            {node.task.name}
          </span>

          {isRunning && <Sparkles size={14} style={{ color: '#6366f1', animation: 'spin 2s linear infinite' }} />}
          {isDone && <Check size={14} style={{ color: '#16a34a' }} />}
          {isErr && <AlertCircle size={14} style={{ color: '#dc2626' }} />}
        </div>

        {node.children.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {node.children.map((child) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(3px)',
        userSelect: 'text',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isGenerating) onClose();
      }}
    >
      <div
        className="modal-card"
        style={{
          width: '1020px',
          maxWidth: '96vw',
          height: '86vh',
          maxHeight: '92vh',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          userSelect: 'text',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Wand2 size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
                Генератор кода
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              color: '#64748b',
              padding: '6px',
              borderRadius: '6px',
            }}
            title="Закрыть"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setActiveTab('pipeline')}
            data-testid="tab-pipeline"
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'pipeline' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'pipeline' ? '#4f46e5' : '#64748b',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <GitFork size={15} />
            Дерево ({tasks.length})
          </button>

          <button
            onClick={() => setActiveTab('mainpy')}
            data-testid="tab-mainpy"
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'mainpy' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'mainpy' ? '#4f46e5' : '#64748b',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Code2 size={15} />
            main.py {mainPyCode && <Check size={13} style={{ color: '#16a34a' }} />}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            data-testid="tab-settings"
            style={{
              padding: '10px 14px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'settings' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'settings' ? '#4f46e5' : '#64748b',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginLeft: 'auto',
            }}
          >
            <Settings size={15} />
            Настройки
          </button>
        </div>

        {/* Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          {/* TAB 1: PIPELINE TREE & DETAILS */}
          {activeTab === 'pipeline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: 0 }}>
              {/* Control & Progress Bar */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexShrink: 0,
                }}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
                    {completedCount} / {tasks.length}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      maxWidth: '240px',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        backgroundColor: progressPercent === 100 ? '#10b981' : '#6366f1',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {!isGenerating ? (
                    <button
                      onClick={handleStartGeneration}
                      data-testid="btn-start-generation"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#4f46e5',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Play size={14} />
                      Старт
                    </button>
                  ) : (
                    <button
                      onClick={handleStopGeneration}
                      data-testid="btn-stop-generation"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#ef4444',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Square size={14} />
                      Стоп
                    </button>
                  )}

                  {mainPyCode && (
                    <button
                      onClick={handleDownloadMainPy}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontWeight: 500,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Download size={14} />
                      Скачать main.py
                    </button>
                  )}
                </div>
              </div>

              {/* Two Column Layout: Tree View (Left) & Inspector/Code View (Right) */}
              <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '12px', flex: 1, minHeight: 0 }}>
                {/* Left: Tree */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '10px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    userSelect: 'text',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {pipelineTree.map((node) => renderTreeNode(node))}
                  </div>
                </div>

                {/* Right: Selected Block Panel */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '14px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    userSelect: 'text',
                  }}
                >
                  {selectedTask ? (
                    <>
                      {/* Block Header Info */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #f1f5f9',
                          paddingBottom: '8px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              fontSize: '13px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#e0e7ff',
                              color: '#4338ca',
                            }}
                          >
                            {selectedTask.code}
                          </span>
                          <span style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>
                            {selectedTask.name}
                          </span>
                        </div>

                        {selectedTask.generatedCode && (
                          <button
                            onClick={() => handleCopyCode(selectedTask.generatedCode!)}
                            style={{
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              borderRadius: '4px',
                              padding: '3px 8px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            {copied ? <Check size={12} style={{ color: '#16a34a' }} /> : <Copy size={12} />}
                            {copied ? 'Скопировано' : 'Копировать'}
                          </button>
                        )}
                      </div>

                      {/* Clean ICOM Summary */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '6px',
                          backgroundColor: '#f8fafc',
                          padding: '8px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '11px',
                        }}
                      >
                        <div>
                          <div style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowRight size={12} /> Входы
                          </div>
                          <div style={{ color: '#475569', marginTop: '2px' }}>
                            {selectedTask.icom.inputs.length ? selectedTask.icom.inputs.join(', ') : '—'}
                          </div>
                        </div>

                        <div>
                          <div style={{ color: '#7c3aed', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowDown size={12} /> Управление
                          </div>
                          <div style={{ color: '#475569', marginTop: '2px' }}>
                            {selectedTask.icom.controls.length ? selectedTask.icom.controls.join(', ') : '—'}
                          </div>
                        </div>

                        <div>
                          <div style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowUp size={12} /> Механизмы
                          </div>
                          <div style={{ color: '#475569', marginTop: '2px' }}>
                            {selectedTask.icom.mechanisms.length ? selectedTask.icom.mechanisms.join(', ') : '—'}
                          </div>
                        </div>

                        <div>
                          <div style={{ color: '#d97706', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ArrowRight size={12} /> Выходы
                          </div>
                          <div style={{ color: '#475569', marginTop: '2px' }}>
                            {selectedTask.icom.outputs.length ? selectedTask.icom.outputs.join(', ') : '—'}
                          </div>
                        </div>
                      </div>

                      {/* Code Area */}
                      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                        {selectedTask.generatedCode ? (
                          <pre
                            style={{
                              flex: 1,
                              backgroundColor: '#1e293b',
                              color: '#f8fafc',
                              padding: '12px',
                              borderRadius: '6px',
                              overflow: 'auto',
                              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                              fontSize: '12px',
                              lineHeight: '1.4',
                              margin: 0,
                              userSelect: 'text',
                            }}
                          >
                            {selectedTask.generatedCode}
                          </pre>
                        ) : selectedTask.error ? (
                          <div style={{ color: '#b91c1c', padding: '12px', background: '#fee2e2', borderRadius: '6px', fontSize: '12px' }}>
                            {selectedTask.error}
                          </div>
                        ) : (
                          <div
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f8fafc',
                              border: '1px dashed #cbd5e1',
                              borderRadius: '6px',
                              color: '#94a3b8',
                              fontSize: '12px',
                              fontStyle: 'italic',
                            }}
                          >
                            Функция ожидает генерации
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ color: '#94a3b8', fontSize: '12px', margin: 'auto' }}>
                      Выберите блок в дереве
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAIN.PY */}
          {activeTab === 'mainpy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minHeight: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code2 size={16} style={{ color: '#4f46e5' }} />
                  <strong style={{ fontSize: '13px', color: '#1e293b' }}>main.py</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleCopyCode(mainPyCode || assembleMainPy(tasks, project.name))}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#0f172a',
                      fontWeight: 500,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {copied ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
                    {copied ? 'Скопировано' : 'Копировать'}
                  </button>

                  <button
                    onClick={handleDownloadMainPy}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '4px',
                      border: 'none',
                      background: '#4f46e5',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Download size={13} />
                    Скачать
                  </button>
                </div>
              </div>

              <pre
                style={{
                  flex: 1,
                  backgroundColor: '#0f172a',
                  color: '#e2e8f0',
                  padding: '14px',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  margin: 0,
                  userSelect: 'text',
                }}
              >
                {mainPyCode || assembleMainPy(tasks, project.name)}
              </pre>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '650px',
                margin: '0 auto',
                width: '100%',
                userSelect: 'text',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Адрес API:
                </label>
                <input
                  type="text"
                  value={config.apiUrl}
                  onChange={(e) => handleConfigChange('apiUrl', e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Ключ API:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={config.apiKey}
                    onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                    placeholder="sk-..."
                    style={{
                      width: '100%',
                      padding: '6px 34px 6px 10px',
                      borderRadius: '4px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    style={{
                      position: 'absolute',
                      right: '6px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: '#64748b',
                      padding: '4px',
                    }}
                  >
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Модель:
                </label>
                <input
                  type="text"
                  value={config.model}
                  onChange={(e) => handleConfigChange('model', e.target.value)}
                  placeholder="gpt-4o"
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Таймаут (сек):
                </label>
                <input
                  type="number"
                  min={10}
                  max={600}
                  value={config.timeoutSeconds || 120}
                  onChange={(e) => handleConfigChange('timeoutSeconds', parseInt(e.target.value, 10) || 120)}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Системный промпт:
                </label>
                <textarea
                  rows={5}
                  value={config.systemPrompt}
                  onChange={(e) => handleConfigChange('systemPrompt', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    lineHeight: '1.4',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  onClick={() => {
                    setConfig(DEFAULT_LLM_CONFIG);
                    if (typeof localStorage !== 'undefined') {
                      localStorage.setItem(LLM_STORAGE_KEY, JSON.stringify(DEFAULT_LLM_CONFIG));
                    }
                  }}
                  style={{
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#64748b',
                  }}
                >
                  Сбросить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LlmGeneratorModal;

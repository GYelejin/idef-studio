import React, { useRef, useState } from 'react';
import {
  FilePlus,
  FolderOpen,
  Save,
  Download,
  BookOpen,
  MousePointer,
  Square,
  ArrowRight,
  Undo2,
  Redo2,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelBottomClose,
  PanelBottomOpen,
  HelpCircle,
  X,
  Wand2,
} from 'lucide-react';
import { store } from '../core/store';
import { exportProjectToJson, importProjectFromJson } from '../core/exporter';
import { runIDEF0Linter } from '../core/linter';
import { EditorState } from '../core/store/types';
import { Diagram } from '../types/idef0';

interface HeaderProps {
  state: EditorState;
  onOpenExport: () => void;
  onOpenHelp: () => void;
  onOpenLlmGenerator: () => void;
  onToggleDiagnostics?: () => void;
  isDiagnosticsOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onOpenExport,
  onOpenHelp,
  onOpenLlmGenerator,
  onToggleDiagnostics,
  isDiagnosticsOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const {
    activeTool,
    zoom,
    leftPanelOpen,
    rightPanelOpen,
    history,
    redoStack,
    selectedObjectId,
    selectedObjectType,
    project,
    activeDiagramId,
  } = state;

  const historyLen = history.length;
  const redoLen = redoStack.length;
  const diagrams = project?.diagrams || [];
  const activeDiag = diagrams.find((d: Diagram) => d.id === activeDiagramId);
  const isContext =
    activeDiag &&
    activeDiag.parentBlockId === null &&
    (activeDiag.code === 'A0' || activeDiag.code === 'A-0');
  const isA0WithBlock = Boolean(isContext && activeDiag.blocks.length >= 1);

  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleSave = () => {
    if (!project) return;
    const issues = activeDiag ? runIDEF0Linter(project, activeDiag.id) : [];
    const critical = issues.filter((i) => i.severity === 'error');

    if (critical.length > 0) {
      const errList = critical
        .slice(0, 3)
        .map((e) => `• ${e.message}`)
        .join('\n');
      const proceed = window.confirm(
        `Внимание: в диаграмме обнаружены критические ошибки линтера (${critical.length}):\n\n${errList}\n\nСохранить проект как черновик?`
      );
      if (!proceed) {
        return;
      }
    }

    const json = exportProjectToJson(project);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name || 'idef0-project'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        const res = importProjectFromJson(content);
        if (res.success && res.project) {
          store.importProject(res.project);
        } else {
          alert(`Ошибка при открытии проекта: ${res.error}`);
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  const handleDelete = () => {
    if (!selectedObjectId) return;
    if (selectedObjectType === 'block') {
      if (window.confirm('Удалить выбранный функциональный блок и связанные потоки?')) {
        store.deleteBlock(selectedObjectId);
      }
    } else if (selectedObjectType === 'arrow') {
      store.deleteArrow(selectedObjectId);
    }
  };

  return (
    <header className="header-bar" data-testid="header-bar">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleOpenFile}
        accept=".json"
        style={{ display: 'none' }}
      />

      {/* File Operations */}
      <div className="header-group">
        <button
          className="btn-icon"
          onClick={handleCreate}
          title="Создать новый проект"
          data-testid="btn-create"
        >
          <FilePlus size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={() => fileInputRef.current?.click()}
          title="Открыть проект JSON"
          data-testid="btn-open"
        >
          <FolderOpen size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={handleSave}
          title="Сохранить проект в JSON"
          data-testid="btn-save"
        >
          <Save size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={onOpenExport}
          title="Экспортировать векторный SVG или PNG"
          data-testid="btn-export"
        >
          <Download size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={onOpenLlmGenerator}
          title="Сгенерировать функциональный Python-код (LLM волшебная палочка)"
          data-testid="btn-llm-magic"
          style={{ color: '#6366f1' }}
        >
          <Wand2 size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={() => store.loadExample()}
          title="Загрузить эталонный пример IDEF0"
          data-testid="btn-example"
        >
          <BookOpen size={16} />
        </button>
      </div>

      <div className="header-divider" />

      {/* Core Tools */}
      <div className="header-group">
        <button
          className={`btn-icon${activeTool === 'select' ? ' active' : ''}`}
          onClick={() => store.setTool('select')}
          title="Указатель [1 / V] (выбор и перемещение объектов)"
          data-testid="tool-select"
        >
          <MousePointer size={16} />
        </button>
        <button
          className={`btn-icon${activeTool === 'block' ? ' active' : ''} ${
            isA0WithBlock ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          onClick={() => !isA0WithBlock && store.setTool('block')}
          disabled={isA0WithBlock}
          title={
            isA0WithBlock
              ? 'Блок: На контекстной диаграмме A0 допускается только один функциональный блок по стандарту IDEF0'
              : 'Блок [2 / B] (создание функционального блока)'
          }
          data-testid="tool-block"
        >
          <Square size={16} />
        </button>
        <button
          className={`btn-icon${activeTool === 'arrow' ? ' active' : ''}`}
          onClick={() => store.setTool('arrow')}
          title="Стрелка [3 / A] (проведение связей и потоков)"
          data-testid="tool-arrow"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="header-divider" />

      {/* Undo, Redo, Delete */}
      <div className="header-group">
        <button
          className="btn-icon"
          onClick={() => store.undo()}
          disabled={historyLen === 0}
          title="Отменить действие (Ctrl+Z)"
          data-testid="btn-undo"
        >
          <Undo2 size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={() => store.redo()}
          disabled={redoLen === 0}
          title="Повторить действие (Ctrl+Y)"
          data-testid="btn-redo"
        >
          <Redo2 size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={handleDelete}
          disabled={!selectedObjectId}
          title="Удалить выбранный объект (Delete / Backspace)"
          data-testid="btn-delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="header-divider" />

      {/* Zoom */}
      <div className="header-group">
        <button
          className="btn-icon"
          onClick={() => store.setZoom(zoom - 0.1)}
          title="Уменьшить"
          data-testid="btn-zoom-out"
        >
          <ZoomOut size={16} />
        </button>
        <span
          style={{
            fontSize: '11px',
            minWidth: '42px',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}
        >
          {`${Math.round(zoom * 100)}%`}
        </span>
        <button
          className="btn-icon"
          onClick={() => store.setZoom(zoom + 0.1)}
          title="Увеличить"
          data-testid="btn-zoom-in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          className="btn-icon"
          onClick={() => store.setZoom(1.0)}
          title="Масштаб 100%"
          data-testid="btn-zoom-100"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="header-divider" />
      <div style={{ flex: 1 }} />

      {/* Panels & Help */}
      <div className="header-group">
        <button
          className="btn-icon"
          onClick={onOpenHelp}
          title="Справка и горячие клавиши (? / F1)"
          data-testid="btn-help"
        >
          <HelpCircle size={16} />
        </button>
        <button
          className={`btn-icon${leftPanelOpen ? ' active' : ''}`}
          onClick={() => store.toggleLeftPanel()}
          title={leftPanelOpen ? 'Скрыть дерево диаграмм' : 'Показать дерево диаграмм'}
          data-testid="btn-toggle-left"
        >
          {leftPanelOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
        {onToggleDiagnostics && (
          <button
            className={`btn-icon${isDiagnosticsOpen ? ' active' : ''}`}
            onClick={onToggleDiagnostics}
            title={
              isDiagnosticsOpen
                ? 'Скрыть нижнюю панель диагностики'
                : 'Показать нижнюю панель диагностики'
            }
            data-testid="btn-toggle-bottom"
          >
            {isDiagnosticsOpen ? <PanelBottomClose size={16} /> : <PanelBottomOpen size={16} />}
          </button>
        )}
        <button
          className={`btn-icon${rightPanelOpen ? ' active' : ''}`}
          onClick={() => store.toggleRightPanel()}
          title={rightPanelOpen ? 'Скрыть панель свойств' : 'Показать панель свойств'}
          data-testid="btn-toggle-right"
        >
          {rightPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </button>
      </div>

      {/* Custom Modal Dialog: Create New Project */}
      {createModalOpen && (
        <div
          className="modal-backdrop"
          data-testid="new-project-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div
            className="modal-dialog"
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <div
              className="modal-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                background: 'var(--bg-panel-header)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: 600,
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                }}
              >
                <FilePlus size={18} color="var(--accent-primary)" />
                <span>Создать новый проект</span>
              </div>
              <button
                className="btn-icon"
                onClick={() => setCreateModalOpen(false)}
                data-testid="btn-close-new-project-modal"
                title="Закрыть"
              >
                <X size={16} />
              </button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: '20px',
                fontSize: '13px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
              }}
            >
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                }}
              >
                Вы действительно хотите создать новый проект?
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                Все несохраненные изменения текущей модели будут удалены. Будет инициализирован
                чистый проект с контекстной диаграммой.
              </p>
            </div>
            <div
              className="modal-footer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                padding: '14px 20px',
                borderTop: '1px solid var(--border-color)',
                background: 'var(--bg-panel-header)',
              }}
            >
              <button
                className="btn"
                onClick={() => setCreateModalOpen(false)}
                data-testid="btn-cancel-new-project"
                style={{ padding: '7px 16px', fontSize: '13px' }}
              >
                Отмена
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCreateModalOpen(false);
                  store.resetProject();
                }}
                data-testid="btn-confirm-new-project"
                style={{ padding: '7px 18px', fontSize: '13px', fontWeight: 500 }}
              >
                Создать проект
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

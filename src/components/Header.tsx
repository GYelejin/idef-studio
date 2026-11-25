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
  Wand2,
} from 'lucide-react';
import { store } from '../core/store';
import { exportProjectToJson, importProjectFromJson } from '../core/exporter';
import { isTauriRuntime, openTextFileNative, saveFileNativeOrBrowser } from '../core/filePlatform';
import CreateProjectModal from './CreateProjectModal';
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

  const handleSave = async () => {
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
    await saveFileNativeOrBrowser(
      `${project.name || 'idef0-project'}.json`,
      new Blob([json], { type: 'application/json' }),
      [{ name: 'JSON Project', extensions: ['json'] }]
    );
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
          onClick={async () => {
            if (isTauriRuntime()) {
              const content = await openTextFileNative([{ name: 'JSON Project', extensions: ['json'] }]);
              if (content !== null) {
                const res = importProjectFromJson(content);
                if (res.success && res.project) {
                  store.importProject(res.project);
                } else {
                  alert(`Ошибка при открытии проекта: ${res.error}`);
                }
              }
              return;
            }
            fileInputRef.current?.click();
          }}
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
        <CreateProjectModal
          onClose={() => setCreateModalOpen(false)}
          onConfirm={() => {
            setCreateModalOpen(false);
            store.resetProject();
          }}
        />
      )}
    </header>
  );
};

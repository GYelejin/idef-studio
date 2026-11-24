import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar';
import { HelpModal } from './components/HelpModal';
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { Tree } from './components/Tree';
import { Inspector } from './components/Inspector';
import { ExportModal } from './components/ExportModal';
import { Canvas } from './components/Canvas';
import { store } from './core/store';
import { runIDEF0Linter } from './core/linter';
import LlmGeneratorModal from './components/llm/LlmGeneratorModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Register linter globally for debugging/e2e tests
(window as any).__IDEF0_LINTER__ = runIDEF0Linter;

export const App: React.FC = () => {
  const [state, setState] = useState(() => store.getState());
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [exportOpen, setExportOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [llmOpen, setLlmOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  // Subscribe to store updates
  useEffect(() => {
    const unsub = store.subscribe((newState) => {
      setState({ ...newState });
    });
    return () => unsub();
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const activeEl = document.activeElement;
      const tagName = activeEl ? activeEl.tagName : '';

      if (key === '?' || key === 'F1') {
        e.preventDefault();
        setHelpOpen(true);
        return;
      }

      if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          store.redo();
        } else {
          store.undo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'y') {
        e.preventDefault();
        store.redo();
        return;
      }

      if (key === 'Delete' || key === 'Backspace') {
        if (state.selectedObjectId) {
          e.preventDefault();
          const objId = state.selectedObjectId;
          const objType = state.selectedObjectType;
          if (objType === 'block') store.deleteBlock(objId);
          if (objType === 'arrow') store.deleteArrow(objId);
        }
        return;
      }

      if (key === 'Escape') {
        setHelpOpen(false);
        setExportOpen(false);
        store.selectObject(null, null);
        return;
      }

      if (key === '1' || key.toLowerCase() === 'v') store.setTool('select');
      if (key === '2' || key.toLowerCase() === 'b') store.setTool('block');
      if (key === '3' || key.toLowerCase() === 'a') store.setTool('arrow');
      if (key === '=' || key === '+') store.setZoom(state.zoom + 0.1);
      if (key === '-') store.setZoom(state.zoom - 0.1);
      if (key === '0') store.setZoom(1.0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedObjectId, state.selectedObjectType, state.zoom]);

  return (
    <div className="app-container">
      <Header
        state={state}
        onOpenExport={() => setExportOpen(true)}
        onOpenHelp={() => setHelpOpen(true)}
        onOpenLlmGenerator={() => setLlmOpen(true)}
        onToggleDiagnostics={() => setDiagnosticsOpen(!diagnosticsOpen)}
        isDiagnosticsOpen={diagnosticsOpen}
      />

      <div className="workspace-container" style={{ position: 'relative' }}>
        <Tree state={state} />

        {!state.leftPanelOpen && (
          <button
            className="btn-icon floating-edge-tab left"
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 40,
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderLeft: 'none',
              borderRadius: '0 6px 6px 0',
              padding: '8px 2px',
              boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => store.toggleLeftPanel()}
            title="Показать дерево диаграмм"
            data-testid="btn-floating-left-toggle"
          >
            <ChevronRight size={14} />
          </button>
        )}

        <Canvas state={state} onCursorChange={setCursorPos} />

        {!state.rightPanelOpen && (
          <button
            className="btn-icon floating-edge-tab right"
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 40,
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRight: 'none',
              borderRadius: '6px 0 0 6px',
              padding: '8px 2px',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => store.toggleRightPanel()}
            title="Показать панель свойств"
            data-testid="btn-floating-right-toggle"
          >
            <ChevronLeft size={14} />
          </button>
        )}

        <Inspector state={state} />
      </div>

      {diagnosticsOpen && (
        <DiagnosticsPanel state={state} onClose={() => setDiagnosticsOpen(false)} />
      )}

      <StatusBar
        state={state}
        cursorPos={cursorPos}
        onToggleDiagnostics={() => setDiagnosticsOpen(!diagnosticsOpen)}
        isDiagnosticsOpen={diagnosticsOpen}
      />

      {exportOpen && <ExportModal state={state} onClose={() => setExportOpen(false)} />}

      {helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}

      {llmOpen && (
        <LlmGeneratorModal
          project={state.project}
          isOpen={llmOpen}
          onClose={() => setLlmOpen(false)}
        />
      )}
    </div>
  );
};

export default App;

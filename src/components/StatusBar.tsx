import React from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';
import { runIDEF0Linter } from '../core/linter';
import { EditorState } from '../core/store/types';
import { Diagram } from '../types/idef0';

interface StatusBarProps {
  state: EditorState;
  cursorPos: { x: number; y: number };
  onToggleDiagnostics: () => void;
  isDiagnosticsOpen: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  state,
  cursorPos,
  onToggleDiagnostics,
  isDiagnosticsOpen,
}) => {
  const { project, activeDiagramId, autosaveStatus } = state;
  const diagrams = project?.diagrams || [];
  const diag = diagrams.find((d: Diagram) => d.id === activeDiagramId);
  const issues = project && diag ? runIDEF0Linter(project, diag.id) : [];
  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;
  const x = Math.round(cursorPos?.x || 0);
  const y = Math.round(cursorPos?.y || 0);

  return (
    <footer
      className="status-bar"
      data-testid="status-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
      }}
    >
      {/* Left side: Diagnostics badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          className="status-item"
          data-testid="status-linter"
          onClick={onToggleDiagnostics}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: isDiagnosticsOpen ? 'var(--bg-hover, #f1f5f9)' : 'transparent',
            outline: isDiagnosticsOpen ? '1px solid var(--accent-primary, #2563eb)' : 'none',
          }}
          title="Открыть / закрыть панель диагностики правил IDEF0"
        >
          <div
            data-testid="status-error-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: errors > 0 ? '#ef4444' : 'var(--text-secondary, #64748b)',
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            <XCircle size={14} style={{ color: errors > 0 ? '#ef4444' : '#94a3b8' }} />
            <span>{errors}</span>
          </div>
          <div
            data-testid="status-warning-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: warnings > 0 ? '#f59e0b' : 'var(--text-secondary, #64748b)',
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            <AlertTriangle size={14} style={{ color: warnings > 0 ? '#f59e0b' : '#94a3b8' }} />
            <span>{warnings}</span>
          </div>
        </div>
      </div>

      {/* Right side: Coordinates & Autosave */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          className="status-item"
          data-testid="status-coords"
          style={{ fontFamily: 'monospace', fontSize: '11px' }}
        >
          <span>{`X: ${x}, Y: ${y}`}</span>
        </div>
        <div className="status-item" data-testid="status-autosave">
          <span className={`status-badge ${autosaveStatus === 'saved' ? 'success' : 'warning'}`}>
            {autosaveStatus === 'saved' ? 'Сохранено' : 'Сохранение...'}
          </span>
        </div>
      </div>
    </footer>
  );
};

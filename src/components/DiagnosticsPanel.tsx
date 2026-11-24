import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { store } from '../core/store';
import { runIDEF0Linter } from '../core/linter';
import { EditorState } from '../core/store/types';
import { Diagram } from '../types/idef0';

interface DiagnosticsPanelProps {
  state: EditorState;
  onClose: () => void;
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ state, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'error' | 'warning'>('all');
  const { project, activeDiagramId } = state;
  const diagrams = project?.diagrams || [];
  const diag = diagrams.find((d: Diagram) => d.id === activeDiagramId);
  const issues = project && diag ? runIDEF0Linter(project, diag.id) : [];
  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;

  const filtered =
    filter === 'error'
      ? issues.filter((i) => i.severity === 'error')
      : filter === 'warning'
      ? issues.filter((i) => i.severity === 'warning')
      : issues;

  return (
    <div
      className="diagnostics-panel"
      data-testid="diagnostics-panel"
      style={{
        width: '100%',
        height: '220px',
        maxHeight: '35vh',
        background: 'var(--bg-panel, #ffffff)',
        borderTop: '2px solid var(--border-color, #e2e8f0)',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        zIndex: 20,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-color, #e2e8f0)',
          background: 'var(--bg-card, #f8fafc)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '13px',
              color: 'var(--text-primary, #0f172a)',
            }}
          >
            <ShieldCheck size={16} color="#2563eb" />
            <span>Диагностика</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '2px 8px',
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid var(--border-color, #cbd5e1)',
                background: filter === 'all' ? '#2563eb' : 'transparent',
                color: filter === 'all' ? '#ffffff' : 'var(--text-secondary, #475569)',
                cursor: 'pointer',
                fontWeight: filter === 'all' ? 600 : 400,
              }}
            >
              {`Все (${issues.length})`}
            </button>
            <button
              onClick={() => setFilter('error')}
              style={{
                padding: '2px 8px',
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid var(--border-color, #cbd5e1)',
                background: filter === 'error' ? '#dc2626' : 'transparent',
                color: filter === 'error' ? '#ffffff' : 'var(--text-secondary, #475569)',
                cursor: 'pointer',
                fontWeight: filter === 'error' ? 600 : 400,
              }}
            >
              {`Ошибки (${errors})`}
            </button>
            <button
              onClick={() => setFilter('warning')}
              style={{
                padding: '2px 8px',
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid var(--border-color, #cbd5e1)',
                background: filter === 'warning' ? '#d97706' : 'transparent',
                color: filter === 'warning' ? '#ffffff' : 'var(--text-secondary, #475569)',
                cursor: 'pointer',
                fontWeight: filter === 'warning' ? 600 : 400,
              }}
            >
              {`Предупреждения (${warnings})`}
            </button>
          </div>
        </div>

        <button
          className="btn-icon"
          onClick={onClose}
          title="Закрыть панель диагностики"
          data-testid="btn-close-diagnostics"
          style={{ width: '24px', height: '24px', padding: '2px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px' }}>
        {issues.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '6px',
              color: 'var(--text-muted, #64748b)',
            }}
          >
            <CheckCircle2 size={28} color="#16a34a" />
            <div style={{ fontWeight: 600, color: '#16a34a', fontSize: '13px' }}>
              Все правила соблюдены
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '24px',
              color: 'var(--text-muted, #64748b)',
              fontSize: '13px',
            }}
          >
            Нет замечаний в выбранной категории
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((issue, idx) => {
              const isErr = issue.severity === 'error';
              return (
                <div
                  key={idx}
                  data-testid={`diagnostic-item-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: isErr ? 'rgba(239, 68, 68, 0.06)' : 'rgba(245, 158, 11, 0.06)',
                    border: `1px solid ${isErr ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                    <div style={{ marginTop: '2px' }}>
                      {isErr ? (
                        <AlertCircle size={16} color="#dc2626" />
                      ) : (
                        <AlertTriangle size={16} color="#d97706" />
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '3px',
                            background: isErr ? '#fee2e2' : '#fef3c7',
                            color: isErr ? '#991b1b' : '#92400e',
                          }}
                        >
                          {issue.ruleId}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--text-primary, #0f172a)',
                          }}
                        >
                          {isErr ? 'Ошибка' : 'Предупреждение'}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary, #334155)',
                          lineHeight: 1.4,
                        }}
                      >
                        {issue.message}
                      </div>
                    </div>
                  </div>

                  {(issue.blockId || issue.arrowId) && (
                    <button
                      className="btn-tool"
                      onClick={() => {
                        if (issue.blockId) {
                          store.selectObject(issue.blockId, 'block');
                        } else if (issue.arrowId) {
                          store.selectObject(issue.arrowId, 'arrow');
                        }
                      }}
                      style={{ padding: '3px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}
                      title="Выделить объект на холсте"
                    >
                      <ExternalLink size={12} />
                      <span>Показать</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

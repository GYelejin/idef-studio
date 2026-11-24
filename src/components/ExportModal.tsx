import React, { useState, useMemo } from 'react';
import { X, Download, FileCode, Image, Eye, FolderArchive } from 'lucide-react';
import { exportDiagramToSvg, exportSvgToPngBlob, exportDiagramsToZip } from '../core/exporter';
import { getBlockCode } from '../core/geometry';
import { EditorState } from '../core/store/types';
import { Diagram, Block } from '../types/idef0';

interface ExportModalProps {
  state: EditorState;
  onClose: () => void;
}

function cleanTitle(title?: string): string {
  if (typeof title === 'string') {
    return title.replace(/^(Контекстная диаграмма:\s*|Декомпозиция:\s*)/, '').trim();
  }
  return '';
}

export const ExportModal: React.FC<ExportModalProps> = ({ state, onClose }) => {
  const { project, activeDiagramId } = state;
  const diagrams = project?.diagrams || [];
  const [format, setFormat] = useState<'svg' | 'png'>('svg');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(diagrams.map((d: Diagram) => d.id))
  );
  const [previewDiagId, setPreviewDiagId] = useState<string>(
    () => activeDiagramId || (diagrams[0]?.id ?? '')
  );
  const [isExporting, setIsExporting] = useState(false);

  const previewDiag = useMemo(() => {
    return diagrams.find((d: Diagram) => d.id === previewDiagId) || diagrams[0] || null;
  }, [diagrams, previewDiagId]);

  const previewSvg = useMemo(() => {
    if (previewDiag) {
      return exportDiagramToSvg(previewDiag);
    }
    return '';
  }, [previewDiag]);

  const toggleDiag = (diagId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(diagId)) {
        next.delete(diagId);
      } else {
        next.add(diagId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(diagrams.map((d: Diagram) => d.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleDownload = () => {
    const chosen = diagrams.filter((d: Diagram) => selectedIds.has(d.id));
    if (chosen.length === 0) return;

    setIsExporting(true);
    Promise.resolve()
      .then(() => {
        if (chosen.length === 1) {
          const diag = chosen[0];
          const safeTitle = (diag.title || 'diagram')
            .replace(/[/\\:*?"<>|]/g, '_')
            .substring(0, 40);
          const fileName = `${diag.code}_${safeTitle}`;

          if (format === 'svg') {
            const svgContent = exportDiagramToSvg(diag);
            const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.svg`;
            a.click();
            URL.revokeObjectURL(url);
          } else {
            return exportSvgToPngBlob(exportDiagramToSvg(diag), 2).then((pngBlob) => {
              const url = URL.createObjectURL(pngBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${fileName}.png`;
              a.click();
              URL.revokeObjectURL(url);
            });
          }
        } else {
          return exportDiagramsToZip(chosen, format).then((zipBlob) => {
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            const safeProj = (project?.name || 'idef0-project').replace(/[/\\:*?"<>|]/g, '_');
            a.href = url;
            a.download = `${safeProj}_${format}_diagrams.zip`;
            a.click();
            URL.revokeObjectURL(url);
          });
        }
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        alert(`Ошибка при экспорте: ${err?.message || err}`);
      })
      .finally(() => {
        setIsExporting(false);
      });
  };

  const selectedCount = selectedIds.size;

  return (
    <div className="modal-backdrop" data-testid="export-modal" id="import-export-modal">
      <div
        className="modal-dialog"
        data-testid="import-export-modal"
        style={{
          width: '940px',
          maxWidth: '95vw',
          height: '620px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} color="#2563eb" />
            <span style={{ fontWeight: 600, fontSize: '15px' }}>Экспорт диаграмм IDEF0</span>
          </div>
          <button className="btn-icon" onClick={onClose} data-testid="btn-close-modal">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div
          className="modal-body"
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '16px',
            padding: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              overflowY: 'auto',
            }}
          >
            {/* Format Selection */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 600 }}>
                Формат графики
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  className={`btn-tool${format === 'svg' ? ' active' : ''}`}
                  onClick={() => setFormat('svg')}
                  style={{ justifyContent: 'center', gap: '6px', height: '36px' }}
                  data-testid="export-format-svg"
                >
                  <FileCode size={16} />
                  <span>Векторный SVG</span>
                </button>
                <button
                  className={`btn-tool${format === 'png' ? ' active' : ''}`}
                  onClick={() => setFormat('png')}
                  style={{ justifyContent: 'center', gap: '6px', height: '36px' }}
                  data-testid="export-format-png"
                >
                  <Image size={16} />
                  <span>Растровый PNG (2x)</span>
                </button>
              </div>
            </div>

            {/* Diagram Selection */}
            <div
              className="form-group"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <label className="form-label" style={{ fontWeight: 600, margin: 0 }}>
                  {`Диаграммы (${selectedCount} из ${diagrams.length})`}
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={selectAll}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-primary, #2563eb)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Выбрать все
                  </button>
                  <span style={{ color: 'var(--text-muted)' }}>|</span>
                  <button
                    onClick={deselectAll}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Снять все
                  </button>
                </div>
              </div>

              {/* Diagram items list */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  borderRadius: '6px',
                  background: 'var(--bg-card, #f8fafc)',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {diagrams.map((diag: Diagram) => {
                  const diagId = diag.id;
                  const diagCode = diag.code;
                  const diagTitle = diag.title;
                  const isChecked = selectedIds.has(diagId);
                  const isPreviewing = previewDiagId === diagId;
                  const isContext = diag.parentBlockId === null;
                  const blockNames = diag.blocks
                    .map((b: Block) => getBlockCode(diagCode, b.nodeNumber))
                    .join(', ');

                  return (
                    <div
                      key={diagId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '5px',
                        background: isPreviewing ? '#eff6ff' : '#ffffff',
                        border: isPreviewing
                          ? '1px solid #93c5fd'
                          : '1px solid var(--border-color, #e2e8f0)',
                        cursor: 'pointer',
                      }}
                      onClick={() => setPreviewDiagId(diagId)}
                      data-testid={`export-diag-item-${diagCode}`}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleDiag(diagId);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            cursor: 'pointer',
                            width: '15px',
                            height: '15px',
                            accentColor: '#2563eb',
                          }}
                          data-testid={`checkbox-diag-${diagCode}`}
                        />
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: '11px',
                            background: isChecked ? '#2563eb' : '#94a3b8',
                            color: '#ffffff',
                            padding: '1px 5px',
                            borderRadius: '4px',
                          }}
                        >
                          {diagCode}
                        </span>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 500,
                              color: 'var(--text-primary, #0f172a)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={diagTitle}
                          >
                            {cleanTitle(diagTitle)}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              color: 'var(--text-muted, #64748b)',
                            }}
                          >
                            {isContext
                              ? 'Контекстный блок A0'
                              : `Блоки диаграммы: ${blockNames}`}
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn-icon"
                        style={{
                          width: '22px',
                          height: '22px',
                          padding: 0,
                          opacity: isPreviewing ? 1 : 0.6,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewDiagId(diagId);
                        }}
                        title="Предпросмотр этой диаграммы"
                      >
                        <Eye size={13} color={isPreviewing ? '#2563eb' : 'currentColor'} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary info */}
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-secondary, #475569)',
                background: 'var(--bg-card, #f8fafc)',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-color, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {selectedCount > 1 ? (
                <>
                  <FolderArchive size={14} color="#2563eb" />
                  <span>{`Будет скачан ZIP-архив (${selectedCount} файлов .${format})`}</span>
                </>
              ) : selectedCount === 1 ? (
                <>
                  <Download size={14} color="#16a34a" />
                  <span>{`Будет скачан 1 файл .${format}`}</span>
                </>
              ) : (
                <span style={{ color: '#dc2626' }}>
                  Выберите хотя бы одну диаграмму для экспорта
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-tool primary"
                disabled={selectedCount === 0 || isExporting}
                onClick={handleDownload}
                style={{ flex: 1, justifyContent: 'center', height: '36px', fontWeight: 600 }}
                data-testid="btn-do-export"
              >
                <Download size={16} />
                <span>
                  {isExporting
                    ? 'Экспорт...'
                    : selectedCount > 1
                    ? `Скачать ZIP (${selectedCount})`
                    : `Скачать .${format.toUpperCase()}`}
                </span>
              </button>
              <button className="btn-tool" onClick={onClose} style={{ height: '36px' }}>
                Отмена
              </button>
            </div>
          </div>

          {/* Right Column: Live SVG Preview */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border-color, #cbd5e1)',
              borderRadius: '8px',
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '6px 12px',
                background: 'var(--bg-card, #f8fafc)',
                borderBottom: '1px solid var(--border-color, #e2e8f0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-primary, #0f172a)',
              }}
            >
              <span>
                {`Предпросмотр: [${previewDiag?.code || ''}] ${previewDiag?.title || ''}`}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontWeight: 400,
                }}
              >
                1600 × 900 px
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                background: '#f1f5f9',
                overflow: 'hidden',
              }}
            >
              {previewSvg && previewSvg.length > 0 ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                  dangerouslySetInnerHTML={{ __html: previewSvg }}
                />
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>Нет данных для отображения</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { ArrowRight, ChevronDown, ChevronRight, GitFork, GitMerge, Trash2 } from "lucide-react";
import { store, EditorState } from "../../core/store";
import { Block, ICOMRole, Side } from "../../types/idef0";
import { getArrowParent } from "../../core/geometry";
import AutoResizingTextarea from "./AutoResizingTextarea";

interface BlockInspectorProps {
  block: Block;
  state: EditorState;
  collapsedSections: Record<string, boolean>;
  toggleSection: (role: string) => void;
}

const BlockInspector: React.FC<BlockInspectorProps> = ({
  block,
  state,
  collapsedSections,
  toggleSection,
}) => {
  const diag = state.project.diagrams.find(d => d.id === state.activeDiagramId);
  if (!diag) return null;

      const isTopLevelContextBlock =
        (diag.parentBlockId === null && (diag.code === 'A-0' || diag.code === 'A0') && diag.blocks.length === 1 && diag.blocks[0]?.id === block.id) ||
        (block.nodeNumber === 0 && diag.parentBlockId === null);
  
      const renderICOMSection = (title: string, role: ICOMRole, side: Side) => {
        const isInput = role === 'input' || role === 'control' || role === 'mechanism';
        const attachedArrows = diag.arrows.filter((a) => {
          if (isInput) {
            return a.target.type === 'block' && a.target.id === block.id && a.target.side === side;
          } else {
            return a.source.type === 'block' && a.source.id === block.id && a.source.side === side;
          }
        });
        const isCollapsed = !!collapsedSections[role];
  
        return (
          <div className="icom-section" data-testid={`icom-section-${role}`}>
            <div
              className="icom-section-header"
              onClick={() => toggleSection(role)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                <span>{title} ({attachedArrows.length})</span>
              </span>
            </div>
            {!isCollapsed && (
              <div className="icom-list">
                {attachedArrows.length === 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', padding: '2px 4px' }}>
                    Нет связей
                  </span>
                ) : (
                  attachedArrows.map((arrow) => {
                    const parent = getArrowParent(arrow, diag);
                    const isBranch = Boolean(parent);
                    const parentLabelClean = parent?.label?.trim() ? parent.label.replace(/\n/g, ' ').trim() : 'Основной поток';
                    const flowText = arrow.label?.trim()
                      ? arrow.label.replace(/\n/g, ' ').trim()
                      : (isBranch ? parentLabelClean : 'Без названия');
  
                    return (
                      <div
                        key={arrow.id}
                        className="icom-item"
                        onClick={() => store.selectObject(arrow.id, 'arrow')}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                        }}
                        data-testid={`icom-flow-item-${arrow.id}`}
                        title="Нажмите для перехода к стрелке"
                      >
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#2563eb',
                            flexShrink: 0,
                          }}
                        />
                        {isBranch && (
                          <GitMerge size={12} style={{ color: 'var(--accent-primary, #2563eb)', flexShrink: 0 }} />
                        )}
                        <span
                          style={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'var(--text-primary)',
                            fontSize: '11px',
                            fontWeight: 500,
                          }}
                        >
                          {flowText}
                        </span>
                        <ArrowRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );
      };
  
      return (
        <div className="panel-body" data-testid="inspector-block-view">
          <div className="form-group">
            <label className="form-label">
              Название <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({block.name.length}/100)</span>
            </label>
            <AutoResizingTextarea
              rows={2}
              maxLength={100}
              value={block.name}
              onChange={(e) => store.updateBlock(block.id, { name: e.target.value })}
              data-testid="input-block-name"
            />
          </div>
  
          <div className="form-group">
            <label className="form-label">
              {isTopLevelContextBlock
                ? 'Номер блока (контекстная диаграмма: 0)'
                : 'Номер блока (1-8)'}
            </label>
            <input
              type="number"
              min={isTopLevelContextBlock ? 0 : 1}
              max={isTopLevelContextBlock ? 0 : 8}
              className="form-input"
              disabled={isTopLevelContextBlock}
              value={isTopLevelContextBlock ? 0 : block.nodeNumber}
              onChange={(e) => {
                if (isTopLevelContextBlock) return;
                const val = parseInt(e.target.value, 10);
                const num = isNaN(val) ? 1 : Math.max(1, Math.min(8, val));
                store.updateBlock(block.id, { nodeNumber: num });
              }}
              style={isTopLevelContextBlock ? { background: 'var(--bg-card, #f8fafc)', cursor: 'not-allowed', color: 'var(--text-secondary, #64748b)' } : undefined}
              data-testid="input-block-number"
            />
          </div>
  
          <button
            className="btn-tool"
            style={{ height: '34px', width: '100%', justifyContent: 'center' }}
            onClick={() => store.decomposeBlock(block.id)}
            title="Декомпозировать блок на дочернюю диаграмму"
            data-testid="btn-decompose-block"
          >
            <GitFork size={14} />
            <span>Декомпозиция</span>
          </button>
  
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Позиция X</label>
              <input
                type="number"
                min={20}
                max={1580 - block.width}
                className="form-input"
                value={block.x}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const x = isNaN(val) ? 30 : Math.max(20, Math.min(1580 - block.width, val));
                  store.updateBlock(block.id, { x });
                }}
                data-testid="input-block-x"
              />
            </div>
  
            <div className="form-group">
              <label className="form-label">Позиция Y</label>
              <input
                type="number"
                min={30}
                max={870 - block.height}
                className="form-input"
                value={block.y}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const y = isNaN(val) ? 40 : Math.max(30, Math.min(870 - block.height, val));
                  store.updateBlock(block.id, { y });
                }}
                data-testid="input-block-y"
              />
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Ширина</label>
              <input
                type="number"
                min={100}
                max={800}
                className="form-input"
                value={block.width}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const width = isNaN(val) ? 210 : Math.max(100, Math.min(800, val));
                  store.resizeBlock(block.id, { x: block.x, y: block.y, width, height: block.height });
                }}
                data-testid="input-block-width"
              />
            </div>
  
            <div className="form-group">
              <label className="form-label">Высота</label>
              <input
                type="number"
                min={60}
                max={600}
                className="form-input"
                value={block.height}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const height = isNaN(val) ? 130 : Math.max(60, Math.min(600, val));
                  store.resizeBlock(block.id, { x: block.x, y: block.y, width: block.width, height });
                }}
                data-testid="input-block-height"
              />
            </div>
          </div>
  
          {/* 4 ICOM Sections */}
          {renderICOMSection('Входы', 'input', 'left')}
          {renderICOMSection('Управление', 'control', 'top')}
          {renderICOMSection('Выходы', 'output', 'right')}
          {renderICOMSection('Механизмы', 'mechanism', 'bottom')}
  
          <button
            className="btn btn-danger btn-sm"
            style={{ width: '100%' }}
            onClick={() => {
              if (confirm('Удалить этот блок? Все привязанные стрелки будут удалены.')) {
                store.deleteBlock(block.id);
              }
            }}
            data-testid="btn-delete-block-inspector"
          >
            <Trash2 size={14} />
            <span>Удалить</span>
          </button>
        </div>
      );
};
export default BlockInspector;
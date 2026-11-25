import React, { useState, useEffect, useRef } from 'react';
import { Network, AlertCircle, AlertTriangle, X, ChevronDown, ChevronRight, GitMerge } from 'lucide-react';
import { store } from '../core/store';
import { runIDEF0Linter } from '../core/linter';
import { getBlockCode } from '../core/geometry';
import { EditorState } from '../core/store/types';
import { Diagram, Block } from '../types/idef0';

interface TreeProps {
  state: EditorState;
}

function cleanTitle(title?: string): string {
  if (typeof title === 'string') {
    return title.replace(/^(Контекстная диаграмма:\s*|Декомпозиция:\s*)/, '').trim();
  }
  return '';
}

export const Tree: React.FC<TreeProps> = ({ state }) => {
  const { project, activeDiagramId, selectedObjectId, leftPanelOpen } = state;
  const diagrams = project?.diagrams || [];
  const [panelWidth, setPanelWidth] = useState(270);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const isResizing = useRef(false);

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: prev[nodeId] === false ? true : false,
    }));
  };

  const handleSelectDiagram = (diagId: string) => {
    store.switchDiagram(diagId);
    const targetDiag = diagrams.find((d: Diagram) => d.id === diagId);
    if (targetDiag && targetDiag.parentBlockId === null && targetDiag.blocks[0]) {
      store.selectObject(targetDiag.blocks[0].id, 'block');
    }
  };

  const handleSelectBlock = (diagId: string, blockId: string) => {
    if (activeDiagramId !== diagId) {
      store.switchDiagram(diagId);
    }
    store.selectObject(blockId, 'block');
  };

  // Panel resize handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        const newW = Math.max(200, Math.min(500, e.clientX));
        setPanelWidth(newW);
      }
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const renderBlockList = (diag: Diagram, depth: number) => {
    return (
      <div
        style={{
          position: 'relative',
          paddingLeft: '20px',
          marginLeft: '12px',
          borderLeft: '1.5px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          marginTop: '1px',
        }}
      >
        {diag.blocks.map((blk) => {
          const blkId = blk.id;
          const blkNum = blk.nodeNumber;
          const blkName = blk.name;
          const isBlockSelected = selectedObjectId === blkId && activeDiagramId === diag.id;
          const blockCode = getBlockCode(diag.code, blkNum);
          const childDiag = diagrams.find(
            (d: Diagram) => d.parentBlockId === blkId || (blk.decompDiagramId && d.id === blk.decompDiagramId)
          );
          const isBlockExpanded = expandedNodes[blkId] !== false;

          return (
            <div key={blkId} style={{ position: 'relative' }}>
              {/* Connector line */}
              <div
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '14px',
                  width: '16px',
                  height: '1.5px',
                  background: 'var(--border-color, #e2e8f0)',
                }}
              />

              {/* Block Node Row */}
              <div
                className={`tree-node${isBlockSelected ? ' active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 6px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  background: isBlockSelected ? 'var(--accent-subtle, #eff6ff)' : 'transparent',
                  border: isBlockSelected
                    ? '1px solid var(--accent-primary, #2563eb)'
                    : '1px solid transparent',
                }}
                onClick={() => handleSelectBlock(diag.id, blkId)}
                data-testid={
                  diag.parentBlockId === null && blkNum === 0
                    ? `tree-node-block-${blockCode}`
                    : `tree-node-${blockCode}`
                }
              >
                {childDiag ? (
                  <button
                    onClick={(e) => toggleExpand(blkId, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                    }}
                    title={isBlockExpanded ? 'Свернуть' : 'Развернуть'}
                  >
                    {isBlockExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                ) : (
                  <span style={{ width: '13px' }} />
                )}

                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '11px',
                    background: isBlockSelected ? '#2563eb' : 'var(--bg-card, #f1f5f9)',
                    color: isBlockSelected ? '#ffffff' : 'var(--text-secondary, #475569)',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color, #cbd5e1)',
                  }}
                >
                  {blockCode}
                </span>

                <span
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '11px',
                    color: isBlockSelected ? '#1e293b' : 'var(--text-secondary, #334155)',
                  }}
                  title={blkName.replace(/\n/g, ' ')}
                >
                  {blkName.replace(/\n/g, ' ')}
                </span>

                {/* Quick Decompose Button */}
                {!childDiag && (
                  <button
                    className="btn-icon"
                    style={{ width: '20px', height: '20px', padding: '2px', opacity: 0.7 }}
                    title={`Декомпозировать блок ${blockCode}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      store.switchDiagram(diag.id);
                      store.decomposeBlock(blkId);
                    }}
                    data-testid={`btn-decompose-tree-${blockCode}`}
                  >
                    <GitMerge size={12} />
                  </button>
                )}
              </div>

              {/* Sub-decomposition of this Block */}
              {childDiag && isBlockExpanded && renderBlockList(childDiag, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDiagramHierarchy = (diag: Diagram, depth: number) => {
    const diagId = diag.id;
    const diagCode = diag.code;
    const isRootContext = diag.parentBlockId === null;
    const rootBlock = diag.blocks[0];
    const isActive = isRootContext
      ? activeDiagramId === diagId &&
        (selectedObjectId === null || (rootBlock && selectedObjectId === rootBlock.id))
      : diagId === activeDiagramId;
    const isExpanded = expandedNodes[diagId] !== false;
    const issues = project ? runIDEF0Linter(project, diagId) : [];
    const errors = issues.filter((i) => i.severity === 'error').length;
    const warnings = issues.filter((i) => i.severity === 'warning').length;
    const rootChildDiag = isRootContext
      ? diagrams.find(
          (d: Diagram) =>
            rootBlock &&
            (d.parentBlockId === rootBlock.id ||
              (rootBlock.decompDiagramId && d.id === rootBlock.decompDiagramId))
        )
      : undefined;
    const hasChildren = isRootContext
      ? Boolean(rootChildDiag && rootChildDiag.blocks.length > 0)
      : diag.blocks.length > 0;
    const displayTitle =
      isRootContext && rootBlock && rootBlock.name
        ? rootBlock.name.replace(/\n/g, ' ')
        : diag.title;

    return (
      <div key={diagId} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {/* Diagram Row */}
        <div
          className={`tree-node${isActive ? ' active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
            background: isActive ? 'var(--accent-subtle, #eff6ff)' : 'transparent',
            border: isActive
              ? '1px solid var(--accent-primary, #2563eb)'
              : '1px solid transparent',
          }}
          onClick={() => handleSelectDiagram(diagId)}
          data-testid={isRootContext ? 'tree-node-A0' : `tree-node-diag-${diagCode}`}
        >
          {hasChildren ? (
            <button
              onClick={(e) => toggleExpand(diagId, e)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
              title={isExpanded ? 'Свернуть' : 'Развернуть'}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <span style={{ width: '14px' }} />
          )}

          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '11px',
              background: isActive ? '#2563eb' : 'var(--bg-card, #f1f5f9)',
              color: isActive ? '#ffffff' : 'var(--text-secondary, #475569)',
              padding: '1px 5px',
              borderRadius: '4px',
              border: '1px solid var(--border-color, #cbd5e1)',
            }}
          >
            {diagCode}
          </span>

          <span
            style={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontWeight: isActive ? 600 : 500,
              color: 'var(--text-primary)',
            }}
            title={cleanTitle(displayTitle)}
          >
            {cleanTitle(displayTitle)}
          </span>

          {errors > 0 && (
            <span
              title={`${errors} ошибок`}
              style={{ color: 'var(--danger)', display: 'flex' }}
            >
              <AlertCircle size={13} />
            </span>
          )}

          {warnings > 0 && errors === 0 && (
            <span
              title={`${warnings} предупреждений`}
              style={{ color: 'var(--warning)', display: 'flex' }}
            >
              <AlertTriangle size={13} />
            </span>
          )}
        </div>

        {/* Children */}
        {isExpanded && isRootContext && rootChildDiag && renderBlockList(rootChildDiag, depth + 1)}
        {isExpanded && !isRootContext && diag.blocks.length > 0 && renderBlockList(diag, depth + 1)}
      </div>
    );
  };

  const rootDiagrams = diagrams.filter((d: Diagram) => d.parentBlockId === null);
  const orphanDiagrams = diagrams.filter((d: Diagram) => {
    if (d.parentBlockId === null) return false;
    return !diagrams.some((pd: Diagram) => pd.blocks.some((b: Block) => b.id === d.parentBlockId));
  });

  return (
    <aside
      className={`side-panel left${!leftPanelOpen ? ' collapsed' : ''}`}
      style={{ width: leftPanelOpen ? `${panelWidth}px` : 0 }}
      data-testid="diagram-tree-panel"
    >
      <div className="panel-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Network size={14} />
          <span>Дерево</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <button
            className="btn-icon"
            onClick={() => store.toggleLeftPanel()}
            title="Скрыть дерево"
            data-testid="btn-collapse-left"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="panel-body" style={{ padding: '8px 6px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {rootDiagrams.map((rd) => renderDiagramHierarchy(rd, 0))}
          {orphanDiagrams.map((od) => renderDiagramHierarchy(od, 1))}
        </div>
      </div>

      {leftPanelOpen && (
        <div
          className="panel-resize-handle right-edge"
          onMouseDown={(e) => {
            e.preventDefault();
            isResizing.current = true;
            document.body.style.cursor = 'ew-resize';
          }}
          title="Потяните для изменения ширины панели"
          data-testid="resize-handle-left"
        />
      )}
    </aside>
  );
};

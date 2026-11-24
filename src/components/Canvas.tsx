import React, { useRef } from 'react';
import { store } from '../core/store';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/geometry';
import CanvasDefs from './canvas/CanvasDefs';
import CanvasBlock from './canvas/CanvasBlock';
import CanvasArrow from './canvas/CanvasArrow';
import CanvasArrowHandles from './canvas/CanvasArrowHandles';
import CanvasJunction from './canvas/CanvasJunction';
import CanvasDraftOverlay from './canvas/CanvasDraftOverlay';
import { useCanvasDnd } from './canvas/useCanvasDnd';
import { EditorState } from '../core/store/types';
import { Arrow, Block, Diagram, Junction } from '../types/idef0';

interface CanvasProps {
  state: EditorState;
  onCursorChange: (pos: { x: number; y: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ state, onCursorChange }) => {
  const {
    project,
    activeDiagramId,
    selectedObjectId,
    selectedObjectType,
    activeTool,
    zoom,
    gridVisible,
  } = state;

  const diagrams = project?.diagrams || [];
  const diag = diagrams.find((d: Diagram) => d.id === activeDiagramId);
  const svgRef = useRef<SVGSVGElement>(null);

  if (!diag) {
    return (
      <div className="canvas-viewport" data-testid="canvas-empty">
        <div style={{ color: 'var(--text-muted)' }}>Диаграмма не найдена</div>
      </div>
    );
  }

  const dnd = useCanvasDnd({
    diag,
    activeTool,
    zoom,
    svgRef,
    onCursorChange,
  });

  const {
    dragState,
    editingBlockId,
    setEditingBlockId,
    editingArrowId,
    setEditingArrowId,
    editText,
    setEditText,
    getSvgCoordinates,
    handleCanvasMouseMove,
    handleCanvasMouseDown,
    handleBlockMouseDown,
    handleResizeHandleMouseDown,
    handleBlockDoubleClick,
    handleArrowClick,
    handleArrowDoubleClick,
    handleInlineKeyDown,
    startArrowFromSnap,
    startSegmentDrag,
    startEndpointDrag,
    startLabelDrag,
    startJunctionDrag,
  } = dnd;

  const handleViewportWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      const newZoom = Math.max(0.2, Math.min(2.5, Math.round((zoom + delta) * 100) / 100));
      store.setZoom(newZoom);
    }
  };

  const selectedArrow =
    selectedObjectType === 'arrow'
      ? diag.arrows.find((a: Arrow) => a.id === selectedObjectId)
      : undefined;

  return (
    <div
      className="canvas-viewport"
      onMouseMove={handleCanvasMouseMove}
      onWheel={handleViewportWheel}
      data-testid="canvas-viewport"
    >
      <div
        className="canvas-sheet-wrapper"
        style={{
          width: `${CANVAS_WIDTH * zoom}px`,
          height: `${CANVAS_HEIGHT * zoom}px`,
          position: 'relative',
        }}
      >
        <svg
          ref={svgRef}
          id="idef0-diagram"
          className="canvas-svg"
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          width={CANVAS_WIDTH * zoom}
          height={CANVAS_HEIGHT * zoom}
          onMouseDown={handleCanvasMouseDown}
          data-testid="idef0-svg-canvas"
        >
          <CanvasDefs gridVisible={gridVisible} />

          {/* Dynamic arrow markers */}
          <defs>
            {diag.arrows.map((arr: Arrow) => {
              const arrId = arr.id;
              return (
                <marker
                  key={`marker-${arrId}`}
                  id={`marker-arrow-${arrId}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0,1.5 L 8,5 L 0,8.5 Z"
                    fill={selectedObjectId === arrId ? 'var(--accent-primary, #2563eb)' : '#000000'}
                  />
                </marker>
              );
            })}
          </defs>

          {/* Canvas Background Sheet */}
          <rect width="100%" height="100%" fill="#ffffff" id="background" />

          {/* In-flight Snap and Draft Overlays */}
          <CanvasDraftOverlay dragState={dragState} diag={diag} activeTool={activeTool} />

          {/* Arrows / Flows */}
          {diag.arrows.map((arrow: Arrow) => (
            <CanvasArrow
              key={arrow.id}
              arrow={arrow}
              diag={diag}
              isSelected={selectedObjectId === arrow.id && selectedObjectType === 'arrow'}
              activeTool={activeTool}
              editingArrowId={editingArrowId}
              getSvgCoordinates={getSvgCoordinates}
              onArrowClick={handleArrowClick}
              onArrowDoubleClick={handleArrowDoubleClick}
              onStartArrowFromSnap={startArrowFromSnap}
              onStartSegmentDrag={startSegmentDrag}
              onStartLabelDrag={startLabelDrag}
            />
          ))}

          {/* Junctions (Branch / Merge Dots) */}
          {diag.junctions.map((junc: Junction) => {
            const parentArr = diag.arrows.find((a: Arrow) => a.id === junc.parentArrowId);
            const dotColor = parentArr && (parentArr as any).color ? (parentArr as any).color : '#000000';
            const isDragging =
              dragState && dragState.type === 'junction_drag' && dragState.juncId === junc.id;

            return (
              <CanvasJunction
                key={junc.id}
                junction={junc}
                activeTool={activeTool}
                dotColor={dotColor}
                isDraggingThis={Boolean(isDragging)}
                getSvgCoordinates={getSvgCoordinates}
                onStartJunctionDrag={startJunctionDrag}
              />
            );
          })}

          {/* Functional Blocks */}
          <g id="blocks">
            {diag.blocks.map((block: Block) => (
              <CanvasBlock
                key={block.id}
                block={block}
                diag={diag}
                isSelected={selectedObjectId === block.id && selectedObjectType === 'block'}
                editingBlockId={editingBlockId}
                onBlockMouseDown={handleBlockMouseDown}
                onBlockDoubleClick={handleBlockDoubleClick}
                onResizeHandleMouseDown={handleResizeHandleMouseDown}
              />
            ))}
          </g>

          {/* Top-layer handles for selected arrow */}
          {selectedArrow && (
            <CanvasArrowHandles
              arrow={selectedArrow}
              activeTool={activeTool}
              getSvgCoordinates={getSvgCoordinates}
              onStartEndpointDrag={startEndpointDrag}
            />
          )}
        </svg>

        {/* Inline HTML Text Editors */}
        {editingBlockId && (
          (() => {
            const block = diag.blocks.find((b: Block) => b.id === editingBlockId);
            if (!block) return null;
            return (
              <div
                style={{
                  position: 'absolute',
                  left: `${(block.x + 4) * zoom}px`,
                  top: `${(block.y + 4) * zoom}px`,
                  width: `${(block.width - 8) * zoom}px`,
                  height: `${(block.height - 8) * zoom}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  zIndex: 30,
                }}
              >
                <textarea
                  autoFocus
                  className="form-input"
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: `${13 * zoom}px`,
                    background: '#ffffff',
                    color: '#000000',
                    border: '2px dashed var(--accent)',
                    borderRadius: '3px',
                    outline: 'none',
                    resize: 'none',
                  }}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleInlineKeyDown}
                  onBlur={() => {
                    store.updateBlock(editingBlockId, { name: editText });
                    setEditingBlockId(null);
                  }}
                  data-testid="inline-block-editor"
                />
              </div>
            );
          })()
        )}

        {editingArrowId && (
          (() => {
            const arrow = diag.arrows.find((a: Arrow) => a.id === editingArrowId);
            const lx =
              (arrow?.labelPos?.x ?? (arrow ? arrow.points[0].x + 10 : 100)) * zoom;
            const ly =
              (arrow?.labelPos?.y ?? (arrow ? arrow.points[0].y - 10 : 100)) * zoom;

            return (
              <div
                style={{
                  position: 'absolute',
                  left: `${lx}px`,
                  top: `${ly}px`,
                  zIndex: 30,
                }}
              >
                <textarea
                  autoFocus
                  className="form-input"
                  rows={1}
                  style={{
                    fontWeight: 500,
                    fontSize: `${12 * zoom}px`,
                    background: '#ffffff',
                    border: '1px dashed var(--accent)',
                    borderRadius: '3px',
                    outline: 'none',
                    resize: 'none',
                    whiteSpace: 'pre',
                  }}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleInlineKeyDown}
                  onBlur={() => {
                    store.updateArrow(editingArrowId, { label: editText });
                    setEditingArrowId(null);
                  }}
                  data-testid="inline-arrow-editor"
                />
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

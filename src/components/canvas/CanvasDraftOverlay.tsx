import React from 'react';
import { Diagram, Side, ArrowEndpoint } from '../../types/idef0';
import { DragState } from './types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, buildOrthogonalRoute, pointsToSvgPath } from '../../core/geometry';

interface CanvasDraftOverlayProps {
  dragState: DragState | null;
  diag: Diagram;
  activeTool: string;
}

const CanvasDraftOverlay: React.FC<CanvasDraftOverlayProps> = ({
  dragState,
  diag,
  activeTool,
}) => {
  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'input': return 'Вход';
      case 'control': return 'Управление';
      case 'output': return 'Выход';
      case 'mechanism': return 'Механизм';
      default: return 'Стрелка';
    }
  };

  return (
    <>
      {/* Border Snap Zone Visual Guides (when tool is arrow) */}
      {activeTool === 'arrow' && (
        <g id="border-guides" pointerEvents="none">
          <line x1="30" y1="0" x2="30" y2={CANVAS_HEIGHT} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" opacity={0.6} />
          <line x1="0" y1="40" x2={CANVAS_WIDTH} y2="40" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" opacity={0.6} />
          <line x1="1580" y1="0" x2="1580" y2={CANVAS_HEIGHT} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" opacity={0.6} />
          <line x1="0" y1="865" x2={CANVAS_WIDTH} y2="865" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" opacity={0.6} />
        </g>
      )}

      {/* Active Side Snap Highlighting */}
      {dragState?.type === 'arrow_draw' && dragState.currentSnap?.sideBounds && (
        <g pointerEvents="none">
          <line
            x1={dragState.currentSnap.sideBounds.x1}
            y1={dragState.currentSnap.sideBounds.y1}
            x2={dragState.currentSnap.sideBounds.x2}
            y2={dragState.currentSnap.sideBounds.y2}
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))' }}
          />
          <text
            x={(dragState.currentSnap.sideBounds.x1 + dragState.currentSnap.sideBounds.x2) / 2}
            y={(dragState.currentSnap.sideBounds.y1 + dragState.currentSnap.sideBounds.y2) / 2 - 12}
            textAnchor="middle"
            fill="#334155"
            fontSize="12"
            fontWeight="bold"
            fontFamily="sans-serif"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))' }}
          >
            {getRoleLabel(dragState.currentSnap.role)}
          </text>
        </g>
      )}

      {/* Active Arrow Segment Snap Highlighting */}
      {dragState?.type === 'arrow_draw' && dragState.currentSnap?.type === 'arrow_segment' && (
        <g pointerEvents="none">
          {dragState.currentSnap.sideBounds && (
            <line
              x1={dragState.currentSnap.sideBounds.x1}
              y1={dragState.currentSnap.sideBounds.y1}
              x2={dragState.currentSnap.sideBounds.x2}
              y2={dragState.currentSnap.sideBounds.y2}
              stroke="#64748b"
              strokeWidth="3"
              opacity="0.8"
            />
          )}
          <circle
            cx={dragState.currentSnap.point.x}
            cy={dragState.currentSnap.point.y}
            r="4.5"
            fill="#334155"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* Active Dragging Arrow Draft Preview */}
      {dragState?.type === 'arrow_draw' && dragState.draftSource && dragState.currentPoint && (() => {
        let targetEndpoint: ArrowEndpoint;
        if (dragState.currentSnap) {
          targetEndpoint = {
            type: dragState.currentSnap.type,
            id: dragState.currentSnap.id,
            side: dragState.currentSnap.side,
            point: dragState.currentSnap.point,
          };
        } else {
          const srcPt = dragState.draftSource.point;
          const curPt = dragState.currentPoint;
          const srcSide = dragState.draftSource.side;
          let inferredSide: Side = 'right';
          if (srcSide === 'top') {
            inferredSide = 'bottom';
          } else if (srcSide === 'bottom') {
            inferredSide = 'top';
          } else if (curPt.x < srcPt.x - 20) {
            inferredSide = 'left';
          }
          targetEndpoint = {
            type: 'border',
            side: inferredSide,
            point: curPt,
          };
        }

        const previewPoints = buildOrthogonalRoute(
          {
            type: dragState.draftSource.type,
            id: dragState.draftSource.id,
            side: dragState.draftSource.side,
            point: dragState.draftSource.point,
          },
          targetEndpoint,
          diag.blocks
        );

        return (
          <g id="draft-arrow-layer" pointerEvents="none">
            <path
              d={pointsToSvgPath(previewPoints, false)}
              fill="none"
              stroke="var(--accent-primary, #2563eb)"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
            />
          </g>
        );
      })()}

      {/* Active Endpoint Drag Preview */}
      {dragState?.type === 'endpoint_drag' && dragState.arrowId && dragState.currentPoint && (() => {
        const arrow = diag.arrows.find((a) => a.id === dragState.arrowId);
        if (!arrow || !arrow.points) return null;
        const targetPt = dragState.currentSnap?.point || dragState.currentPoint;

        let sourceEndpoint: ArrowEndpoint;
        let targetEndpoint: ArrowEndpoint;

        if (dragState.endType === 'target') {
          sourceEndpoint = arrow.source;
          targetEndpoint = dragState.currentSnap
            ? {
                type: dragState.currentSnap.type,
                id: dragState.currentSnap.id,
                side: dragState.currentSnap.side,
                point: dragState.currentSnap.point,
              }
            : {
                type: 'border',
                side: 'right',
                point: targetPt,
              };
        } else {
          sourceEndpoint = dragState.currentSnap
            ? {
                type: dragState.currentSnap.type,
                id: dragState.currentSnap.id,
                side: dragState.currentSnap.side,
                point: dragState.currentSnap.point,
              }
            : {
                type: 'border',
                side: 'left',
                point: targetPt,
              };
          targetEndpoint = arrow.target;
        }

        const previewPoints = buildOrthogonalRoute(sourceEndpoint, targetEndpoint, diag.blocks);

        return (
          <g id="draft-endpoint-layer" pointerEvents="none">
            <path
              d={pointsToSvgPath(previewPoints, false)}
              fill="none"
              stroke="var(--accent-primary, #2563eb)"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
            />
            <circle
              cx={targetPt.x}
              cy={targetPt.y}
              r="4"
              fill="var(--accent-primary, #2563eb)"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        );
      })()}
    </>
  );
};

export default CanvasDraftOverlay;

import React from 'react';
import { Arrow, Diagram, Point, SnapTarget } from '../../types/idef0';
import {
  pointsToSvgPath,
  getRenderPointsForArrow,
  getSegmentsFromPoints,
  distanceToSegment,
  findSnapTarget,
} from '../../core/geometry';
import { store } from '../../core/store';

interface CanvasArrowProps {
  arrow: Arrow;
  diag: Diagram;
  isSelected: boolean;
  activeTool: string;
  editingArrowId: string | null;
  getSvgCoordinates: (e: React.MouseEvent | MouseEvent) => Point;
  onArrowClick: (e: React.MouseEvent, arrow: Arrow) => void;
  onArrowDoubleClick: (e: React.MouseEvent, arrow: Arrow) => void;
  onStartArrowFromSnap: (snap: SnapTarget, pt: Point) => void;
  onStartSegmentDrag: (arrow: Arrow, segIdx: number, pt: Point) => void;
  onStartLabelDrag: (arrow: Arrow, pt: Point) => void;
}

export const CanvasArrow: React.FC<CanvasArrowProps> = ({
  arrow,
  diag,
  isSelected,
  activeTool,
  editingArrowId,
  getSvgCoordinates,
  onArrowClick,
  onArrowDoubleClick,
  onStartArrowFromSnap,
  onStartSegmentDrag,
  onStartLabelDrag,
}) => {
  const renderPoints = getRenderPointsForArrow(arrow, diag.junctions, diag.arrows);
  const pathD = pointsToSvgPath(renderPoints, true, 8);
  const segments = getSegmentsFromPoints(arrow.points, arrow.id);
  const labelX = arrow.labelPos ? arrow.labelPos.x : arrow.points[0].x + 10;
  const labelY = arrow.labelPos ? arrow.labelPos.y : arrow.points[0].y - 10;
  const lines = arrow.label.split('\n');

  return (
    <g
      key={arrow.id}
      id={arrow.id}
      className="flow-group"
      onClick={(e) => onArrowClick(e, arrow)}
      onDoubleClick={(e) => onArrowDoubleClick(e, arrow)}
      data-testid={`flow-group-${arrow.id}`}
    >
      {/* Wide hit area for clicking, dragging segments, and branching */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{
          cursor: activeTool === 'arrow' ? 'crosshair' : 'pointer',
        }}
        onMouseDown={(e) => {
          const pt = getSvgCoordinates(e);
          if (activeTool === 'block') {
            e.stopPropagation();
            store.createBlock(pt.x - 105, pt.y - 65);
            store.setTool('select');
            return;
          }
          if (activeTool === 'arrow') {
            e.stopPropagation();
            const snap = findSnapTarget(pt, [], [arrow], 25);
            if (snap) {
              onStartArrowFromSnap(snap, pt);
            }
          } else if (activeTool === 'select') {
            e.stopPropagation();
            store.selectObject(arrow.id, 'arrow');
            const segs = getSegmentsFromPoints(arrow.points, arrow.id, arrow.source.side, arrow.target.side);
            let bestSegIdx = 0;
            let minDist = Infinity;
            for (let i = 0; i < segs.length; i++) {
              const d = distanceToSegment(pt, segs[i]).dist;
              if (d < minDist) {
                minDist = d;
                bestSegIdx = i;
              }
            }
            onStartSegmentDrag(arrow, bestSegIdx, pt);
          }
        }}
      />

      {/* Main Path */}
      <path
        className={`flow-line ${isSelected ? 'selected' : ''}`}
        d={pathD}
        markerEnd={arrow.target.type !== 'junction' ? `url(#marker-arrow-${arrow.id})` : undefined}
        id={`path-${arrow.id}`}
        style={{
          stroke: isSelected ? 'var(--accent-primary, #2563eb)' : (arrow.color || '#000000'),
          cursor: 'pointer',
          pointerEvents: 'stroke',
        }}
        onClick={(e) => {
          e.stopPropagation();
          store.selectObject(arrow.id, 'arrow');
        }}
      />

      {/* Arrow Tunneling Markers (IDEF0 Parentheses / Tunnel circles) */}
      {arrow.tunnelSource && renderPoints.length > 0 && (
        <circle
          cx={renderPoints[0].x}
          cy={renderPoints[0].y}
          r="6"
          fill="none"
          stroke={arrow.color || '#000000'}
          strokeWidth="1.5"
          strokeDasharray="2,2"
          id={`tunnel-src-${arrow.id}`}
          data-testid={`tunnel-src-${arrow.id}`}
          style={{ pointerEvents: 'none' }}
        />
      )}
      {arrow.tunnelTarget && renderPoints.length > 0 && (
        <circle
          cx={renderPoints[renderPoints.length - 1].x}
          cy={renderPoints[renderPoints.length - 1].y}
          r="6"
          fill="none"
          stroke={arrow.color || '#000000'}
          strokeWidth="1.5"
          strokeDasharray="2,2"
          id={`tunnel-tgt-${arrow.id}`}
          data-testid={`tunnel-tgt-${arrow.id}`}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Decorative Leader Path */}
      {arrow.showLeader && arrow.leaderPoints && arrow.leaderPoints.length >= 2 && (
        <path
          className="flow-leader"
          d={pointsToSvgPath(arrow.leaderPoints, false)}
          id={`leader-${arrow.id}`}
          style={{
            stroke: '#000000',
            cursor: activeTool === 'arrow' ? 'crosshair' : 'move',
            pointerEvents: activeTool === 'arrow' ? 'none' : 'auto',
          }}
          onMouseDown={(e) => {
            if (activeTool === 'arrow') return;
            e.stopPropagation();
            store.selectObject(arrow.id, 'arrow');
            onStartLabelDrag(arrow, getSvgCoordinates(e));
          }}
        />
      )}

      {/* Arrow Label */}
      {arrow.label && editingArrowId !== arrow.id && (
        <text
          className={`flow-label ${isSelected ? 'selected' : ''}`}
          x={labelX}
          y={labelY}
          id={`text-${arrow.id}`}
          style={{
            cursor: activeTool === 'arrow' ? 'crosshair' : 'move',
            pointerEvents: activeTool === 'arrow' ? 'none' : 'auto',
          }}
          onDoubleClick={(e) => onArrowDoubleClick(e, arrow)}
          onMouseDown={(e) => {
            if (activeTool === 'arrow') return;
            e.stopPropagation();
            store.selectObject(arrow.id, 'arrow');
            onStartLabelDrag(arrow, getSvgCoordinates(e));
          }}
        >
          {lines.length === 1 ? (
            lines[0]
          ) : (
            lines.map((line, idx) => (
              <tspan key={idx} x={labelX} dy={idx === 0 ? 0 : 15} id={`tspan-${arrow.id}-${idx + 1}`}>
                {line}
              </tspan>
            ))
          )}
        </text>
      )}

      {/* Segment Drag Handles when selected */}
      {isSelected &&
        segments.map((seg, sIdx) => {
          const midPt = {
            x: Math.round((seg.start.x + seg.end.x) / 2),
            y: Math.round((seg.start.y + seg.end.y) / 2),
          };
          const isHoriz = seg.orientation === 'horizontal';
          return (
            <circle
              key={sIdx}
              cx={midPt.x}
              cy={midPt.y}
              r="5"
              className="drag-handle"
              style={{
                cursor: isHoriz ? 'ns-resize' : 'ew-resize',
                pointerEvents: activeTool === 'arrow' ? 'none' : 'auto',
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                store.resetArrowRoute(arrow.id);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (sIdx > 0 && sIdx < segments.length - 1) {
                  store.removeArrowSegment(arrow.id, sIdx);
                }
              }}
              onMouseDown={(e) => {
                if (activeTool === 'arrow') return;
                e.stopPropagation();
                onStartSegmentDrag(arrow, sIdx, getSvgCoordinates(e));
              }}
              data-testid={`segment-handle-${arrow.id}-${sIdx}`}
            />
          );
        })}
    </g>
  );
};

export default CanvasArrow;

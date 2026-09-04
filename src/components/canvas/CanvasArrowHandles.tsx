import React from 'react';
import { Arrow, Point } from '../../types/idef0';
import { store } from '../../core/store';

interface CanvasArrowHandlesProps {
  arrow: Arrow;
  activeTool: string;
  getSvgCoordinates: (e: React.MouseEvent | MouseEvent) => Point;
  onStartEndpointDrag: (arrow: Arrow, endType: 'source' | 'target', pt: Point) => void;
}

export const CanvasArrowHandles: React.FC<CanvasArrowHandlesProps> = ({
  arrow,
  activeTool,
  getSvgCoordinates,
  onStartEndpointDrag,
}) => {
  return (
    <g
      className="arrow-handles-overlay"
      key={`arrow-handles-${arrow.id}`}
      style={{ pointerEvents: activeTool === 'arrow' ? 'none' : 'auto' }}
    >
      {/* Source Endpoint Handle (Tail) */}
      <g key={`handle-src-${arrow.id}`}>
        <circle
          cx={arrow.points[0].x}
          cy={arrow.points[0].y}
          r="12"
          fill="transparent"
          style={{ cursor: 'grab' }}
          onMouseDown={(e) => {
            e.stopPropagation();
            const pt = getSvgCoordinates(e);
            onStartEndpointDrag(arrow, 'source', pt);
          }}
          data-testid={`endpoint-handle-source-${arrow.id}`}
        />
        <circle
          cx={arrow.points[0].x}
          cy={arrow.points[0].y}
          r="4.5"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="2"
          style={{ pointerEvents: 'none' }}
        />
      </g>

      {/* Target Endpoint Handle (Head) */}
      <g key={`handle-tgt-${arrow.id}`}>
        <circle
          cx={arrow.points[arrow.points.length - 1].x}
          cy={arrow.points[arrow.points.length - 1].y}
          r="12"
          fill="transparent"
          style={{ cursor: 'grab' }}
          onMouseDown={(e) => {
            e.stopPropagation();
            const pt = getSvgCoordinates(e);
            onStartEndpointDrag(arrow, 'target', pt);
          }}
          data-testid={`endpoint-handle-target-${arrow.id}`}
        />
        <circle
          cx={arrow.points[arrow.points.length - 1].x}
          cy={arrow.points[arrow.points.length - 1].y}
          r="4.5"
          fill="#ffffff"
          stroke="#2563eb"
          strokeWidth="2"
          style={{ pointerEvents: 'none' }}
        />
      </g>
    </g>
  );
};

export default CanvasArrowHandles;

import React from 'react';
import { Junction, Point } from '../../types/idef0';
import { store } from '../../core/store';

interface CanvasJunctionProps {
  junction: Junction;
  activeTool: string;
  dotColor?: string;
  isDraggingThis?: boolean;
  getSvgCoordinates: (e: React.MouseEvent | MouseEvent) => Point;
  onStartJunctionDrag: (juncId: string, pt: Point) => void;
}

const CanvasJunction: React.FC<CanvasJunctionProps> = ({
  junction,
  activeTool,
  dotColor = '#000000',
  isDraggingThis = false,
  getSvgCoordinates,
  onStartJunctionDrag,
}) => {
  return (
    <g
      key={junction.id}
      className="junction-group"
      style={{ pointerEvents: activeTool === 'arrow' ? 'none' : 'auto' }}
    >
      {/* Visual Branch/Merge Dot */}
      <circle
        cx={junction.point.x}
        cy={junction.point.y}
        r="1.2"
        className="junction-dot"
        style={{ fill: dotColor, pointerEvents: 'none' }}
        id={junction.id}
      />
      {/* Interactive Hit Area to drag branch/merge point freely along the entire parent arrow */}
      <circle
        cx={junction.point.x}
        cy={junction.point.y}
        r="10"
        fill="transparent"
        style={{
          cursor: isDraggingThis ? 'grabbing' : 'grab',
        }}
        onMouseDown={(e) => {
          if (activeTool === 'arrow') return;
          e.stopPropagation();
          store.selectObject(junction.id, 'junction');
          onStartJunctionDrag(junction.id, getSvgCoordinates(e));
        }}
        data-testid={`junction-handle-${junction.id}`}
      />
    </g>
  );
};

export default CanvasJunction;

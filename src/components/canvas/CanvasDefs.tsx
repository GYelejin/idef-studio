import React from "react";

interface CanvasDefsProps {
  gridVisible: boolean;
}

const CanvasDefs: React.FC<CanvasDefsProps> = ({ gridVisible }) => (
  <defs>
    <pattern
      id="grid"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M 20 0 L 0 0 0 20"
        fill="none"
        stroke="var(--border-color, #cbd5e1)"
        strokeWidth="0.5"
        strokeOpacity={gridVisible ? "0.4" : "0"}
      />
    </pattern>
    <marker
      id="arrowhead"
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000" />
    </marker>
    <marker
      id="arrowhead-selected"
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--accent-primary, #2563eb)" />
    </marker>
  </defs>
);

export default CanvasDefs;

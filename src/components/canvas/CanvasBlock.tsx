import React from 'react';
import { Block, Diagram } from '../../types/idef0';
import { getBlockCode } from '../../core/geometry';

interface CanvasBlockProps {
  block: Block;
  diag: Diagram;
  isSelected: boolean;
  editingBlockId: string | null;
  onBlockMouseDown: (e: React.MouseEvent, block: Block) => void;
  onBlockDoubleClick: (e: React.MouseEvent, block: Block) => void;
  onResizeHandleMouseDown: (e: React.MouseEvent, block: Block, handle: 'nw' | 'ne' | 'se' | 'sw') => void;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({
  block,
  diag,
  isSelected,
  editingBlockId,
  onBlockMouseDown,
  onBlockDoubleClick,
  onResizeHandleMouseDown,
}) => {
  const textCenterX = block.x + block.width / 2;
  const textCenterY = block.y + block.height / 2;
  const lines = block.name.split('\n');

  return (
    <g
      key={block.id}
      id={block.id}
      onMouseDown={(e) => onBlockMouseDown(e, block)}
      onDoubleClick={(e) => onBlockDoubleClick(e, block)}
      data-testid={`block-group-${block.id}`}
    >
      <rect
        className={`block-rect ${isSelected ? 'selected' : ''}`}
        x={block.x}
        y={block.y}
        width={block.width}
        height={block.height}
        style={{ fill: block.color || '#ffffff' }}
        id={`rect-${block.id}`}
      />

      {/* Block Name Text */}
      {editingBlockId !== block.id && (
        <text
          className="block-text"
          x={textCenterX}
          y={lines.length === 1 ? textCenterY + 5 : textCenterY}
          id={`text-${block.id}`}
        >
          {lines.length === 1 ? (
            lines[0]
          ) : (
            lines.map((line, idx) => {
              const dy = idx === 0 ? -6 * (lines.length - 1) : 20;
              return (
                <tspan key={idx} x={textCenterX} dy={dy} id={`tspan-${block.id}-${idx + 1}`}>
                  {line}
                </tspan>
              );
            })
          )}
        </text>
      )}

      {/* Block Node Number (bottom right) */}
      <text
        className="block-number"
        x={block.x + block.width - 8}
        y={block.y + block.height - 8}
        textAnchor="end"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="12"
        fill="#000000"
        id={`block-number-${block.id}`}
      >
        {getBlockCode(diag.code, block.nodeNumber)}
      </text>

      {/* Corner Resize Handles (when block is selected) */}
      {isSelected && (
        <g className="block-resize-handles" id={`resize-handles-${block.id}`}>
          {/* NW (Top-Left) */}
          <rect
            x={block.x - 5}
            y={block.y - 5}
            width="10"
            height="10"
            fill="#ffffff"
            stroke="var(--accent-primary, #2563eb)"
            strokeWidth="2"
            rx="2"
            pointerEvents="none"
          />
          <rect
            x={block.x - 12}
            y={block.y - 12}
            width="24"
            height="24"
            fill="#ffffff"
            opacity="0.001"
            style={{ cursor: 'nwse-resize', pointerEvents: 'all' }}
            onMouseDown={(e) => onResizeHandleMouseDown(e, block, 'nw')}
            data-testid={`resize-handle-${block.id}-nw`}
          />

          {/* NE (Top-Right) */}
          <rect
            x={block.x + block.width - 5}
            y={block.y - 5}
            width="10"
            height="10"
            fill="#ffffff"
            stroke="var(--accent-primary, #2563eb)"
            strokeWidth="2"
            rx="2"
            pointerEvents="none"
          />
          <rect
            x={block.x + block.width - 12}
            y={block.y - 12}
            width="24"
            height="24"
            fill="#ffffff"
            opacity="0.001"
            style={{ cursor: 'nesw-resize', pointerEvents: 'all' }}
            onMouseDown={(e) => onResizeHandleMouseDown(e, block, 'ne')}
            data-testid={`resize-handle-${block.id}-ne`}
          />

          {/* SW (Bottom-Left) */}
          <rect
            x={block.x - 5}
            y={block.y + block.height - 5}
            width="10"
            height="10"
            fill="#ffffff"
            stroke="var(--accent-primary, #2563eb)"
            strokeWidth="2"
            rx="2"
            pointerEvents="none"
          />
          <rect
            x={block.x - 12}
            y={block.y + block.height - 12}
            width="24"
            height="24"
            fill="#ffffff"
            opacity="0.001"
            style={{ cursor: 'nesw-resize', pointerEvents: 'all' }}
            onMouseDown={(e) => onResizeHandleMouseDown(e, block, 'sw')}
            data-testid={`resize-handle-${block.id}-sw`}
          />

          {/* SE (Bottom-Right) */}
          <rect
            x={block.x + block.width - 5}
            y={block.y + block.height - 5}
            width="10"
            height="10"
            fill="#ffffff"
            stroke="var(--accent-primary, #2563eb)"
            strokeWidth="2"
            rx="2"
            pointerEvents="none"
          />
          <rect
            x={block.x + block.width - 12}
            y={block.y + block.height - 12}
            width="24"
            height="24"
            fill="#ffffff"
            opacity="0.001"
            style={{ cursor: 'nwse-resize', pointerEvents: 'all' }}
            onMouseDown={(e) => onResizeHandleMouseDown(e, block, 'se')}
            data-testid={`resize-handle-${block.id}-se`}
          />
        </g>
      )}
    </g>
  );
};

export default CanvasBlock;

import { useState, useRef, useEffect, useCallback } from 'react';
import { store } from '../../core/store';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  findSnapTarget,
  getSegmentsFromPoints,
  buildOrthogonalRoute,
  snapLabelToArrow,
  validateArrowConnection,
} from '../../core/geometry';
import { Block, Arrow, Point, Diagram, ICOMRole, SnapTarget } from '../../types/idef0';
import { DragState } from './types';

interface UseCanvasDndProps {
  diag: Diagram | undefined;
  activeTool: string;
  zoom: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  onCursorChange: (pos: Point) => void;
}

export function useCanvasDnd({ diag, activeTool, zoom, svgRef, onCursorChange }: UseCanvasDndProps) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const dragStateRef = useRef(dragState);
  dragStateRef.current = dragState;
  const diagRef = useRef(diag);
  diagRef.current = diag;

  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [editingArrowId, setEditingArrowId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const getSvgCoordinates = useCallback((e: React.MouseEvent | MouseEvent): Point => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;
    return {
      x: Math.max(0, Math.min(CANVAS_WIDTH, Math.round(x))),
      y: Math.max(0, Math.min(CANVAS_HEIGHT, Math.round(y))),
    };
  }, [svgRef]);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const currentDrag = dragStateRef.current;
      const currentDiag = diagRef.current;
      if (!currentDrag || !currentDiag) return;

      const pt = getSvgCoordinates(e);
      onCursorChange(pt);

      if (currentDrag.type === 'block' && currentDrag.blockId && currentDrag.startBlockPos) {
        const dx = pt.x - currentDrag.startMouse.x;
        const dy = pt.y - currentDrag.startMouse.y;
        const block = currentDiag.blocks.find((b) => b.id === currentDrag.blockId);
        if (block) {
          const newX = Math.max(30, Math.min(CANVAS_WIDTH - block.width - 30, currentDrag.startBlockPos.x + dx));
          const newY = Math.max(40, Math.min(CANVAS_HEIGHT - block.height - 40, currentDrag.startBlockPos.y + dy));
          store.updateBlock(block.id, { x: Math.round(newX), y: Math.round(newY) }, false);
        }
      } else if (currentDrag.type === 'block_resize' && currentDrag.blockId && currentDrag.startBounds && currentDrag.resizeHandle) {
        const { startBounds, startMouse, resizeHandle } = currentDrag;
        const dx = pt.x - startMouse.x;
        const dy = pt.y - startMouse.y;
        const minW = 140;
        const minH = 80;

        let newX = startBounds.x;
        let newY = startBounds.y;
        let newW = startBounds.width;
        let newH = startBounds.height;

        if (resizeHandle === 'se') {
          newW = Math.max(minW, Math.min(CANVAS_WIDTH - 30 - startBounds.x, startBounds.width + dx));
          newH = Math.max(minH, Math.min(CANVAS_HEIGHT - 40 - startBounds.y, startBounds.height + dy));
        } else if (resizeHandle === 'sw') {
          newW = Math.max(minW, Math.min(startBounds.x + startBounds.width - 30, startBounds.width - dx));
          newX = startBounds.x + (startBounds.width - newW);
          newH = Math.max(minH, Math.min(CANVAS_HEIGHT - 40 - startBounds.y, startBounds.height + dy));
        } else if (resizeHandle === 'ne') {
          newW = Math.max(minW, Math.min(CANVAS_WIDTH - 30 - startBounds.x, startBounds.width + dx));
          newH = Math.max(minH, Math.min(startBounds.y + startBounds.height - 40, startBounds.height - dy));
          newY = startBounds.y + (startBounds.height - newH);
        } else if (resizeHandle === 'nw') {
          newW = Math.max(minW, Math.min(startBounds.x + startBounds.width - 30, startBounds.width - dx));
          newX = startBounds.x + (startBounds.width - newW);
          newH = Math.max(minH, Math.min(startBounds.y + startBounds.height - 40, startBounds.height - dy));
          newY = startBounds.y + (startBounds.height - newH);
        }

        store.resizeBlock(currentDrag.blockId, {
          x: Math.round(newX),
          y: Math.round(newY),
          width: Math.round(newW),
          height: Math.round(newH),
        }, false);
      } else if (currentDrag.type === 'arrow_draw') {
        const snap = findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, currentDrag.draftSource?.id, undefined, 'target', currentDrag.draftSource);
        const updated = { ...currentDrag, currentPoint: pt, currentSnap: snap };
        dragStateRef.current = updated;
        setDragState(updated);
      } else if (currentDrag.type === 'endpoint_drag' && currentDrag.arrowId && currentDrag.endType) {
        const arrow = currentDiag.arrows.find((a) => a.id === currentDrag.arrowId);
        if (arrow) {
          const snap = currentDrag.endType === 'target'
            ? findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, undefined, arrow.id, 'target', arrow.source)
            : findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, undefined, arrow.id, 'start', undefined, arrow.target);
          const updated = { ...currentDrag, currentPoint: pt, currentSnap: snap };
          dragStateRef.current = updated;
          setDragState(updated);
        }
      } else if (currentDrag.type === 'segment_drag' && currentDrag.arrowId && currentDrag.startArrowPoints && currentDrag.segmentIndex !== undefined) {
        const arrow = currentDiag.arrows.find((a) => a.id === currentDrag.arrowId);
        if (arrow) {
          const segIdx = currentDrag.segmentIndex;
          const segs = getSegmentsFromPoints(currentDrag.startArrowPoints, arrow.id, arrow.source.side, arrow.target.side);
          const seg = segs[segIdx];
          const isHoriz = seg ? seg.orientation === 'horizontal' : Math.abs(currentDrag.startArrowPoints[segIdx].y - currentDrag.startArrowPoints[segIdx + 1].y) < 1;

          const newCoord = isHoriz ? pt.y : pt.x;
          store.shiftArrowSegment(arrow.id, segIdx, newCoord, false, currentDrag.startArrowPoints);
        }
      } else if (currentDrag.type === 'label_drag' && currentDrag.arrowId) {
        const arrow = currentDiag.arrows.find((a) => a.id === currentDrag.arrowId);
        if (arrow) {
          const snapped = snapLabelToArrow(pt, arrow, 25);
          store.updateArrow(arrow.id, {
            labelPos: snapped.labelPos,
            showLeader: snapped.showLeader,
            leaderPoints: snapped.leaderPoints,
          }, false);
        }
      } else if (currentDrag.type === 'junction_drag' && currentDrag.juncId) {
        store.moveJunction(currentDrag.juncId, pt, false);
      }
    };

    const handleWindowMouseUp = (e: MouseEvent) => {
      const currentDrag = dragStateRef.current;
      const currentDiag = diagRef.current;
      if (!currentDrag || !currentDiag) return;

      const pt = getSvgCoordinates(e);

      if (currentDrag.type === 'block' && currentDrag.blockId) {
        store.commitBlockMove(currentDrag.blockId);
      } else if (currentDrag.type === 'block_resize' && currentDrag.blockId) {
        store.commitBlockResize(currentDrag.blockId);
      } else if (currentDrag.type === 'segment_drag' && currentDrag.arrowId) {
        store.pushHistory();
      } else if (currentDrag.type === 'label_drag' && currentDrag.arrowId) {
        store.pushHistory();
      } else if (currentDrag.type === 'junction_drag') {
        store.pushHistory();
      } else if (currentDrag.type === 'endpoint_drag' && currentDrag.arrowId && currentDrag.endType) {
        const arrow = currentDiag.arrows.find((a) => a.id === currentDrag.arrowId);
        const finalSnap = arrow
          ? currentDrag.endType === 'target'
            ? findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, undefined, arrow.id, 'target', arrow.source)
            : findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, undefined, arrow.id, 'start', undefined, arrow.target)
          : null;
        store.reconnectArrowEndpoint(currentDrag.arrowId, currentDrag.endType, finalSnap, pt);
      } else if (currentDrag.type === 'arrow_draw' && currentDrag.draftSource) {
        const snap = findSnapTarget(pt, currentDiag.blocks, currentDiag.arrows, 30, currentDrag.draftSource.id, undefined, 'target', currentDrag.draftSource);
        if (snap) {
          const validation = validateArrowConnection(currentDrag.draftSource, snap);
          if (validation.valid) {
            const sourceEndpoint = currentDrag.draftSource;
            const targetEndpoint = snap;
            const role: ICOMRole = validation.role || snap.role || currentDrag.draftSource.role || 'input';
            const points = buildOrthogonalRoute(sourceEndpoint, targetEndpoint, currentDiag.blocks);

            const isBranchOrMerge = sourceEndpoint.type === 'junction' || sourceEndpoint.type === 'arrow_segment' || targetEndpoint.type === 'junction' || targetEndpoint.type === 'arrow_segment';

            store.createArrow({
              label: isBranchOrMerge ? '' : 'Новый поток',
              source: sourceEndpoint,
              target: targetEndpoint,
              role,
              pinned: false,
              points,
              labelPos: { x: sourceEndpoint.point.x + 15, y: sourceEndpoint.point.y - 12 },
            });
          }
        }
      }

      dragStateRef.current = null;
      setDragState(null);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [getSvgCoordinates, onCursorChange]);

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    const pt = getSvgCoordinates(e);
    onCursorChange(pt);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | SVGElement;
    if (target !== svgRef.current && target.id !== 'background' && !target.classList.contains('canvas-viewport') && !target.classList.contains('canvas-sheet-wrapper')) {
      if (activeTool !== 'block' && activeTool !== 'arrow') {
        return;
      }
    }

    if (editingBlockId) setEditingBlockId(null);
    if (editingArrowId) setEditingArrowId(null);

    const pt = getSvgCoordinates(e);

    if (activeTool === 'block') {
      const isContextDiagram = diag ? (diag.parentBlockId === null && (diag.code === 'A0' || diag.code === 'A-0')) : false;
      if (isContextDiagram && (diag?.blocks.length ?? 0) >= 1) {
        store.setTool('select');
      } else {
        store.createBlock(pt.x - 105, pt.y - 65);
        store.setTool('select');
      }
    } else if (activeTool === 'arrow') {
      const snap = findSnapTarget(pt, diag?.blocks || [], diag?.arrows || [], 30, undefined, undefined, 'start');
      if (snap) {
        const newDrag = {
          type: 'arrow_draw' as const,
          startMouse: pt,
          draftSource: snap,
          currentPoint: pt,
        };
        dragStateRef.current = newDrag;
        setDragState(newDrag);
      }
    } else {
      store.selectObject(null, null);
    }
  };

  const handleBlockMouseDown = (e: React.MouseEvent, block: Block) => {
    e.stopPropagation();
    if (editingBlockId) setEditingBlockId(null);
    if (editingArrowId) setEditingArrowId(null);

    const pt = getSvgCoordinates(e);

    if (activeTool === 'arrow') {
      const snap = findSnapTarget(pt, [block], [], 35, undefined, undefined, 'start') ||
                   findSnapTarget({ x: block.x + block.width, y: Math.max(block.y + 15, Math.min(block.y + block.height - 15, pt.y)) }, [block], [], 35, undefined, undefined, 'start');
      if (snap) {
        const newDrag = {
          type: 'arrow_draw' as const,
          startMouse: pt,
          draftSource: snap,
          currentPoint: pt,
        };
        dragStateRef.current = newDrag;
        setDragState(newDrag);
      }
    } else {
      store.selectObject(block.id, 'block');
      const newDrag = {
        type: 'block' as const,
        blockId: block.id,
        startMouse: pt,
        startBlockPos: { x: block.x, y: block.y },
      };
      dragStateRef.current = newDrag;
      setDragState(newDrag);
    }
  };

  const handleResizeHandleMouseDown = (e: React.MouseEvent, block: Block, handle: 'nw' | 'ne' | 'se' | 'sw') => {
    e.stopPropagation();
    if (editingBlockId) setEditingBlockId(null);
    if (editingArrowId) setEditingArrowId(null);

    const pt = getSvgCoordinates(e);
    store.selectObject(block.id, 'block');
    const newDrag = {
      type: 'block_resize' as const,
      blockId: block.id,
      resizeHandle: handle,
      startMouse: pt,
      startBounds: { x: block.x, y: block.y, width: block.width, height: block.height },
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  const handleBlockDoubleClick = (e: React.MouseEvent, block: Block) => {
    e.stopPropagation();
    setEditingBlockId(block.id);
    setEditText(block.name);
  };

  const handleArrowClick = (e: React.MouseEvent, arrow: Arrow) => {
    e.stopPropagation();
    store.selectObject(arrow.id, 'arrow');
  };

  const handleArrowDoubleClick = (e: React.MouseEvent, arrow: Arrow) => {
    e.stopPropagation();
    setEditingArrowId(arrow.id);
    setEditText(arrow.label);
  };

  const handleInlineKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingBlockId) {
        store.updateBlock(editingBlockId, { name: editText });
        setEditingBlockId(null);
      } else if (editingArrowId) {
        store.updateArrow(editingArrowId, { label: editText });
        setEditingArrowId(null);
      }
    } else if (e.key === 'Escape') {
      setEditingBlockId(null);
      setEditingArrowId(null);
    }
  };

  const startArrowDraw = (pt: Point) => {
    if (!diag) return;
    const snap = findSnapTarget(pt, diag.blocks, diag.arrows, 30, undefined, undefined, 'start');
    if (snap) {
      const newDrag = {
        type: 'arrow_draw' as const,
        startMouse: pt,
        draftSource: snap,
        currentPoint: pt,
      };
      dragStateRef.current = newDrag;
      setDragState(newDrag);
    }
  };

  const startArrowFromSnap = (snap: SnapTarget, pt: Point) => {
    const newDrag = {
      type: 'arrow_draw' as const,
      startMouse: pt,
      draftSource: snap,
      currentPoint: pt,
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  const startSegmentDrag = (arrow: Arrow, segIdx: number, pt: Point) => {
    const newDrag = {
      type: 'segment_drag' as const,
      arrowId: arrow.id,
      segmentIndex: segIdx,
      startMouse: pt,
      startArrowPoints: JSON.parse(JSON.stringify(arrow.points)),
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  const startEndpointDrag = (arrow: Arrow, endType: 'source' | 'target', pt: Point) => {
    const newDrag = {
      type: 'endpoint_drag' as const,
      arrowId: arrow.id,
      endType,
      startMouse: pt,
      currentPoint: pt,
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  const startLabelDrag = (arrow: Arrow, pt: Point) => {
    const newDrag = {
      type: 'label_drag' as const,
      arrowId: arrow.id,
      startMouse: pt,
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  const startJunctionDrag = (juncId: string, pt: Point) => {
    const newDrag = {
      type: 'junction_drag' as const,
      juncId,
      startMouse: pt,
    };
    dragStateRef.current = newDrag;
    setDragState(newDrag);
  };

  return {
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
    startArrowDraw,
    startArrowFromSnap,
    startSegmentDrag,
    startEndpointDrag,
    startLabelDrag,
    startJunctionDrag,
  };
}

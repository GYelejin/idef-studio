import { Diagram, Block, Arrow, Side, ICOMRole, Point } from '../../types/idef0';
import { getArrowParent, clampLabelToCanvas } from '../geometry';
import { EditorState } from './types';
import { HistoryOps } from './historyOps';

export const DecompositionOps = {
  decomposeBlock(state: EditorState, blockId: string): string {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return '';

    const block = diag.blocks.find((b) => b.id === blockId);
    if (!block) return '';

    if (block.decompDiagramId && state.project.diagrams.some((d) => d.id === block.decompDiagramId)) {
      DecompositionOps.switchDiagram(state, block.decompDiagramId);
      return block.decompDiagramId;
    }

    HistoryOps.pushHistory(state);

    let childCode: string;
    if (diag.code === 'A-0' || (diag.code === 'A0' && block.nodeNumber === 0 && diag.parentBlockId === null)) {
      childCode = 'A0';
    } else if (diag.code === 'A0') {
      childCode = `A${block.nodeNumber}`;
    } else {
      childCode = `${diag.code}${block.nodeNumber}`;
    }

    const newDiagramId = `diag-${childCode.toLowerCase()}-${Date.now()}`;

    const parentInflows = diag.arrows.filter(
      (a) => a.target.type === 'block' && a.target.id === blockId
    );
    const parentOutflows = diag.arrows.filter(
      (a) => a.source.type === 'block' && a.source.id === blockId
    );

    const childArrows: Arrow[] = [];

    parentInflows.forEach((pin, idx) => {
      const label = pin.label || getArrowParent(pin, diag)?.label || 'Входящий поток';
      let srcSide: Side;
      let srcPoint: Point;
      let tgtPoint: Point;
      let role: ICOMRole;

      if (pin.target.side === 'top' || pin.role === 'control') {
        srcSide = 'top';
        role = 'control';
        srcPoint = { x: 420 + idx * 120, y: 40 };
        tgtPoint = { x: 420 + idx * 120, y: 200 };
      } else if (pin.target.side === 'bottom' || pin.role === 'mechanism') {
        srcSide = 'bottom';
        role = 'mechanism';
        srcPoint = { x: 420 + idx * 120, y: 865 };
        tgtPoint = { x: 420 + idx * 120, y: 700 };
      } else {
        srcSide = 'left';
        role = 'input';
        srcPoint = { x: 30, y: 220 + idx * 70 };
        tgtPoint = { x: 250, y: 220 + idx * 70 };
      }

      childArrows.push({
        id: `hang-in-${pin.id}-${Date.now()}-${idx}`,
        label,
        source: { type: 'border', side: srcSide, point: srcPoint },
        target: { type: 'border', side: srcSide, point: tgtPoint },
        role,
        pinned: false,
        points: [srcPoint, tgtPoint],
        labelPos: clampLabelToCanvas(
          {
            x: srcPoint.x + (srcSide === 'left' ? 10 : 10),
            y: srcPoint.y + (srcSide === 'top' ? 25 : srcSide === 'bottom' ? -25 : -12),
          },
          label
        ),
      });
    });

    parentOutflows.forEach((pout, idx) => {
      const label = pout.label || getArrowParent(pout, diag)?.label || 'Исходящий поток';
      const y = 300 + idx * 90;
      const srcPoint: Point = { x: 1350, y };
      const tgtPoint: Point = { x: 1580, y };

      childArrows.push({
        id: `hang-out-${pout.id}-${Date.now()}-${idx}`,
        label,
        source: { type: 'border', point: srcPoint },
        target: { type: 'border', side: 'right', point: tgtPoint },
        role: 'output',
        pinned: false,
        points: [srcPoint, tgtPoint],
        labelPos: clampLabelToCanvas({ x: 1370, y: y - 12 }, label),
      });
    });

    const initialChildBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      nodeNumber: 1,
      name: 'Новая функция',
      x: 690,
      y: 390,
      width: 220,
      height: 120,
    };

    const newDiag: Diagram = {
      id: newDiagramId,
      code: childCode,
      title: `Декомпозиция: ${block.name.replace(/\n/g, ' ')}`,
      parentBlockId: block.id,
      blocks: [initialChildBlock],
      arrows: childArrows,
      junctions: [],
    };

    block.decompDiagramId = newDiagramId;
    state.project.diagrams.push(newDiag);
    state.activeDiagramId = newDiagramId;
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    return newDiagramId;
  },

  createDiagram(state: EditorState, code: string, title: string, parentBlockId: string | null = null): Diagram {
    HistoryOps.pushHistory(state);
    const newDiag: Diagram = {
      id: `diag-${code.toLowerCase()}-${Date.now()}`,
      code,
      title,
      parentBlockId,
      blocks: [],
      arrows: [],
      junctions: [],
    };
    state.project.diagrams.push(newDiag);
    state.activeDiagramId = newDiag.id;
    return newDiag;
  },

  switchDiagram(state: EditorState, diagramId: string): void {
    const exists = state.project.diagrams.some((d) => d.id === diagramId);
    if (!exists) return;

    state.activeDiagramId = diagramId;
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    state.project.activeDiagramId = diagramId;
  }
};

import { Block } from '../../types/idef0';
import { CANVAS_WIDTH, CANVAS_HEIGHT, adjustArrowOnBlockMove, adjustArrowOnBlockResize, synchronizeJunctions } from '../geometry';
import { EditorState } from './types';
import { HistoryOps } from './historyOps';

export const BlockOps = {
  createBlock(state: EditorState, x: number, y: number, name = 'Новая функция'): Block | null {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return null;

    const isContextDiagram = diag.parentBlockId === null && (diag.code === 'A0' || diag.code === 'A-0');
    if (isContextDiagram && diag.blocks.length >= 1) {
      console.warn('[IDEF0 Rule Violation] На контекстной диаграмме допускается только один функциональный блок.');
      return null;
    }

    const width = 210;
    const height = 130;
    const clampedX = Math.max(30, Math.min(CANVAS_WIDTH - width - 30, x));
    const clampedY = Math.max(40, Math.min(CANVAS_HEIGHT - height - 40, y));

    const usedNums = new Set(diag.blocks.map((b) => b.nodeNumber));
    let nextNum = 1;
    while (usedNums.has(nextNum)) nextNum++;

    HistoryOps.pushHistory(state);

    const block: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      nodeNumber: nextNum,
      name,
      x: clampedX,
      y: clampedY,
      width,
      height,
      decompDiagramId: null,
    };

    diag.blocks.push(block);
    state.selectedObjectId = block.id;
    state.selectedObjectType = 'block';
    return block;
  },

  updateBlock(state: EditorState, id: string, updates: Partial<Block>, saveHistory = true): void {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return;

    const block = diag.blocks.find((b) => b.id === id);
    if (!block) return;

    const oldX = block.x;
    const oldY = block.y;

    if (saveHistory) {
      HistoryOps.pushHistory(state);
    }

    Object.assign(block, updates);

    const dx = block.x - oldX;
    const dy = block.y - oldY;

    if (dx !== 0 || dy !== 0) {
      for (const arrow of diag.arrows) {
        adjustArrowOnBlockMove(arrow, block, dx, dy, diag.junctions, diag.blocks);
      }
      synchronizeJunctions(diag);
    }
  },

  resizeBlock(
    state: EditorState,
    id: string,
    bounds: { x: number; y: number; width: number; height: number },
    saveHistory = true
  ): void {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return;

    const block = diag.blocks.find((b) => b.id === id);
    if (!block) return;

    const oldBounds = { x: block.x, y: block.y, width: block.width, height: block.height };

    if (saveHistory) {
      HistoryOps.pushHistory(state);
    }

    block.x = bounds.x;
    block.y = bounds.y;
    block.width = bounds.width;
    block.height = bounds.height;

    for (const arrow of diag.arrows) {
      adjustArrowOnBlockResize(arrow, block, oldBounds, bounds, diag.junctions, diag.blocks);
    }
    synchronizeJunctions(diag);
  },

  deleteBlock(state: EditorState, id: string): void {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return;

    const blockIdx = diag.blocks.findIndex((b) => b.id === id);
    if (blockIdx === -1) return;

    HistoryOps.pushHistory(state);
    diag.blocks.splice(blockIdx, 1);

    diag.arrows = diag.arrows.filter((a) => {
      const isSrc = a.source.type === 'block' && a.source.id === id;
      const isTgt = a.target.type === 'block' && a.target.id === id;
      return !isSrc && !isTgt;
    });

    if (state.selectedObjectId === id) {
      state.selectedObjectId = null;
      state.selectedObjectType = null;
    }
  }
};

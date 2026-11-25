import { Arrow, ICOMRole, Point, Diagram, Side } from "../../types/idef0";
import { EditorState } from "./types";
import { HistoryOps } from "./historyOps";
import { JunctionOps } from "./junctionOps";
import {
  validateArrowConnection,
  buildOrthogonalRoute,
  generateLeaderPoints,
  clampLabelToCanvas,
  synchronizeJunctions,
} from "../geometry";

function getActiveDiagram(state: EditorState): Diagram | undefined {
  return state.project.diagrams.find((d) => d.id === state.activeDiagramId);
}

export const ArrowOps = {
  createArrow(state: EditorState, arrowData: Omit<Arrow, 'id'> & { id?: string }): Arrow | null {
    const diag = getActiveDiagram(state);
    if (!diag) return null;

    if (!arrowData.source || !arrowData.target) return null;

    const validation = validateArrowConnection(arrowData.source, arrowData.target);
    if (!validation.valid) {
      console.warn(`[IDEF0 Rule Violation] ${validation.reason}`);
      return null;
    }

    const arrowId = arrowData.id || `flow-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newArrow: Arrow = {
      hasArcCorners: true,
      arcRadius: 8,
      ...arrowData,
      role: validation.role || arrowData.role || 'input',
      id: arrowId,
    };

    if (!newArrow.points || newArrow.points.length === 0) {
      newArrow.points = buildOrthogonalRoute(newArrow.source, newArrow.target, diag.blocks);
    }

    // If source or target is junction / segment, register junction
    if ((arrowData.source.type === 'junction' || arrowData.source.type === 'arrow_segment') && arrowData.source.id) {
      const parentArrId = (arrowData.source as { targetArrowId?: string }).targetArrowId || arrowData.source.id;
      const junc = JunctionOps.ensureJunction(diag, {
        type: 'branch',
        point: arrowData.source.point,
        parentArrowId: parentArrId,
        childArrowId: arrowId,
        existingJunctionId: arrowData.source.type === 'junction' ? arrowData.source.id : undefined,
        reuseWithinRadius: arrowData.source.type === 'junction' ? undefined : 5,
      });

      newArrow.source = {
        type: 'junction',
        id: junc.id,
        point: arrowData.source.point,
      };
    }

    if ((arrowData.target.type === 'junction' || arrowData.target.type === 'arrow_segment') && (arrowData.target.id || (arrowData.target as { targetArrowId?: string }).targetArrowId)) {
      const parentArrId = (arrowData.target as { targetArrowId?: string }).targetArrowId || arrowData.target.id || '';
      const junc = JunctionOps.ensureJunction(diag, {
        type: 'merge',
        point: arrowData.target.point,
        parentArrowId: parentArrId,
        childArrowId: arrowId,
        existingJunctionId: arrowData.target.type === 'junction' ? arrowData.target.id : undefined,
        reuseWithinRadius: arrowData.target.type === 'junction' ? undefined : 5,
      });

      newArrow.target = {
        type: 'junction',
        id: junc.id,
        point: arrowData.target.point,
      };
    }

    if (newArrow.labelPos) {
      newArrow.labelPos = clampLabelToCanvas(newArrow.labelPos, newArrow.label);
    }

    HistoryOps.pushHistory(state);
    diag.arrows.push(newArrow);
        state.selectedObjectId = newArrow.id;
    state.selectedObjectType = 'arrow';
    
    return newArrow;
  },

  setArrowRole(state: EditorState, arrowId: string, newRole: ICOMRole, saveHistory = true): boolean {
    const diag = getActiveDiagram(state);
    if (!diag) return false;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return false;

    if (saveHistory) {
      HistoryOps.pushHistory(state);
    }

    const targetSide: Side =
      newRole === 'control' ? 'top' :
      newRole === 'mechanism' ? 'bottom' :
      newRole === 'input' ? 'left' : 'right';

    // 1. If target is a block, adapt its connection port
    if (arrow.target.type === 'block') {
      const targetBlock = diag.blocks.find(b => b.id === arrow.target.id);
      if (targetBlock) {
        let tgtPt: Point;
        if (targetSide === 'top') {
          tgtPt = { x: Math.round(targetBlock.x + targetBlock.width / 2), y: targetBlock.y };
        } else if (targetSide === 'bottom') {
          tgtPt = { x: Math.round(targetBlock.x + targetBlock.width / 2), y: targetBlock.y + targetBlock.height };
        } else if (targetSide === 'left') {
          tgtPt = { x: targetBlock.x, y: Math.round(targetBlock.y + targetBlock.height / 2) };
        } else {
          tgtPt = { x: targetBlock.x + targetBlock.width, y: Math.round(targetBlock.y + targetBlock.height / 2) };
        }

        arrow.target.side = targetSide;
        arrow.target.point = tgtPt;

        // If boundary arrow, also adapt source border to match the new role
        if (arrow.source.type === 'border') {
          if (targetSide === 'top') {
            arrow.source.side = 'top';
            arrow.source.point = { x: tgtPt.x, y: 40 };
          } else if (targetSide === 'bottom') {
            arrow.source.side = 'bottom';
            arrow.source.point = { x: tgtPt.x, y: 865 };
          } else if (targetSide === 'left') {
            arrow.source.side = 'left';
            arrow.source.point = { x: 30, y: tgtPt.y };
          }
        }
      }
    } else if (arrow.target.type === 'border' && arrow.source.type === 'block') {
      // Outflow arrow
      if (targetSide === 'right' || targetSide === 'top' || targetSide === 'bottom') {
        arrow.target.side = targetSide;
        if (targetSide === 'top') arrow.target.point = { x: arrow.source.point.x, y: 40 };
        else if (targetSide === 'bottom') arrow.target.point = { x: arrow.source.point.x, y: 865 };
        else arrow.target.point = { x: 1580, y: arrow.source.point.y };
      }
    }

    arrow.role = newRole;
    arrow.pinned = false;
    arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);

    if (arrow.labelPos) {
      arrow.labelPos = clampLabelToCanvas(arrow.labelPos, arrow.label);
    }
    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }

    
    synchronizeJunctions(diag);
    
    return true;
  },

  updateArrow(state: EditorState, id: string, updates: Partial<Arrow>, saveHistory = true): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;

    const arrow = diag.arrows.find(a => a.id === id);
    if (!arrow) return;

    if (saveHistory) {
      HistoryOps.pushHistory(state);
          }

    if (updates.role && updates.role !== arrow.role) {
      ArrowOps.setArrowRole(state, id, updates.role, false);
      delete updates.role;
    }

    Object.assign(arrow, updates);

    if (arrow.labelPos) {
      arrow.labelPos = clampLabelToCanvas(arrow.labelPos, arrow.label);
    }

    // If label position or points changed, update lightning leader
    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }

    synchronizeJunctions(diag);
    
  },

  toggleArrowTunnel(state: EditorState, arrowId: string, end: 'source' | 'target'): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    HistoryOps.pushHistory(state);
    if (end === 'source') {
      arrow.tunnelSource = !arrow.tunnelSource;
    } else {
      arrow.tunnelTarget = !arrow.tunnelTarget;
    }
  },


  toggleLeader(state: EditorState, arrowId: string): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    HistoryOps.pushHistory(state);
    arrow.showLeader = !arrow.showLeader;
    if (arrow.showLeader) {
      const labelPos = arrow.labelPos || { x: arrow.points[0].x + 20, y: arrow.points[0].y - 20 };
      arrow.labelPos = labelPos;
      arrow.leaderPoints = generateLeaderPoints(labelPos, arrow.points);
    } else {
      arrow.leaderPoints = undefined;
    }
    
  },


  deleteArrow(state: EditorState, id: string): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;

    const idx = diag.arrows.findIndex(a => a.id === id);
    if (idx === -1) return;

    HistoryOps.pushHistory(state);
    diag.arrows.splice(idx, 1);
    
    // Clean up orphan junctions
    synchronizeJunctions(diag);

    if (state.selectedObjectId === id) {
      state.selectedObjectId = null;
      state.selectedObjectType = null;
    }

    
  },

  recomputeArrowRoute(state: EditorState, arrow: Arrow, diag?: Diagram): void {
    const d = diag || getActiveDiagram(state);
    arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, d ? d.blocks : []);
    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }
  },

  setArrowPinned(state: EditorState, arrowId: string, pinned: boolean): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;
    HistoryOps.pushHistory(state);
    arrow.pinned = pinned;
    if (!pinned) {
      if (arrow.source.type === 'border' && (arrow.source.side === 'left' || arrow.source.side === 'right')) {
        arrow.source.point.y = arrow.target.point.y;
      } else if (arrow.source.type === 'border' && (arrow.source.side === 'top' || arrow.source.side === 'bottom')) {
        arrow.source.point.x = arrow.target.point.x;
      }
      if (arrow.target.type === 'border' && (arrow.target.side === 'left' || arrow.target.side === 'right')) {
        arrow.target.point.y = arrow.source.point.y;
      } else if (arrow.target.type === 'border' && (arrow.target.side === 'top' || arrow.target.side === 'bottom')) {
        arrow.target.point.x = arrow.source.point.x;
      }
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target);
    }
    
  },

  setArrowPathMode(state: EditorState, arrowId: string, mode: 'auto' | 'pinned'): void {
    ArrowOps.setArrowPinned(state, arrowId, mode === 'pinned');
  },

  resetArrowRoute(state: EditorState, arrowId: string): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;
    HistoryOps.pushHistory(state);
    arrow.pinned = false;
    arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }
    synchronizeJunctions(diag);
        
  }

  // --- Project Snapshots & Version History ---
};

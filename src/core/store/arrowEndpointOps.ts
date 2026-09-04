import { Arrow, ArrowEndpoint, Point, SnapTarget, ICOMRole, Side, Diagram } from "../../types/idef0";
import { EditorState } from "./types";
import { HistoryOps } from "./historyOps";
import {
  CANVAS_WIDTH,
  buildOrthogonalRoute,
  validateArrowConnection,
  generateLeaderPoints,
  getSegmentsFromPoints,
  distanceToSegment,
  findSnapTarget,
  clampLabelToCanvas,
  synchronizeJunctions,
  pointInRect,
} from "../geometry";

function getActiveDiagram(state: EditorState): Diagram | undefined {
  return state.project.diagrams.find((d) => d.id === state.activeDiagramId);
}

export class ArrowEndpointOps {
  public static reconnectArrowEndpoint(state: EditorState, 
    arrowId: string,
    endType: 'source' | 'target',
    newEndpoint: ArrowEndpoint | SnapTarget | null,
    mouseReleasePoint?: Point
  ): boolean {
    const diag = getActiveDiagram(state);
    if (!diag) return false;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return false;

    HistoryOps.pushHistory(state);

    if (endType === 'target') {
      if (newEndpoint) {
        if (newEndpoint.type === 'unattached' && arrow.source.type === 'unattached') {
          console.warn('[Reconnection Rejected] Оба конца стрелки не могут быть одновременно не привязаны');
          return false;
        }

        // If reconnecting target on a boundary arrow, adapt source border
        if (arrow.source.type === 'border' && newEndpoint.type === 'block') {
          if (newEndpoint.side === 'top') {
            arrow.source.side = 'top';
            arrow.source.point = { x: newEndpoint.point.x, y: 40 };
            arrow.role = 'control';
          } else if (newEndpoint.side === 'bottom') {
            arrow.source.side = 'bottom';
            arrow.source.point = { x: newEndpoint.point.x, y: 865 };
            arrow.role = 'mechanism';
          } else if (newEndpoint.side === 'left') {
            arrow.source.side = 'left';
            arrow.source.point = { x: 30, y: newEndpoint.point.y };
            arrow.role = 'input';
          }
        }

        const val = validateArrowConnection(arrow.source, newEndpoint);
        if (!val.valid) {
          console.warn(`[Reconnection Rejected] ${val.reason}`);
          return false;
        }

        if (newEndpoint.type === 'arrow_segment') {
          const juncId = `junc-merge-${Date.now()}`;
          arrow.target = {
            type: 'junction',
            id: juncId,
            point: { ...newEndpoint.point },
          };
          diag.junctions.push({
            id: juncId,
            type: 'merge',
            point: { ...newEndpoint.point },
            parentArrowId: (newEndpoint as any).targetArrowId || newEndpoint.id || '',
            childArrowIds: [arrow.id],
          });
        } else {
          arrow.target = {
            type: newEndpoint.type,
            id: newEndpoint.id,
            side: newEndpoint.side,
            point: { ...newEndpoint.point },
          };
        }
        if (newEndpoint.side === 'top') arrow.role = 'control';
        else if (newEndpoint.side === 'bottom') arrow.role = 'mechanism';
        else if (newEndpoint.side === 'left') arrow.role = 'input';
        else if (newEndpoint.side === 'right') arrow.role = 'output';
        else if (val.role) arrow.role = val.role;
        arrow.pinned = false;
        arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      } else if (mouseReleasePoint) {
        const droppedBlock = diag.blocks.find((b) => pointInRect(mouseReleasePoint, b));
        if (droppedBlock) {
          // If dropped inside block body, automatically snap to the appropriate valid entry port
          let targetSide: Side;
          let role: ICOMRole;
          const srcPt = arrow.points[0];

          if (arrow.source.type === 'border') {
            if (arrow.source.side === 'top') { targetSide = 'top'; role = 'control'; }
            else if (arrow.source.side === 'bottom') { targetSide = 'bottom'; role = 'mechanism'; }
            else { targetSide = 'left'; role = 'input'; }
          } else {
            // Inter-block
            if (srcPt.x + 20 <= droppedBlock.x) {
              targetSide = 'left';
              role = 'input';
            } else if (srcPt.y + 20 <= droppedBlock.y) {
              targetSide = 'top';
              role = 'control';
            } else {
              targetSide = 'bottom';
              role = 'mechanism';
            }
          }

          let tgtPt: Point;
          if (targetSide === 'left') tgtPt = { x: droppedBlock.x, y: Math.round(droppedBlock.y + droppedBlock.height / 2) };
          else if (targetSide === 'top') tgtPt = { x: Math.round(droppedBlock.x + droppedBlock.width / 2), y: droppedBlock.y };
          else tgtPt = { x: Math.round(droppedBlock.x + droppedBlock.width / 2), y: droppedBlock.y + droppedBlock.height };

          arrow.target = {
            type: 'block',
            id: droppedBlock.id,
            side: targetSide,
            point: tgtPt,
          };
          arrow.role = role;
          arrow.pinned = false;
          arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
        } else {
          // Released in open space -> unattached endpoint
          if (arrow.source.type === 'unattached') {
            console.warn('[Reconnection Rejected] Оба конца стрелки не могут быть одновременно не привязаны');
            return false;
          }

          // Clean up junction if old target was junction
          if (arrow.target.type === 'junction' && arrow.target.id) {
            diag.junctions = diag.junctions.filter(j => j.id !== arrow.target.id);
          }

          const srcPt = arrow.points[0] || arrow.source.point;
          const tgtPt = mouseReleasePoint
            ? { ...mouseReleasePoint }
            : { x: Math.min(CANVAS_WIDTH - 30, srcPt.x + 140), y: srcPt.y };

          arrow.target = {
            type: 'unattached',
            point: tgtPt,
          };
          arrow.pinned = true;
          arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
          if (arrow.points.length < 2) {
            arrow.points = [srcPt, tgtPt];
          }
        }
      }
    } else {
      // Source endpoint reconnection
      if (newEndpoint) {
        if (newEndpoint.type === 'unattached' && arrow.target.type === 'unattached') {
          console.warn('[Reconnection Rejected] Оба конца стрелки не могут быть одновременно не привязаны');
          return false;
        }

        if (newEndpoint.type === 'block' && arrow.target.type === 'border' && arrow.target.side === 'right') {
          arrow.target.point = { x: 1580, y: newEndpoint.point.y };
          arrow.role = 'output';
        }

        const val = validateArrowConnection(newEndpoint, arrow.target);
        if (!val.valid) {
          console.warn(`[Reconnection Rejected] ${val.reason}`);
          return false;
        }

        if (newEndpoint.type === 'arrow_segment') {
          const juncId = `junc-branch-${Date.now()}`;
          arrow.source = {
            type: 'junction',
            id: juncId,
            point: { ...newEndpoint.point },
          };
          diag.junctions.push({
            id: juncId,
            type: 'branch',
            point: { ...newEndpoint.point },
            parentArrowId: (newEndpoint as any).targetArrowId || newEndpoint.id || '',
            childArrowIds: [arrow.id],
          });
        } else {
          arrow.source = {
            type: newEndpoint.type,
            id: newEndpoint.id,
            side: newEndpoint.side,
            point: { ...newEndpoint.point },
          };
        }
        if (val.role) arrow.role = val.role;
        arrow.pinned = false;
        arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      } else if (mouseReleasePoint) {
        const droppedBlock = diag.blocks.find((b) => pointInRect(mouseReleasePoint, b));
        if (droppedBlock) {
          // Snap source to block's Output (Right side)
          const srcPt: Point = { x: droppedBlock.x + droppedBlock.width, y: Math.round(droppedBlock.y + droppedBlock.height / 2) };
          arrow.source = {
            type: 'block',
            id: droppedBlock.id,
            side: 'right',
            point: srcPt,
          };
          arrow.pinned = false;
          arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
        } else {
          // Released in open space -> unattached endpoint
          if (arrow.target.type === 'unattached') {
            console.warn('[Reconnection Rejected] Оба конца стрелки не могут быть одновременно не привязаны');
            return false;
          }

          // Clean up junction if old source was junction
          if (arrow.source.type === 'junction' && arrow.source.id) {
            diag.junctions = diag.junctions.filter(j => j.id !== arrow.source.id);
          }

          const tgtPt = arrow.points[arrow.points.length - 1] || arrow.target.point;
          const srcPt = mouseReleasePoint
            ? { ...mouseReleasePoint }
            : { x: Math.max(30, tgtPt.x - 140), y: tgtPt.y };

          arrow.source = {
            type: 'unattached',
            point: srcPt,
          };
          arrow.pinned = true;
          arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
          if (arrow.points.length < 2) {
            arrow.points = [srcPt, tgtPt];
          }
        }
      }
    }

    // Update label position following the reconnected route
    if (arrow.points.length >= 2) {
      if (arrow.source.type === 'border') {
        const p0 = arrow.points[0];
        arrow.labelPos = clampLabelToCanvas(
          {
            x: p0.x + (arrow.source.side === 'left' ? 10 : 10),
            y: p0.y + (arrow.source.side === 'top' ? 25 : arrow.source.side === 'bottom' ? -25 : -12),
          },
          arrow.label
        );
      } else if (arrow.target.type === 'border') {
        const pn = arrow.points[arrow.points.length - 1];
        arrow.labelPos = clampLabelToCanvas(
          {
            x: pn.x - 180,
            y: pn.y - 12,
          },
          arrow.label
        );
      } else {
        const mid = arrow.points[0];
        arrow.labelPos = clampLabelToCanvas(
          {
            x: mid.x + 15,
            y: mid.y - 12,
          },
          arrow.label
        );
      }
    }

    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }

    
    synchronizeJunctions(diag);
    
    return true;
  }


  public static setArrowEndpointKey(state: EditorState, 
    arrowId: string,
    endType: 'source' | 'target',
    key: string
  ): boolean {
    const diag = getActiveDiagram(state);
    if (!diag) return false;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return false;

    HistoryOps.pushHistory(state);

    if (key === 'unattached') {
      const otherEnd = endType === 'source' ? arrow.target : arrow.source;
      if (otherEnd.type === 'unattached') {
        console.warn('[Reconnection Rejected] Оба конца стрелки не могут быть одновременно не привязаны');
        return false;
      }

      if (endType === 'source') {
        if (arrow.source.type === 'junction' && arrow.source.id) {
          diag.junctions = diag.junctions.filter(j => j.id !== arrow.source.id);
        }
        const tgtPt = arrow.points[arrow.points.length - 1] || arrow.target.point;
        const srcPt = { x: Math.max(30, tgtPt.x - 140), y: tgtPt.y };
        arrow.source = {
          type: 'unattached',
          point: srcPt,
        };
        arrow.pinned = true;
        arrow.points = [srcPt, tgtPt];
      } else {
        if (arrow.target.type === 'junction' && arrow.target.id) {
          diag.junctions = diag.junctions.filter(j => j.id !== arrow.target.id);
        }
        const srcPt = arrow.points[0] || arrow.source.point;
        const tgtPt = { x: Math.min(CANVAS_WIDTH - 30, srcPt.x + 140), y: srcPt.y };
        arrow.target = {
          type: 'unattached',
          point: tgtPt,
        };
        arrow.pinned = true;
        arrow.points = [srcPt, tgtPt];
      }

      synchronizeJunctions(diag);
      
      return true;
    }

    const parts = key.split(':');
    const type = parts[0];

    if (type === 'border') {
      if (endType === 'source' && arrow.source.type === 'junction' && arrow.source.id) {
        diag.junctions = diag.junctions.filter(j => j.id !== arrow.source.id);
      } else if (endType === 'target' && arrow.target.type === 'junction' && arrow.target.id) {
        diag.junctions = diag.junctions.filter(j => j.id !== arrow.target.id);
      }

      const side = parts[1] as Side;
      let pt: Point = { x: 30, y: 250 };
      if (side === 'top') pt = { x: arrow.points[0]?.x || 400, y: 40 };
      else if (side === 'bottom') pt = { x: arrow.points[0]?.x || 400, y: 865 };
      else if (side === 'left') pt = { x: 30, y: arrow.points[arrow.points.length - 1]?.y || 250 };
      else if (side === 'right') pt = { x: 1580, y: arrow.points[0]?.y || 250 };

      return ArrowEndpointOps.reconnectArrowEndpoint(state, arrowId, endType, {
        type: 'border',
        side,
        point: pt,
        role: side === 'top' ? 'control' : side === 'bottom' ? 'mechanism' : side === 'right' ? 'output' : 'input',
      });
    } else if (type === 'block') {
      if (endType === 'source' && arrow.source.type === 'junction' && arrow.source.id) {
        diag.junctions = diag.junctions.filter(j => j.id !== arrow.source.id);
      } else if (endType === 'target' && arrow.target.type === 'junction' && arrow.target.id) {
        diag.junctions = diag.junctions.filter(j => j.id !== arrow.target.id);
      }

      const blockId = parts[1];
      const side = parts[2] as Side;
      const block = diag.blocks.find(b => b.id === blockId);
      if (!block) return false;

      let pt: Point;
      if (side === 'left') pt = { x: block.x, y: Math.round(block.y + block.height / 2) };
      else if (side === 'top') pt = { x: Math.round(block.x + block.width / 2), y: block.y };
      else if (side === 'bottom') pt = { x: Math.round(block.x + block.width / 2), y: block.y + block.height };
      else pt = { x: block.x + block.width, y: Math.round(block.y + block.height / 2) };

      if (endType === 'target' && arrow.source.type === 'border') {
        if (side === 'top') {
          arrow.source.side = 'top';
          arrow.source.point = { x: pt.x, y: 40 };
        } else if (side === 'bottom') {
          arrow.source.side = 'bottom';
          arrow.source.point = { x: pt.x, y: 865 };
        } else if (side === 'left') {
          arrow.source.side = 'left';
          arrow.source.point = { x: 30, y: pt.y };
        }
      }

      return ArrowEndpointOps.reconnectArrowEndpoint(state, arrowId, endType, {
        type: 'block',
        id: block.id,
        side,
        point: pt,
        role: side === 'top' ? 'control' : side === 'bottom' ? 'mechanism' : side === 'right' ? 'output' : 'input',
      });
    } else if (type === 'junction') {
      const juncMode = parts[1] as 'branch' | 'merge';
      const targetArrowId = parts[2];
      const parentArrow = diag.arrows.find(a => a.id === targetArrowId);
      if (!parentArrow || !parentArrow.points || parentArrow.points.length < 2) return false;

      const segs = getSegmentsFromPoints(parentArrow.points);
      const refPt = endType === 'source' ? (arrow.target.point || { x: 500, y: 500 }) : (arrow.source.point || { x: 500, y: 500 });
      let bestProj = parentArrow.points[0];
      let minDist = Infinity;

      for (const seg of segs) {
        const { dist, proj } = distanceToSegment(refPt, seg);
        if (dist < minDist) {
          minDist = dist;
          bestProj = proj;
        }
      }

      if (juncMode === 'branch' && endType === 'source') {
        const juncId = `junc-branch-${Date.now()}`;
        diag.junctions.push({
          id: juncId,
          type: 'branch',
          point: { ...bestProj },
          parentArrowId: parentArrow.id,
          childArrowIds: [arrow.id],
        });
        arrow.source = {
          type: 'junction',
          id: juncId,
          point: { ...bestProj },
        };
        arrow.role = parentArrow.role;
        arrow.pinned = false;
        arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      } else if (juncMode === 'merge' && endType === 'target') {
        const juncId = `junc-merge-${Date.now()}`;
        diag.junctions.push({
          id: juncId,
          type: 'merge',
          point: { ...bestProj },
          parentArrowId: parentArrow.id,
          childArrowIds: [arrow.id],
        });
        arrow.target = {
          type: 'junction',
          id: juncId,
          point: { ...bestProj },
        };
        arrow.role = parentArrow.role;
        arrow.pinned = false;
        arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      }

      synchronizeJunctions(diag);
      
      return true;
    }

    return false;
  }

}

import { Point, Diagram } from "../../types/idef0";
import { EditorState } from "./types";
import { HistoryOps } from "./historyOps";
import {
  getSegmentsFromPoints,
  generateLeaderPoints,
  buildOrthogonalRoute,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  synchronizeJunctions,
  simplifyCollinear,
} from "../geometry";

function getActiveDiagram(state: EditorState): Diagram | undefined {
  return state.project.diagrams.find((d) => d.id === state.activeDiagramId);
}

export const ArrowGeometryOps = {
  shiftArrowSegment(state: EditorState, 
    arrowId: string,
    segIdx: number,
    newCoord: number,
    saveHistory = true,
    basePoints?: Point[]
  ): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;

    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    if (saveHistory) {
      HistoryOps.pushHistory(state);
    }
    arrow.pinned = true;

    const sourcePoints = basePoints ? JSON.parse(JSON.stringify(basePoints)) : JSON.parse(JSON.stringify(arrow.points));
    if (segIdx >= sourcePoints.length - 1) return;

    const segs = getSegmentsFromPoints(sourcePoints, arrow.id, arrow.source.side, arrow.target.side);
    if (segIdx >= segs.length) return;
    const seg = segs[segIdx];
    const isHoriz = seg.orientation === 'horizontal';
    const oldVal = isHoriz ? sourcePoints[segIdx].y : sourcePoints[segIdx].x;

    if (isHoriz) {
      newCoord = Math.max(40, Math.min(CANVAS_HEIGHT - 40, newCoord));

      // If segment is directly attached to a block's Left or Right side, clamp Y within block face
      if (segIdx === 0 && arrow.source.type === 'block') {
        const srcBlock = diag.blocks.find(b => b.id === arrow.source.id);
        if (srcBlock && (arrow.source.side === 'left' || arrow.source.side === 'right')) {
          newCoord = Math.max(srcBlock.y + 15, Math.min(srcBlock.y + srcBlock.height - 15, newCoord));
        }
      }
      if (segIdx === sourcePoints.length - 2 && arrow.target.type === 'block') {
        const tgtBlock = diag.blocks.find(b => b.id === arrow.target.id);
        if (tgtBlock && (arrow.target.side === 'left' || arrow.target.side === 'right')) {
          newCoord = Math.max(tgtBlock.y + 15, Math.min(tgtBlock.y + tgtBlock.height - 15, newCoord));
        }
      }

      const pts = [...sourcePoints];
      pts[segIdx].y = newCoord;
      pts[segIdx + 1].y = newCoord;
      if (segIdx === 0) {
        arrow.source.point.y = newCoord;
        if (arrow.source.type === 'junction') {
          const j = diag.junctions.find(j => j.id === arrow.source.id);
          if (j) j.point.y = newCoord;
        }
      }
      if (segIdx === sourcePoints.length - 2) {
        arrow.target.point.y = newCoord;
        if (arrow.target.type === 'junction') {
          const j = diag.junctions.find(j => j.id === arrow.target.id);
          if (j) j.point.y = newCoord;
        }
      }
      arrow.points = pts;
    } else {
      newCoord = Math.max(30, Math.min(CANVAS_WIDTH - 30, newCoord));

      // If segment is directly attached to a block's Top or Bottom side, clamp X within block face
      if (segIdx === 0 && arrow.source.type === 'block') {
        const srcBlock = diag.blocks.find(b => b.id === arrow.source.id);
        if (srcBlock && (arrow.source.side === 'top' || arrow.source.side === 'bottom')) {
          newCoord = Math.max(srcBlock.x + 15, Math.min(srcBlock.x + srcBlock.width - 15, newCoord));
        }
      }
      if (segIdx === sourcePoints.length - 2 && arrow.target.type === 'block') {
        const tgtBlock = diag.blocks.find(b => b.id === arrow.target.id);
        if (tgtBlock && (arrow.target.side === 'top' || arrow.target.side === 'bottom')) {
          newCoord = Math.max(tgtBlock.x + 15, Math.min(tgtBlock.x + tgtBlock.width - 15, newCoord));
        }
      }

      const pts = [...sourcePoints];
      pts[segIdx].x = newCoord;
      pts[segIdx + 1].x = newCoord;
      if (segIdx === 0) {
        arrow.source.point.x = newCoord;
        if (arrow.source.type === 'junction') {
          const j = diag.junctions.find(j => j.id === arrow.source.id);
          if (j) j.point.x = newCoord;
        }
      }
      if (segIdx === sourcePoints.length - 2) {
        arrow.target.point.x = newCoord;
        if (arrow.target.type === 'junction') {
          const j = diag.junctions.find(j => j.id === arrow.target.id);
          if (j) j.point.x = newCoord;
        }
      }
      arrow.points = pts;
    }

    arrow.points = simplifyCollinear(arrow.points);
    arrow.pinned = true;

    // Synchronize all dependent branches attached to this arrow or its junctions
    for (const junc of diag.junctions) {
      const isRelated = junc.parentArrowId === arrow.id ||
        junc.childArrowIds.includes(arrow.id) ||
        arrow.source.id === junc.id ||
        arrow.target.id === junc.id;

      if (isRelated) {
        if (isHoriz && Math.abs(junc.point.y - oldVal) < 6) {
          junc.point.y = newCoord;

          // Update child branch arrows
          for (const child of diag.arrows) {
            if (child.source.type === 'junction' && child.source.id === junc.id) {
              child.source.point.y = newCoord;
              child.points[0].y = newCoord;
              if (child.points.length >= 2) {
                if (Math.abs(child.points[1].y - oldVal) < 6) {
                  child.points[1].y = newCoord;
                }
              }
              if (child.showLeader && child.labelPos) {
                child.leaderPoints = generateLeaderPoints(child.labelPos, child.points);
              }
            }
          }

          // Update incoming merge arrows
          for (const incoming of diag.arrows) {
            if (incoming.target.type === 'junction' && incoming.target.id === junc.id) {
              const lastIdx = incoming.points.length - 1;
              incoming.target.point.y = newCoord;
              incoming.points[lastIdx].y = newCoord;
              if (incoming.points.length >= 2) {
                if (Math.abs(incoming.points[lastIdx - 1].y - oldVal) < 6) {
                  incoming.points[lastIdx - 1].y = newCoord;
                }
              }
            }
          }
        } else if (!isHoriz && Math.abs(junc.point.x - oldVal) < 6) {
          junc.point.x = newCoord;

          for (const child of diag.arrows) {
            if (child.source.type === 'junction' && child.source.id === junc.id) {
              child.source.point.x = newCoord;
              child.points[0].x = newCoord;
              if (child.points.length >= 2) {
                if (Math.abs(child.points[1].x - oldVal) < 6) {
                  child.points[1].x = newCoord;
                }
              }
              if (child.showLeader && child.labelPos) {
                child.leaderPoints = generateLeaderPoints(child.labelPos, child.points);
              }
            }
          }

          for (const incoming of diag.arrows) {
            if (incoming.target.type === 'junction' && incoming.target.id === junc.id) {
              const lastIdx = incoming.points.length - 1;
              incoming.target.point.x = newCoord;
              incoming.points[lastIdx].x = newCoord;
              if (incoming.points.length >= 2) {
                if (Math.abs(incoming.points[lastIdx - 1].x - oldVal) < 6) {
                  incoming.points[lastIdx - 1].x = newCoord;
                }
              }
            }
          }
        }
      }
    }

    synchronizeJunctions(diag);

    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }

    
    
  },


  removeArrowPoint(state: EditorState, arrowId: string, pointIndex: number): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow || !arrow.points || arrow.points.length <= 2) return;
    if (pointIndex <= 0 || pointIndex >= arrow.points.length - 1) return;

    if (arrow.points.length <= 4) {
      HistoryOps.pushHistory(state);
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      arrow.points[0] = { ...arrow.source.point };
      arrow.points[arrow.points.length - 1] = { ...arrow.target.point };
      if (arrow.showLeader && arrow.labelPos) {
        arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
      }
      synchronizeJunctions(diag);
      return;
    }

    const beforeLen = arrow.points.length;
    ArrowGeometryOps.removeArrowSegment(state, arrowId, pointIndex);
    if (arrow.points.length === beforeLen && pointIndex > 1) {
      ArrowGeometryOps.removeArrowSegment(state, arrowId, pointIndex - 1);
    }
  },

  removeArrowSegment(state: EditorState, arrowId: string, segmentIndex: number): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow || !arrow.points || arrow.points.length <= 2) return;

    const segs = getSegmentsFromPoints(arrow.points, arrow.id, arrow.source.side, arrow.target.side);
    if (segmentIndex <= 0 || segmentIndex >= segs.length - 1) {
      HistoryOps.pushHistory(state);
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
      arrow.points[0] = { ...arrow.source.point };
      arrow.points[arrow.points.length - 1] = { ...arrow.target.point };
      if (arrow.showLeader && arrow.labelPos) {
        arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
      }
      synchronizeJunctions(diag);
      return;
    }

    const k = segmentIndex;
    if (k < 1 || k + 2 >= arrow.points.length) {
      return;
    }

    const pPrevStart = arrow.points[k - 1];
    const pPrevEnd = arrow.points[k];
    const pNextStart = arrow.points[k + 1];
    const pNextEnd = arrow.points[k + 2];

    const prevIsHoriz = Math.abs(pPrevStart.y - pPrevEnd.y) < 1;
    const nextIsHoriz = Math.abs(pNextStart.y - pNextEnd.y) < 1;

    if (prevIsHoriz !== nextIsHoriz) {
      return;
    }

    const isStartPortSegment = (k - 1 === 0);
    const isEndPortSegment = (k + 1 === segs.length - 1);

    const srcSide = arrow.source.side;
    const tgtSide = arrow.target.side;

    let canMerge: boolean;
    let newPts = [...arrow.points];

    if (prevIsHoriz) {
      const yPrev = pPrevStart.y;
      const yNext = pNextEnd.y;

      const prevYFixed = isStartPortSegment && (srcSide === 'left' || srcSide === 'right');
      const nextYFixed = isEndPortSegment && (tgtSide === 'left' || tgtSide === 'right');

      if (Math.abs(yPrev - yNext) < 2) {
        newPts.splice(k, 2);
        canMerge = true;
      } else if (prevYFixed && nextYFixed) {
        canMerge = false;
      } else {
        const targetY = prevYFixed ? yPrev : nextYFixed ? yNext : yPrev;
        if (targetY === yPrev) {
          arrow.points[k + 1].y = targetY;
          arrow.points[k + 2].y = targetY;
        } else {
          arrow.points[k - 1].y = targetY;
          arrow.points[k].y = targetY;
        }
        newPts = [...arrow.points];
        newPts.splice(k, 2);
        canMerge = true;
      }
    } else {
      const xPrev = pPrevStart.x;
      const xNext = pNextEnd.x;

      const prevXFixed = isStartPortSegment && (srcSide === 'top' || srcSide === 'bottom');
      const nextXFixed = isEndPortSegment && (tgtSide === 'top' || tgtSide === 'bottom');

      if (Math.abs(xPrev - xNext) < 2) {
        newPts.splice(k, 2);
        canMerge = true;
      } else if (prevXFixed && nextXFixed) {
        canMerge = false;
      } else {
        const targetX = prevXFixed ? xPrev : nextXFixed ? xNext : xPrev;
        if (targetX === xPrev) {
          arrow.points[k + 1].x = targetX;
          arrow.points[k + 2].x = targetX;
        } else {
          arrow.points[k - 1].x = targetX;
          arrow.points[k].x = targetX;
        }
        newPts = [...arrow.points];
        newPts.splice(k, 2);
        canMerge = true;
      }
    }

    if (!canMerge) {
      return;
    }

    HistoryOps.pushHistory(state);

    arrow.points = simplifyCollinear(newPts);
    if (arrow.points.length < 2) {
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);
    }

    arrow.points[0] = { ...arrow.source.point };
    arrow.points[arrow.points.length - 1] = { ...arrow.target.point };

    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }
    synchronizeJunctions(diag);
  },

  straightenArrow(state: EditorState, arrowId: string): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow) return;

    HistoryOps.pushHistory(state);
    arrow.pinned = true;

    const pStart = { ...arrow.source.point };
    const pEnd = { ...arrow.target.point };

    const srcIsHoriz = arrow.source.side === 'left' || arrow.source.side === 'right';
    const tgtIsHoriz = arrow.target.side === 'left' || arrow.target.side === 'right';

    if (srcIsHoriz && !tgtIsHoriz) {
      arrow.points = [
        { x: pStart.x, y: pStart.y },
        { x: pEnd.x, y: pStart.y },
        { x: pEnd.x, y: pEnd.y },
      ];
    } else if (!srcIsHoriz && tgtIsHoriz) {
      arrow.points = [
        { x: pStart.x, y: pStart.y },
        { x: pStart.x, y: pEnd.y },
        { x: pEnd.x, y: pEnd.y },
      ];
    } else if (srcIsHoriz && tgtIsHoriz) {
      if (arrow.target.type === 'block') {
        const tgtBlock = diag.blocks.find(b => b.id === arrow.target.id);
        if (tgtBlock) {
          pEnd.y = Math.max(tgtBlock.y + 15, Math.min(tgtBlock.y + tgtBlock.height - 15, pStart.y));
          arrow.target.point.y = pEnd.y;
          pStart.y = pEnd.y;
          arrow.source.point.y = pEnd.y;
        }
      } else {
        pEnd.y = pStart.y;
        arrow.target.point.y = pStart.y;
      }
      arrow.points = [
        { x: pStart.x, y: pStart.y },
        { x: pEnd.x, y: pStart.y },
      ];
    } else {
      if (arrow.target.type === 'block') {
        const tgtBlock = diag.blocks.find(b => b.id === arrow.target.id);
        if (tgtBlock) {
          pEnd.x = Math.max(tgtBlock.x + 15, Math.min(tgtBlock.x + tgtBlock.width - 15, pStart.x));
          arrow.target.point.x = pEnd.x;
          pStart.x = pEnd.x;
          arrow.source.point.x = pEnd.x;
        }
      } else {
        pEnd.x = pStart.x;
        arrow.target.point.x = pStart.x;
      }
      arrow.points = [
        { x: pStart.x, y: pStart.y },
        { x: pStart.x, y: pEnd.y },
      ];
    }

    arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, diag.blocks);

    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }
    synchronizeJunctions(diag);
    
  },

  updateArrowPointCoord(state: EditorState, arrowId: string, pointIndex: number, coord: 'x' | 'y', value: number): void {
    const diag = getActiveDiagram(state);
    if (!diag) return;
    const arrow = diag.arrows.find(a => a.id === arrowId);
    if (!arrow || !arrow.points || pointIndex < 0 || pointIndex >= arrow.points.length) return;

    HistoryOps.pushHistory(state);
    arrow.points[pointIndex][coord] = value;
    if (pointIndex === 0) {
      arrow.source.point[coord] = value;
    } else if (pointIndex === arrow.points.length - 1) {
      arrow.target.point[coord] = value;
    }
    // Realign adjacent to orthogonal
    for (let i = 0; i < arrow.points.length - 1; i++) {
      const p1 = arrow.points[i];
      const p2 = arrow.points[i + 1];
      if (Math.abs(p1.x - p2.x) > 0.001 && Math.abs(p1.y - p2.y) > 0.001) {
        if (i % 2 === 0) p2.y = p1.y;
        else p2.x = p1.x;
      }
    }
    if (arrow.showLeader && arrow.labelPos) {
      arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
    }
    synchronizeJunctions(diag);
    
  }

  // --- Decomposition ---
};

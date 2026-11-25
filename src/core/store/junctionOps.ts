import { Diagram, Junction, Point } from '../../types/idef0';
import { getSegmentsFromPoints, distanceToSegment, distance, buildOrthogonalRoute, generateLeaderPoints } from '../geometry';
import { EditorState } from './types';
import { HistoryOps } from './historyOps';

export interface EnsureJunctionOptions {
  type: 'branch' | 'merge';
  point: Point;
  parentArrowId: string;
  childArrowId?: string;
  existingJunctionId?: string;
  reuseWithinRadius?: number;
}

export const JunctionOps = {
  createJunction(
    diag: Diagram | undefined,
    type: 'branch' | 'merge',
    point: Point,
    parentArrowId = '',
    childArrowIds: string[] = [],
    id?: string
  ): Junction {
    const junc: Junction = {
      id: id ?? `junc-${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      point: { ...point },
      parentArrowId,
      childArrowIds: [...childArrowIds],
    };
    if (diag) {
      diag.junctions.push(junc);
    }
    return junc;
  },

  ensureJunction(diag: Diagram, opts: EnsureJunctionOptions): Junction {
    const { type, point, parentArrowId, childArrowId, existingJunctionId, reuseWithinRadius } = opts;

    let junc: Junction | undefined;
    if (existingJunctionId) {
      junc = diag.junctions.find((j) => j.id === existingJunctionId);
    }
    if (!junc && reuseWithinRadius !== undefined) {
      junc = diag.junctions.find(
        (j) =>
          j.type === type &&
          Math.abs(j.point.x - point.x) <= reuseWithinRadius &&
          Math.abs(j.point.y - point.y) <= reuseWithinRadius
      );
    }

    if (junc) {
      if (childArrowId && !junc.childArrowIds.includes(childArrowId)) {
        junc.childArrowIds.push(childArrowId);
      }
      return junc;
    }

    return JunctionOps.createJunction(
      diag,
      type,
      point,
      parentArrowId,
      childArrowId ? [childArrowId] : [],
      existingJunctionId
    );
  },
  moveJunction(state: EditorState, juncId: string, targetPt: Point, saveHistory = true): void {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return;

    const junc = diag.junctions.find((j) => j.id === juncId);
    if (!junc) return;

    let parentArr = diag.arrows.find((a) => a.id === junc.parentArrowId);
    if (!parentArr) {
      parentArr = diag.arrows.find((a) =>
        a.points && a.points.length >= 2 &&
        getSegmentsFromPoints(a.points).some((seg) => distanceToSegment(junc.point, seg).dist < 5)
      );
      if (parentArr) {
        junc.parentArrowId = parentArr.id;
      }
    }
    if (!parentArr || !parentArr.points || parentArr.points.length < 2) return;

    if (saveHistory) {
      HistoryOps.pushHistory(state);
    }

    const segs = getSegmentsFromPoints(parentArr.points);
    let bestDist = Infinity;
    let bestProj: Point = junc.point;

    for (const seg of segs) {
      const { dist, proj } = distanceToSegment(targetPt, seg);
      if (dist < bestDist) {
        bestDist = dist;
        bestProj = proj;
      }
    }

    const pStart = parentArr.points[0];
    const pEnd = parentArr.points[parentArr.points.length - 1];
    if (distance(bestProj, pStart) < 15 && segs.length > 0) {
      const s0 = segs[0];
      if (s0.orientation === 'horizontal') {
        bestProj.x = pStart.x + Math.sign(s0.end.x - pStart.x) * 15;
      } else {
        bestProj.y = pStart.y + Math.sign(s0.end.y - pStart.y) * 15;
      }
    }
    if (distance(bestProj, pEnd) < 15 && segs.length > 0) {
      const sLast = segs[segs.length - 1];
      if (sLast.orientation === 'horizontal') {
        bestProj.x = pEnd.x - Math.sign(pEnd.x - sLast.start.x) * 15;
      } else {
        bestProj.y = pEnd.y - Math.sign(pEnd.y - sLast.start.y) * 15;
      }
    }

    junc.point = { x: bestProj.x, y: bestProj.y };

    // 1. Update child branch arrows originating from this junction
    for (const child of diag.arrows) {
      if (child.source.type === 'junction' && child.source.id === junc.id) {
        child.source.point = { ...junc.point };
        child.points[0] = { ...junc.point };

        if (child.points.length === 2) {
          if (child.points[0].x !== child.points[1].x && child.points[0].y !== child.points[1].y) {
            child.points = buildOrthogonalRoute(child.source, child.target);
          }
        } else if (child.points.length === 3) {
          if (child.target.side === 'top' || child.target.role === 'control' || child.target.side === 'bottom' || child.target.role === 'mechanism') {
            child.points[1].x = child.target.point.x;
            child.points[1].y = junc.point.y;
          } else {
            child.points[1].x = junc.point.x;
            child.points[1].y = child.target.point.y;
          }
        } else {
          child.points = buildOrthogonalRoute(child.source, child.target);
        }

        if (child.showLeader && child.labelPos) {
          child.leaderPoints = generateLeaderPoints(child.labelPos, child.points);
        }
      }
    }

    // 2. Update incoming merge arrows ending at this junction
    for (const incoming of diag.arrows) {
      if (incoming.target.type === 'junction' && incoming.target.id === junc.id) {
        const lastIdx = incoming.points.length - 1;
        incoming.target.point = { ...junc.point };
        incoming.points[lastIdx] = { ...junc.point };

        if (incoming.points.length === 3) {
          if (incoming.source.side === 'top' || incoming.source.side === 'bottom') {
            incoming.points[1].x = incoming.source.point.x;
            incoming.points[1].y = junc.point.y;
          } else {
            incoming.points[1].x = junc.point.x;
            incoming.points[1].y = incoming.source.point.y;
          }
        } else if (incoming.points.length >= 4) {
          incoming.points = buildOrthogonalRoute(incoming.source, incoming.target);
        }

        if (incoming.showLeader && incoming.labelPos) {
          incoming.leaderPoints = generateLeaderPoints(incoming.labelPos, incoming.points);
        }
      }
    }
  }
};

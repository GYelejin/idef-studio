import { Arrow, Junction } from "../../types/idef0";
import { getSegmentsFromPoints, distanceToSegment, generateLeaderPoints } from "../math";
import { buildOrthogonalRoute } from "../router";

export function synchronizeJunctions(diagram: { arrows: Arrow[]; junctions: Junction[] }): void {
  // Prune any orphan junctions that have no connected child branch arrows or incoming merge arrows
  diagram.junctions = (diagram.junctions || []).filter((junc) => {
    const isUsedAsSource = diagram.arrows.some((a) => a.source.type === 'junction' && a.source.id === junc.id);
    const isUsedAsTarget = diagram.arrows.some((a) => a.target.type === 'junction' && a.target.id === junc.id);
    return isUsedAsSource || isUsedAsTarget;
  });

  for (const junc of diagram.junctions) {
    // 1. Locate parent arrow
    let parent = diagram.arrows.find((a) => a.id === junc.parentArrowId);

    // If not found by ID, locate by proximity to any arrow segment
    if (!parent) {
      for (const a of diagram.arrows) {
        if (a.source.id === junc.id || a.target.id === junc.id) continue;
        const segs = getSegmentsFromPoints(a.points);
        for (const seg of segs) {
          const { dist } = distanceToSegment(junc.point, seg);
          if (dist < 5) {
            parent = a;
            junc.parentArrowId = a.id;
            break;
          }
        }
        if (parent) break;
      }
    }

    if (parent) {
      // Find closest segment on parent
      const segs = getSegmentsFromPoints(parent.points);
      let closestSeg: Segment | null = null;
      let minD = Infinity;

      for (const seg of segs) {
        const { dist } = distanceToSegment(junc.point, seg);
        if (dist < minD) {
          minD = dist;
          closestSeg = seg;
        }
      }

      if (closestSeg) {
        // Snap junction point onto the parent segment line
        if (closestSeg.orientation === 'horizontal') {
          junc.point.y = closestSeg.start.y;
          const minX = Math.min(closestSeg.start.x, closestSeg.end.x);
          const maxX = Math.max(closestSeg.start.x, closestSeg.end.x);
          junc.point.x = Math.max(minX, Math.min(maxX, junc.point.x));
        } else {
          junc.point.x = closestSeg.start.x;
          const minY = Math.min(closestSeg.start.y, closestSeg.end.y);
          const maxY = Math.max(closestSeg.start.y, closestSeg.end.y);
          junc.point.y = Math.max(minY, Math.min(maxY, junc.point.y));
        }
      }
    }

    // 2. Synchronize all branch child arrows starting at this junction
    for (const child of diagram.arrows) {
      if (child.source.type === 'junction' && child.source.id === junc.id) {
        child.source.point = { ...junc.point };
        child.points[0] = { ...junc.point };

        const n = child.points.length;
        if (n === 2) {
          if (Math.abs(child.points[0].x - child.points[1].x) > 1 && Math.abs(child.points[0].y - child.points[1].y) > 1) {
            child.points = buildOrthogonalRoute(child.source, child.target);
          }
        } else if (n === 3) {
          if (child.target.side === 'top' || child.target.side === 'bottom' || child.target.role === 'control' || child.target.role === 'mechanism') {
            child.points = [
              { x: junc.point.x, y: junc.point.y },
              { x: child.points[2].x, y: junc.point.y },
              child.points[2],
            ];
          } else {
            child.points = [
              { x: junc.point.x, y: junc.point.y },
              { x: junc.point.x, y: child.points[2].y },
              child.points[2],
            ];
          }
        } else if (n >= 4) {
          child.points = buildOrthogonalRoute(child.source, child.target);
        }

        if (child.showLeader && child.labelPos) {
          child.leaderPoints = generateLeaderPoints(child.labelPos, child.points);
        }
      }

      // 3. Synchronize all merge incoming arrows ending at this junction
      if (child.target.type === 'junction' && child.target.id === junc.id) {
        const last = child.points.length - 1;
        child.target.point = { ...junc.point };
        child.points[last] = { ...junc.point };

        const n = child.points.length;
        if (n === 2) {
          if (Math.abs(child.points[0].x - child.points[1].x) > 1 && Math.abs(child.points[0].y - child.points[1].y) > 1) {
            child.points = buildOrthogonalRoute(child.source, child.target);
          }
        } else if (n === 3) {
          if (child.source.side === 'top' || child.source.side === 'bottom' || child.source.role === 'control' || child.source.role === 'mechanism') {
            child.points = [
              child.points[0],
              { x: child.points[0].x, y: junc.point.y },
              { x: junc.point.x, y: junc.point.y },
            ];
          } else {
            child.points = [
              child.points[0],
              { x: junc.point.x, y: child.points[0].y },
              { x: junc.point.x, y: junc.point.y },
            ];
          }
        } else if (n >= 4) {
          child.points = buildOrthogonalRoute(child.source, child.target);
        }

        if (child.showLeader && child.labelPos) {
          child.leaderPoints = generateLeaderPoints(child.labelPos, child.points);
        }
      }
    }
  }
}

/**
 * Clamps text label coordinates so that they never overflow or go outside the canvas boundaries.
 */

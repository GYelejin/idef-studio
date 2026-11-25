import { Point, Segment, Side, Arrow, Junction } from "../../types/idef0";

export const CANVAS_WIDTH = 1600;
export const CANVAS_HEIGHT = 900;

export function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function isOrthogonal(p1: Point, p2: Point): boolean {
  return Math.abs(p1.x - p2.x) < 0.001 || Math.abs(p1.y - p2.y) < 0.001;
}

export function pointInRect(p: Point, rect: { x: number; y: number; width: number; height: number }): boolean {
  return p.x >= rect.x && p.x <= rect.x + rect.width && p.y >= rect.y && p.y <= rect.y + rect.height;
}

export function simplifyCollinear(pts: Point[]): Point[] {
  if (!pts || pts.length <= 2) return pts || [];
  const result: Point[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const prev = result[result.length - 1];
    const curr = pts[i];
    const next = pts[i + 1];
    const d1 = { x: curr.x - prev.x, y: curr.y - prev.y };
    const d2 = { x: next.x - curr.x, y: next.y - curr.y };
    const cross = d1.x * d2.y - d1.y * d2.x;
    const dot = d1.x * d2.x + d1.y * d2.y;
    if (Math.abs(cross) < 0.001 && dot > 0) {
      continue;
    }
    result.push(curr);
  }
  result.push(pts[pts.length - 1]);
  return result;
}

/**
 * Converts a sequence of orthogonal points to an SVG path string with optional rounded corners (arcs).
 */
export function pointsToSvgPath(rawPoints: Point[], useArc = true, arcRadius = 8): string {
  if (!rawPoints || rawPoints.length < 2) return '';
  const points = simplifyCollinear(rawPoints);
  if (!useArc || arcRadius <= 0 || points.length === 2) {
    return `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');
  }

  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const d1 = { x: curr.x - prev.x, y: curr.y - prev.y };
    const d2 = { x: next.x - curr.x, y: next.y - curr.y };

    const len1 = Math.sqrt(d1.x ** 2 + d1.y ** 2);
    const len2 = Math.sqrt(d2.x ** 2 + d2.y ** 2);

    if (len1 === 0 || len2 === 0) {
      path += ` L ${curr.x},${curr.y}`;
      continue;
    }

    const u1 = { x: d1.x / len1, y: d1.y / len1 };
    const u2 = { x: d2.x / len2, y: d2.y / len2 };

    const actualRadius = Math.min(arcRadius, len1 / 2, len2 / 2);

    const cornerStart = {
      x: curr.x - u1.x * actualRadius,
      y: curr.y - u1.y * actualRadius,
    };
    const cornerEnd = {
      x: curr.x + u2.x * actualRadius,
      y: curr.y + u2.y * actualRadius,
    };

    // Sweep direction via 2D cross product
    const cross = u1.x * u2.y - u1.y * u2.x;
    if (Math.abs(cross) < 0.001) {
      // Collinear segments (no bend/turn): simply continue straight
      path += ` L ${curr.x},${curr.y}`;
      continue;
    }

    const sweep = cross > 0 ? 1 : 0;

    // Line to corner start
    path += ` L ${cornerStart.x},${cornerStart.y}`;
    // Arc to corner end
    path += ` A ${actualRadius},${actualRadius} 0 0,${sweep} ${cornerEnd.x},${cornerEnd.y}`;
  }

  const last = points[points.length - 1];
  path += ` L ${last.x},${last.y}`;

  return path;
}

/**
 * Computes the rendering points for an arrow, adding smooth arc extensions for branches and merges on parent trunks.
 */
export function getRenderPointsForArrow(arrow: Arrow, junctions?: Junction[], arrows?: Arrow[]): Point[] {
  if (!arrow.points || arrow.points.length < 2) return arrow.points || [];
  let pts = [...arrow.points];

  // 1. Branch: Arrow starts at a junction on a parent trunk
  if (arrow.source.type === 'junction' && junctions && arrows) {
    const junc = junctions.find((j) => j.id === arrow.source.id);
    if (junc) {
      const parent = arrows.find((a) => a.id === junc.parentArrowId);
      if (parent && parent.points && parent.points.length >= 2) {
        const childDx = pts[1].x - pts[0].x;
        const childDy = pts[1].y - pts[0].y;
        const childIsVert = Math.abs(childDx) < 1 && Math.abs(childDy) > 0;
        const childIsHoriz = Math.abs(childDy) < 1 && Math.abs(childDx) > 0;

        for (let i = 0; i < parent.points.length - 1; i++) {
          const p1 = parent.points[i];
          const p2 = parent.points[i + 1];
          const parentDx = p2.x - p1.x;
          const parentDy = p2.y - p1.y;
          const parentIsHoriz = Math.abs(parentDy) < 1;
          const parentIsVert = Math.abs(parentDx) < 1;

          // Case A: Parent is HORIZONTAL, child branches VERTICALLY or continues HORIZONTALLY
          if (parentIsHoriz && Math.abs(junc.point.y - p1.y) < 2) {
            const minX = Math.min(p1.x, p2.x);
            const maxX = Math.max(p1.x, p2.x);
            if (junc.point.x >= minX - 1 && junc.point.x <= maxX + 1) {
              const flowDirX = Math.sign(parentDx) || 1;
              const parentEntersFromSide = (flowDirX > 0 && junc.point.x > minX + 2) || (flowDirX < 0 && junc.point.x < maxX - 2);
              if (parentEntersFromSide) {
                if (childIsVert || (childIsHoriz && Math.sign(childDx) === flowDirX)) {
                  pts = [{ x: junc.point.x - flowDirX * 15, y: junc.point.y }, ...pts];
                  break;
                }
              }
            }
          }

          // Case B: Parent is VERTICAL, child branches HORIZONTALLY or continues VERTICALLY
          if (parentIsVert && Math.abs(junc.point.x - p1.x) < 2) {
            const minY = Math.min(p1.y, p2.y);
            const maxY = Math.max(p1.y, p2.y);
            if (junc.point.y >= minY - 1 && junc.point.y <= maxY + 1) {
              const flowDirY = Math.sign(parentDy) || 1;
              const parentEntersFromSide = (flowDirY > 0 && junc.point.y > minY + 2) || (flowDirY < 0 && junc.point.y < maxY - 2);
              if (parentEntersFromSide) {
                if (childIsHoriz || (childIsVert && Math.sign(childDy) === flowDirY)) {
                  pts = [{ x: junc.point.x, y: junc.point.y - flowDirY * 15 }, ...pts];
                  break;
                }
              }
            }
          }
        }
      }
    }
  }

  // 2. Merge: Arrow ends at a junction on a parent trunk
  if (arrow.target.type === 'junction' && junctions && arrows) {
    const junc = junctions.find((j) => j.id === arrow.target.id);
    if (junc) {
      const parent = arrows.find((a) => a.id === junc.parentArrowId);
      if (parent && parent.points && parent.points.length >= 2) {
        const lastIdx = pts.length - 1;
        const childDx = pts[lastIdx].x - pts[lastIdx - 1].x;
        const childDy = pts[lastIdx].y - pts[lastIdx - 1].y;
        const childIsVert = Math.abs(childDx) < 1 && Math.abs(childDy) > 0;
        const childIsHoriz = Math.abs(childDy) < 1 && Math.abs(childDx) > 0;

        for (let i = 0; i < parent.points.length - 1; i++) {
          const p1 = parent.points[i];
          const p2 = parent.points[i + 1];
          const parentDx = p2.x - p1.x;
          const parentDy = p2.y - p1.y;
          const parentIsHoriz = Math.abs(parentDy) < 1;
          const parentIsVert = Math.abs(parentDx) < 1;

          // Case A: Parent is HORIZONTAL, child merges VERTICALLY or HORIZONTALLY
          if (parentIsHoriz && Math.abs(junc.point.y - p1.y) < 2) {
            const minX = Math.min(p1.x, p2.x);
            const maxX = Math.max(p1.x, p2.x);
            if (junc.point.x >= minX - 1 && junc.point.x <= maxX + 1) {
              const flowDirX = Math.sign(parentDx) || 1;
              if (childIsVert || (childIsHoriz && Math.sign(childDx) === flowDirX)) {
                pts = [...pts, { x: junc.point.x + flowDirX * 15, y: junc.point.y }];
                break;
              }
            }
          }

          // Case B: Parent is VERTICAL, child merges HORIZONTALLY or VERTICALLY
          if (parentIsVert && Math.abs(junc.point.x - p1.x) < 2) {
            const minY = Math.min(p1.y, p2.y);
            const maxY = Math.max(p1.y, p2.y);
            if (junc.point.y >= minY - 1 && junc.point.y <= maxY + 1) {
              const flowDirY = Math.sign(parentDy) || 1;
              if (childIsHoriz || (childIsVert && Math.sign(childDy) === flowDirY)) {
                pts = [...pts, { x: junc.point.x, y: junc.point.y + flowDirY * 15 }];
                break;
              }
            }
          }
        }
      }
    }
  }

  return pts;
}

export function getSegmentsFromPoints(points: Point[], arrowId?: string, sourceSide?: Side, _targetSide?: Side): Segment[] {
  const segments: Segment[] = [];
  if (!points || points.length < 2) return segments;

  let prevOrientation: 'horizontal' | 'vertical' | null = null;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dx = Math.abs(p2.x - p1.x);
    const dy = Math.abs(p2.y - p1.y);

    let orientation: 'horizontal' | 'vertical';

    if (dx > 0 && dy === 0) {
      orientation = 'horizontal';
    } else if (dy > 0 && dx === 0) {
      orientation = 'vertical';
    } else if (dx > dy) {
      orientation = 'horizontal';
    } else if (dy > dx) {
      orientation = 'vertical';
    } else {
      // dx === 0 && dy === 0 (zero length segment)
      if (prevOrientation !== null) {
        orientation = prevOrientation === 'horizontal' ? 'vertical' : 'horizontal';
      } else if (sourceSide === 'top' || sourceSide === 'bottom') {
        orientation = 'vertical';
      } else {
        orientation = 'horizontal';
      }
    }

    prevOrientation = orientation;

    segments.push({
      id: `${arrowId || 'seg'}-${i}`,
      arrowId,
      start: p1,
      end: p2,
      orientation,
    });
  }
  return segments;
}

export function distanceToSegment(p: Point, seg: Segment): { dist: number; proj: Point } {
  const { start, end } = seg;
  const l2 = (end.x - start.x) ** 2 + (end.y - start.y) ** 2;
  if (l2 === 0) return { dist: distance(p, start), proj: start };
  let t = ((p.x - start.x) * (end.x - start.x) + (p.y - start.y) * (end.y - start.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = {
    x: Math.round(start.x + t * (end.x - start.x)),
    y: Math.round(start.y + t * (end.y - start.y)),
  };
  return { dist: distance(p, proj), proj };
}

export function generateLeaderPoints(labelPos: Point, arrowPoints: Point[]): Point[] {
  const segs = getSegmentsFromPoints(arrowPoints);
  let closestProj: Point = arrowPoints[0] || { x: labelPos.x, y: labelPos.y + 30 };
  let minDist = Infinity;

  for (const seg of segs) {
    const { dist, proj } = distanceToSegment(labelPos, seg);
    if (dist < minDist) {
      minDist = dist;
      closestProj = proj;
    }
  }

  const p0 = { x: labelPos.x + 10, y: labelPos.y + 10 };
  const p3 = closestProj;

  const dx = p3.x - p0.x;
  const dy = p3.y - p0.y;

  const p1 = {
    x: Math.round(p0.x + dx * 0.35 - 12),
    y: Math.round(p0.y + dy * 0.35 + 8),
  };
  const p2 = {
    x: Math.round(p0.x + dx * 0.65 + 8),
    y: Math.round(p0.y + dy * 0.65 - 6),
  };

  return [p0, p1, p2, p3];
}

export function syncArrowLeader(arrow: { showLeader?: boolean; labelPos?: Point; points: Point[]; leaderPoints?: Point[] }): void {
  if (arrow.showLeader && arrow.labelPos) {
    arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
  }
}

/**
 * Builds guaranteed 100% strictly orthogonal path between endpoints with proper entry/exit normals.
 */

export function clampLabelToCanvas(pt: Point, _labelText = '', margin = 20): Point {
  const minX = margin;
  const maxX = CANVAS_WIDTH - margin;
  const minY = margin;
  const maxY = CANVAS_HEIGHT - margin;

  return {
    x: Math.max(minX, Math.min(maxX, pt.x)),
    y: Math.max(minY, Math.min(maxY, pt.y)),
  };
}

/**
 * Magnetic Label Snapping Engine:
 * Snaps text labels to the nearest segment of the arrow if within magnetic snap radius (25px).
 * Automatically toggles leader line when dragged away.
 * Clamps coordinates to canvas boundaries.
 */
export function snapLabelToArrow(
  pt: Point,
  arrow: Arrow,
  snapRadius = 25
): { labelPos: Point; showLeader: boolean; leaderPoints?: Point[] } {
  const clampedInputPt = clampLabelToCanvas(pt, arrow.label);
  const segs = getSegmentsFromPoints(arrow.points);
  let closestSeg: Segment | null = null;
  let minD = Infinity;
  let bestProj: Point = clampedInputPt;

  for (const seg of segs) {
    const { dist, proj } = distanceToSegment(clampedInputPt, seg);
    if (dist < minD) {
      minD = dist;
      closestSeg = seg;
      bestProj = proj;
    }
  }

  if (closestSeg && minD <= snapRadius) {
    let snapX = bestProj.x;
    let snapY = bestProj.y;

    if (closestSeg.orientation === 'horizontal') {
      snapY = clampedInputPt.y <= bestProj.y ? bestProj.y - 12 : bestProj.y + 18;
      const minX = Math.min(closestSeg.start.x, closestSeg.end.x);
      const maxX = Math.max(closestSeg.start.x, closestSeg.end.x);
      snapX = Math.max(minX, Math.min(maxX, snapX));
    } else {
      snapX = clampedInputPt.x >= bestProj.x ? bestProj.x + 8 : bestProj.x - 8;
      const minY = Math.min(closestSeg.start.y, closestSeg.end.y);
      const maxY = Math.max(closestSeg.start.y, closestSeg.end.y);
      snapY = Math.max(minY, Math.min(maxY, snapY));
    }

    const finalPos = clampLabelToCanvas({ x: snapX, y: snapY }, arrow.label);
    return {
      labelPos: finalPos,
      showLeader: false,
      leaderPoints: undefined,
    };
  }

  // Remote label with dynamic leader line
  const finalPos = clampLabelToCanvas(clampedInputPt, arrow.label);
  const leaderPoints = generateLeaderPoints(finalPos, arrow.points);
  return {
    labelPos: finalPos,
    showLeader: true,
    leaderPoints,
  };
}

/**
 * Generates IDEF0 canonical parenthesis path around an arrow endpoint for tunneling.
 * Standard FIPS 183 defines tunneling as a pair of parentheses ( ) enclosing:
 * - the arrow head/tip (at target)
 * - or the arrow origin/stub (at source)
 */
export function getTunnelParenthesisPath(p1: Point, p2: Point, isTarget = false): string {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  if (len < 0.001) return '';

  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;

  // For target: tip is at p2, parentheses surround the arrowhead near p2
  // For source: start is at p1, parentheses surround the origin stub near p1
  const baseOffset = isTarget ? -10 : 8;
  const cx = (isTarget ? p2.x : p1.x) + ux * baseOffset;
  const cy = (isTarget ? p2.y : p1.y) + uy * baseOffset;

  const halfWidth = 6.5; // distance from centerline to parenthesis
  const halfHeight = 6;  // along the arrow axis

  // Left/upper arc: curves outwards from arrow
  const arc1_start_x = cx - ux * halfHeight + px * halfWidth;
  const arc1_start_y = cy - uy * halfHeight + py * halfWidth;
  const arc1_mid_x = cx + px * (halfWidth + 3.5);
  const arc1_mid_y = cy + py * (halfWidth + 3.5);
  const arc1_end_x = cx + ux * halfHeight + px * halfWidth;
  const arc1_end_y = cy + uy * halfHeight + py * halfWidth;

  // Right/lower arc
  const arc2_start_x = cx - ux * halfHeight - px * halfWidth;
  const arc2_start_y = cy - uy * halfHeight - py * halfWidth;
  const arc2_mid_x = cx - px * (halfWidth + 3.5);
  const arc2_mid_y = cy - py * (halfWidth + 3.5);
  const arc2_end_x = cx + ux * halfHeight - px * halfWidth;
  const arc2_end_y = cy + uy * halfHeight - py * halfWidth;

  return `M ${arc1_start_x},${arc1_start_y} Q ${arc1_mid_x},${arc1_mid_y} ${arc1_end_x},${arc1_end_y} M ${arc2_start_x},${arc2_start_y} Q ${arc2_mid_x},${arc2_mid_y} ${arc2_end_x},${arc2_end_y}`;
}


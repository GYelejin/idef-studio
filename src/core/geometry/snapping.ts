import { Point, SnapTarget, Block, Arrow, Side, ArrowEndpoint, Segment, ICOMRole } from "../../types/idef0";
import { CANVAS_WIDTH, CANVAS_HEIGHT, getSegmentsFromPoints, distanceToSegment, distance } from "./math";
import { validateArrowConnection } from "./validation";

export function getBorderSnapPoint(
  p: Point,
  snapRadius = 25,
  mode?: 'start' | 'target',
  draftSource?: SnapTarget | ArrowEndpoint,
  draftTarget?: SnapTarget | ArrowEndpoint
): SnapTarget | null {
  // Left border (Вход): only valid as START, NEVER as TARGET
  if (mode !== 'target' && !draftSource && (Math.abs(p.x - 30) <= snapRadius || p.x < 30)) {
    const candidate: SnapTarget = {
      type: 'border',
      side: 'left',
      point: { x: 30, y: Math.max(40, Math.min(CANVAS_HEIGHT - 40, p.y)) },
      role: 'input',
      sideBounds: { x1: 30, y1: 0, x2: 30, y2: CANVAS_HEIGHT },
    };
    if (!draftTarget || validateArrowConnection(candidate, draftTarget).valid) {
      return candidate;
    }
  }

  // Top border (Управление): only valid as START, NEVER as TARGET
  if (mode !== 'target' && !draftSource && (Math.abs(p.y - 40) <= snapRadius || p.y < 40)) {
    const candidate: SnapTarget = {
      type: 'border',
      side: 'top',
      point: { x: Math.max(30, Math.min(CANVAS_WIDTH - 30, p.x)), y: 40 },
      role: 'control',
      sideBounds: { x1: 0, y1: 40, x2: CANVAS_WIDTH, y2: 40 },
    };
    if (!draftTarget || validateArrowConnection(candidate, draftTarget).valid) {
      return candidate;
    }
  }

  // Right border (Выход): only valid as TARGET, NEVER as START
  if (mode !== 'start' && (Math.abs(p.x - 1580) <= snapRadius || p.x > 1580)) {
    const candidate: SnapTarget = {
      type: 'border',
      side: 'right',
      point: { x: 1580, y: Math.max(40, Math.min(CANVAS_HEIGHT - 40, p.y)) },
      role: 'output',
      sideBounds: { x1: 1580, y1: 0, x2: 1580, y2: CANVAS_HEIGHT },
    };
    if (!draftSource || validateArrowConnection(draftSource, candidate).valid) {
      return candidate;
    }
  }

  // Bottom border (Механизм): only valid as START, NEVER as TARGET
  if (mode !== 'target' && !draftSource && (Math.abs(p.y - 865) <= snapRadius || p.y > 865)) {
    const candidate: SnapTarget = {
      type: 'border',
      side: 'bottom',
      point: { x: Math.max(30, Math.min(CANVAS_WIDTH - 30, p.x)), y: 865 },
      role: 'mechanism',
      sideBounds: { x1: 0, y1: 865, x2: CANVAS_WIDTH, y2: 865 },
    };
    if (!draftTarget || validateArrowConnection(candidate, draftTarget).valid) {
      return candidate;
    }
  }

  return null;
}

export function getBlockSnapPoint(
  block: Block,
  p: Point,
  snapRadius = 25,
  mode?: 'start' | 'target',
  draftSource?: SnapTarget | ArrowEndpoint,
  draftTarget?: SnapTarget | ArrowEndpoint
): SnapTarget | null {
  const cornerMargin = 5;
  const leftX = block.x;
  const rightX = block.x + block.width;
  const topY = block.y;
  const bottomY = block.y + block.height;

  // Check corner exclusion (minimum 5px from each corner)
  const nearTopLeft = distance(p, { x: leftX, y: topY }) < cornerMargin;
  const nearTopRight = distance(p, { x: rightX, y: topY }) < cornerMargin;
  const nearBottomLeft = distance(p, { x: leftX, y: bottomY }) < cornerMargin;
  const nearBottomRight = distance(p, { x: rightX, y: bottomY }) < cornerMargin;
  if (nearTopLeft || nearTopRight || nearBottomLeft || nearBottomRight) {
    return null;
  }

  // Calculate distances to 4 edges
  const dLeft = Math.abs(p.x - leftX);
  const dRight = Math.abs(p.x - rightX);
  const dTop = Math.abs(p.y - topY);
  const dBottom = Math.abs(p.y - bottomY);

  const inYBounds = p.y >= topY + cornerMargin && p.y <= bottomY - cornerMargin;
  const inXBounds = p.x >= leftX + cornerMargin && p.x <= rightX - cornerMargin;

  const candidates: { side: Side; role: ICOMRole; dist: number; point: Point; sideBounds: { x1: number; y1: number; x2: number; y2: number } }[] = [];

  // Left (Вход): only valid as TARGET (entry), NEVER as START
  if (mode !== 'start' && inYBounds && dLeft <= snapRadius) {
    if (!draftSource || validateArrowConnection(draftSource, { type: 'block', id: block.id, side: 'left', point: { x: leftX, y: p.y } }).valid) {
      candidates.push({
        side: 'left',
        role: 'input',
        dist: dLeft,
        point: { x: leftX, y: Math.max(topY + 15, Math.min(bottomY - 15, p.y)) },
        sideBounds: { x1: leftX, y1: topY, x2: leftX, y2: bottomY },
      });
    }
  }

  // Right (Выход): only valid as START (exit), NEVER as TARGET
  if (mode !== 'target' && inYBounds && dRight <= snapRadius) {
    const candidate = {
      type: 'block' as const,
      id: block.id,
      side: 'right' as const,
      role: 'output' as const,
      dist: dRight,
      point: { x: rightX, y: Math.max(topY + 15, Math.min(bottomY - 15, p.y)) },
      sideBounds: { x1: rightX, y1: topY, x2: rightX, y2: bottomY },
    };
    if (!draftTarget || validateArrowConnection(candidate, draftTarget).valid) {
      candidates.push(candidate);
    }
  }

  // Top (Управление): only valid as TARGET (entry), NEVER as START
  if (mode !== 'start' && inXBounds && dTop <= snapRadius) {
    if (!draftSource || validateArrowConnection(draftSource, { type: 'block', id: block.id, side: 'top', point: { x: p.x, y: topY } }).valid) {
      candidates.push({
        side: 'top',
        role: 'control',
        dist: dTop,
        point: { x: Math.max(leftX + 15, Math.min(rightX - 15, p.x)), y: topY },
        sideBounds: { x1: leftX, y1: topY, x2: rightX, y2: topY },
      });
    }
  }

  // Bottom (Механизм): only valid as TARGET (entry), NEVER as START
  if (mode !== 'start' && inXBounds && dBottom <= snapRadius) {
    if (!draftSource || validateArrowConnection(draftSource, { type: 'block', id: block.id, side: 'bottom', point: { x: p.x, y: bottomY } }).valid) {
      candidates.push({
        side: 'bottom',
        role: 'mechanism',
        dist: dBottom,
        point: { x: Math.max(leftX + 15, Math.min(rightX - 15, p.x)), y: bottomY },
        sideBounds: { x1: leftX, y1: bottomY, x2: rightX, y2: bottomY },
      });
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => a.dist - b.dist);
  const best = candidates[0];

  return {
    type: 'block',
    id: block.id,
    side: best.side,
    point: best.point,
    role: best.role,
    sideBounds: best.sideBounds,
  };
}

export function getArrowSegmentSnapPoint(
  arrows: Arrow[],
  p: Point,
  snapRadius = 20,
  excludeArrowId?: string
): SnapTarget | null {
  let closest: { arrow: Arrow; segIdx: number; dist: number; proj: Point; seg: Segment } | null = null;

  for (const arrow of arrows) {
    if (arrow.id === excludeArrowId) continue;
    const segs = getSegmentsFromPoints(arrow.points, arrow.id);
    for (let i = 0; i < segs.length; i++) {
      const { dist, proj } = distanceToSegment(p, segs[i]);
      if (dist <= snapRadius) {
        if (!closest || dist < closest.dist) {
          closest = { arrow, segIdx: i, dist, proj, seg: segs[i] };
        }
      }
    }
  }

  if (closest) {
    return {
      type: 'arrow_segment',
      id: closest.arrow.id,
      targetArrowId: closest.arrow.id,
      targetSegmentIndex: closest.segIdx,
      point: closest.proj,
      role: closest.arrow.role,
      sideBounds: {
        x1: closest.seg.start.x,
        y1: closest.seg.start.y,
        x2: closest.seg.end.x,
        y2: closest.seg.end.y,
      },
    };
  }

  return null;
}

export function findSnapTarget(
  p: Point,
  blocks: Block[],
  arrows: Arrow[] = [],
  snapRadius = 25,
  excludeBlockId?: string,
  excludeArrowId?: string,
  mode?: 'start' | 'target',
  draftSource?: SnapTarget | ArrowEndpoint,
  draftTarget?: SnapTarget | ArrowEndpoint
): SnapTarget | null {
  // 1. Check block sides first
  for (const block of blocks) {
    if (block.id === excludeBlockId) continue;
    const target = getBlockSnapPoint(block, p, snapRadius, mode, draftSource, draftTarget);
    if (target) return target;
  }

  // 2. Check border vs arrow segments and pick the closer one
  const borderTarget = getBorderSnapPoint(p, snapRadius, mode, draftSource, draftTarget);
  const segmentTarget = getArrowSegmentSnapPoint(arrows, p, snapRadius, excludeArrowId);

  let validSegmentTarget: SnapTarget | null = null;
  if (segmentTarget) {
    if (draftSource) {
      if (validateArrowConnection(draftSource, segmentTarget).valid) {
        validSegmentTarget = segmentTarget;
      }
    } else if (draftTarget) {
      if (validateArrowConnection(segmentTarget, draftTarget).valid) {
        validSegmentTarget = segmentTarget;
      }
    } else {
      validSegmentTarget = segmentTarget;
    }
  }

  if (borderTarget && validSegmentTarget) {
    const distBorder = distance(p, borderTarget.point);
    const distSegment = distance(p, validSegmentTarget.point);
    return distBorder <= distSegment ? borderTarget : validSegmentTarget;
  }

  return borderTarget || validSegmentTarget || null;
}

/**
 * Builds dynamic lightning zigzag leader points connecting label to closest arrow segment.
 */

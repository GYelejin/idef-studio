import { Point, Segment, Block, ArrowEndpoint, SnapTarget } from "../../types/idef0";
import { getSegmentsFromPoints, simplifyCollinear } from "./math";

export function checkSegmentBlockCollision(seg: Segment, block: Block): boolean {
  const minX = Math.min(seg.start.x, seg.end.x);
  const maxX = Math.max(seg.start.x, seg.end.x);
  const minY = Math.min(seg.start.y, seg.end.y);
  const maxY = Math.max(seg.start.y, seg.end.y);

  const bLeft = block.x + 2;
  const bRight = block.x + block.width - 2;
  const bTop = block.y + 2;
  const bBottom = block.y + block.height - 2;

  if (seg.orientation === "horizontal" || Math.abs(seg.start.y - seg.end.y) < 1) {
    const y = seg.start.y;
    if (y > bTop && y < bBottom) {
      if (maxX > bLeft && minX < bRight) {
        return true;
      }
    }
  }

  if (seg.orientation === "vertical" || Math.abs(seg.start.x - seg.end.x) < 1) {
    const x = seg.start.x;
    if (x > bLeft && x < bRight) {
      if (maxY > bTop && minY < bBottom) {
        return true;
      }
    }
  }

  return false;
}

export function routeAvoidsBlocks(
  points: Point[],
  blocks: Block[],
  ignoreBlockIds: string[] = []
): Point[] {
  if (!points || points.length < 2 || !blocks || blocks.length === 0) {
    return points || [];
  }

  const obstacleBlocks = blocks.filter(b => !ignoreBlockIds.includes(b.id));
  if (obstacleBlocks.length === 0) return points;

  const currentPoints = [...points];

  for (let pass = 0; pass < 6; pass++) {
    let modified = false;
    const segs = getSegmentsFromPoints(currentPoints);

    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      const collidingBlock = obstacleBlocks.find(b => checkSegmentBlockCollision(seg, b));

      if (collidingBlock) {
        const b = collidingBlock;
        const p1 = seg.start;
        const p2 = seg.end;

        if (seg.orientation === "horizontal") {
          const goAbove = p1.y < b.y + b.height / 2;
          const detourY = goAbove ? b.y - 30 : b.y + b.height + 30;
          const isL2R = p1.x < p2.x;
          const xBefore = isL2R ? Math.min(p1.x, b.x - 25) : Math.max(p1.x, b.x + b.width + 25);
          const xAfter = isL2R ? Math.max(p2.x, b.x + b.width + 25) : Math.min(p2.x, b.x - 25);

          const replacement = [
            p1,
            { x: xBefore, y: p1.y },
            { x: xBefore, y: detourY },
            { x: xAfter, y: detourY },
            { x: xAfter, y: p2.y },
            p2,
          ];

          const clean: Point[] = [];
          for (const pt of replacement) {
            if (clean.length === 0 || clean[clean.length - 1].x !== pt.x || clean[clean.length - 1].y !== pt.y) {
              clean.push(pt);
            }
          }

          currentPoints.splice(i, 2, ...clean);
          modified = true;
          break;
        } else {
          const goLeft = p1.x < b.x + b.width / 2;
          const detourX = goLeft ? b.x - 30 : b.x + b.width + 30;
          const isT2B = p1.y < p2.y;
          const yBefore = isT2B ? Math.min(p1.y, b.y - 25) : Math.max(p1.y, b.y + b.height + 25);
          const yAfter = isT2B ? Math.max(p2.y, b.y + b.height + 25) : Math.min(p2.y, b.y - 25);

          const replacement = [
            p1,
            { x: p1.x, y: yBefore },
            { x: detourX, y: yBefore },
            { x: detourX, y: yAfter },
            { x: p2.x, y: yAfter },
            p2,
          ];

          const clean: Point[] = [];
          for (const pt of replacement) {
            if (clean.length === 0 || clean[clean.length - 1].x !== pt.x || clean[clean.length - 1].y !== pt.y) {
              clean.push(pt);
            }
          }

          currentPoints.splice(i, 2, ...clean);
          modified = true;
          break;
        }
      }
    }

    if (!modified) break;
  }

  return currentPoints;
}

export function avoidBlockObstacles(
  points: Point[],
  allBlocks: Block[],
  ignoreBlockIds: string[] = []
): Point[] {
  return routeAvoidsBlocks(points, allBlocks, ignoreBlockIds);
}

export function buildOrthogonalRoute(
  source: ArrowEndpoint | SnapTarget,
  target: ArrowEndpoint | SnapTarget,
  blocks: Block[] = []
): Point[] {
  const rawRoute = buildRawOrthogonalRoute(source, target, blocks);
  const ignoreIds: string[] = [];
  if (source.type === 'block' && source.id) ignoreIds.push(source.id);
  if (target.type === 'block' && target.id) ignoreIds.push(target.id);
  return simplifyCollinear(routeAvoidsBlocks(rawRoute, blocks, ignoreIds));
}

export function buildRawOrthogonalRoute(
  source: ArrowEndpoint | SnapTarget,
  target: ArrowEndpoint | SnapTarget,
  blocks: Block[] = []
): Point[] {
  const pStart = { ...source.point };
  const pEnd = { ...target.point };

  // Direct orthogonal line (strictly horizontal or strictly vertical)
  if (Math.abs(pStart.y - pEnd.y) < 1) {
    return [{ x: pStart.x, y: pStart.y }, { x: pEnd.x, y: pStart.y }];
  }
  if (Math.abs(pStart.x - pEnd.x) < 1) {
    return [{ x: pStart.x, y: pStart.y }, { x: pStart.x, y: pEnd.y }];
  }

  // Border (Left) to Block (Left) -> stepped horizontal entry
  if (source.type === 'border' && source.side === 'left' && target.side === 'left') {
    if (Math.abs(pStart.y - pEnd.y) <= 10) {
      return [{ x: pStart.x, y: pEnd.y }, pEnd];
    }
    const safeMax = pEnd.x - 10;
    const safeMin = pStart.x + 6;
    const stepX = safeMax > safeMin
      ? Math.min(pStart.x + 40, safeMax)
      : Math.round(pStart.x + (pEnd.x - pStart.x) / 2);
    return [
      pStart,
      { x: stepX, y: pStart.y },
      { x: stepX, y: pEnd.y },
      pEnd,
    ];
  }

  // Border (Top) to Block (Top) -> stepped vertical entry
  if (source.type === 'border' && source.side === 'top' && target.side === 'top') {
    if (Math.abs(pStart.x - pEnd.x) <= 10) {
      return [{ x: pEnd.x, y: pStart.y }, pEnd];
    }
    const safeMax = pEnd.y - 10;
    const safeMin = pStart.y + 6;
    const stepY = safeMax > safeMin
      ? Math.min(pStart.y + 35, safeMax)
      : Math.round(pStart.y + (pEnd.y - pStart.y) / 2);
    return [
      pStart,
      { x: pStart.x, y: stepY },
      { x: pEnd.x, y: stepY },
      pEnd,
    ];
  }

  // Border (Bottom) to Block (Bottom) -> stepped vertical entry
  if (source.type === 'border' && source.side === 'bottom' && target.side === 'bottom') {
    if (Math.abs(pStart.x - pEnd.x) <= 10) {
      return [{ x: pEnd.x, y: pStart.y }, pEnd];
    }
    const safeMin = pEnd.y + 10;
    const safeMax = pStart.y - 6;
    const stepY = safeMin < safeMax
      ? Math.max(pStart.y - 35, safeMin)
      : Math.round(pStart.y + (pEnd.y - pStart.y) / 2);
    return [
      pStart,
      { x: pStart.x, y: stepY },
      { x: pEnd.x, y: stepY },
      pEnd,
    ];
  }

  // Block (Right) to Border (Right)
  if (source.type === 'block' && source.side === 'right' && target.type === 'border' && target.side === 'right') {
    if (Math.abs(pStart.y - pEnd.y) <= 10) {
      return [pStart, { x: pEnd.x, y: pStart.y }];
    }
    const safeMin = pStart.x + 10;
    const safeMax = pEnd.x - 6;
    const stepX = safeMin < safeMax
      ? Math.max(pStart.x + 30, Math.min(pStart.x + 30, safeMax))
      : Math.round(pStart.x + (pEnd.x - pStart.x) / 2);
    return [
      pStart,
      { x: stepX, y: pStart.y },
      { x: stepX, y: pEnd.y },
      pEnd,
    ];
  }

  // Block (Right) to Block (Left) -> Forward or Feedback Flow
  if (source.side === 'right' && target.side === 'left') {
    if (Math.abs(pStart.y - pEnd.y) <= 10 && pStart.x + 15 < pEnd.x) {
      return [pStart, { x: pEnd.x, y: pStart.y }];
    }
    if (pStart.x + 20 < pEnd.x) {
      const midX = Math.round((pStart.x + pEnd.x) / 2);
      return [
        pStart,
        { x: midX, y: pStart.y },
        { x: midX, y: pEnd.y },
        pEnd,
      ];
    } else {
      const loopY = Math.max(pStart.y, pEnd.y) + 65;
      return [
        pStart,
        { x: pStart.x + 20, y: pStart.y },
        { x: pStart.x + 20, y: loopY },
        { x: pEnd.x - 20, y: loopY },
        { x: pEnd.x - 20, y: pEnd.y },
        pEnd,
      ];
    }
  }

  // Block (Right) to Block (Top/Control)
  if (source.side === 'right' && (target.side === 'top' || target.role === 'control')) {
    if (pStart.x < pEnd.x - 10 && pStart.y <= pEnd.y - 15) {
      return [pStart, { x: pEnd.x, y: pStart.y }, pEnd];
    } else if (pStart.x < pEnd.x) {
      const stepY = Math.min(pEnd.y - 25, pStart.y - 25);
      return [
        pStart,
        { x: pStart.x + 20, y: pStart.y },
        { x: pStart.x + 20, y: stepY },
        { x: pEnd.x, y: stepY },
        pEnd,
      ];
    } else {
      const loopX = pStart.x + 40;
      const loopY = Math.min(pStart.y, pEnd.y) - 50;
      return [
        pStart,
        { x: loopX, y: pStart.y },
        { x: loopX, y: loopY },
        { x: pEnd.x, y: loopY },
        pEnd,
      ];
    }
  }

  // Block (Right) to Block (Bottom/Mechanism)
  if (source.side === 'right' && (target.side === 'bottom' || target.role === 'mechanism')) {
    if (pStart.x < pEnd.x - 10 && pStart.y >= pEnd.y + 15) {
      return [pStart, { x: pEnd.x, y: pStart.y }, pEnd];
    } else if (pStart.x < pEnd.x) {
      const stepY = Math.max(pEnd.y + 25, pStart.y + 25);
      return [
        pStart,
        { x: pStart.x + 20, y: pStart.y },
        { x: pStart.x + 20, y: stepY },
        { x: pEnd.x, y: stepY },
        pEnd,
      ];
    } else {
      const loopX = pStart.x + 40;
      const loopY = Math.max(pStart.y, pEnd.y) + 50;
      return [
        pStart,
        { x: loopX, y: pStart.y },
        { x: loopX, y: loopY },
        { x: pEnd.x, y: loopY },
        pEnd,
      ];
    }
  }

  // Branch from Junction or Segment into Block Side (Guaranteed Perpendicular Entry)
  if (target.type === 'block') {
    if (target.side === 'top' || target.role === 'control') {
      if (Math.abs(pStart.x - pEnd.x) <= 10 && pStart.y < pEnd.y) {
        return [pStart, { x: pStart.x, y: pEnd.y }];
      } else if (pStart.y < pEnd.y) {
        return [pStart, { x: pEnd.x, y: pStart.y }, pEnd];
      } else {
        const stepY = pEnd.y - 30;
        return [pStart, { x: pStart.x, y: stepY }, { x: pEnd.x, y: stepY }, pEnd];
      }
    }
    if (target.side === 'bottom' || target.role === 'mechanism') {
      if (Math.abs(pStart.x - pEnd.x) <= 10 && pStart.y > pEnd.y) {
        return [pStart, { x: pStart.x, y: pEnd.y }];
      } else if (pStart.y > pEnd.y) {
        return [pStart, { x: pEnd.x, y: pStart.y }, pEnd];
      } else {
        const stepY = pEnd.y + 30;
        return [pStart, { x: pStart.x, y: stepY }, { x: pEnd.x, y: stepY }, pEnd];
      }
    }
    if (target.side === 'left' || target.role === 'input') {
      if (Math.abs(pStart.y - pEnd.y) <= 10 && pStart.x < pEnd.x) {
        return [pStart, { x: pEnd.x, y: pStart.y }];
      } else if (pStart.x < pEnd.x) {
        const midX = Math.round((pStart.x + pEnd.x) / 2);
        return [pStart, { x: midX, y: pStart.y }, { x: midX, y: pEnd.y }, pEnd];
      } else {
        const stepY = Math.max(pStart.y, pEnd.y) + 40;
        return [
          pStart,
          { x: pStart.x + 20, y: pStart.y },
          { x: pStart.x + 20, y: stepY },
          { x: pEnd.x - 20, y: stepY },
          { x: pEnd.x - 20, y: pEnd.y },
          pEnd,
        ];
      }
    }
    if (target.side === 'right' || target.role === 'output') {
      if (pStart.x > pEnd.x) {
        const midX = Math.round((pStart.x + pEnd.x) / 2);
        return [pStart, { x: midX, y: pStart.y }, { x: midX, y: pEnd.y }, pEnd];
      } else {
        const stepY = Math.max(pStart.y, pEnd.y) + 40;
        return [
          pStart,
          { x: pStart.x - 20, y: pStart.y },
          { x: pStart.x - 20, y: stepY },
          { x: pEnd.x + 20, y: stepY },
          { x: pEnd.x + 20, y: pEnd.y },
          pEnd,
        ];
      }
    }
  }

  // Standard stepped orthogonal path (midX step)
  const midX = Math.round((pStart.x + pEnd.x) / 2);
  return [
    pStart,
    { x: midX, y: pStart.y },
    { x: midX, y: pEnd.y },
    pEnd,
  ];
}

/**
 * Adjusts connected arrows when a block moves by (dx, dy), preserving all intermediate corridors, loop paths,
 * maintaining strict clearance without plunging inside block bodies, and keeping branch/merge junctions synchronized.
 */

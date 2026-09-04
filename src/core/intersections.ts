import { Point, Segment, Junction, Block, Arrow } from '../types/idef0';
import { getSegmentsFromPoints, distance } from './geometry';

export interface IntersectionResult {
  hasIntersection: boolean;
  isAllowed: boolean;
  point?: Point;
  type?: 'cross' | 'overlap' | 'block_collision';
  seg1?: Segment;
  seg2?: Segment;
  block?: Block;
  message?: string;
}

function segmentsOverlap1D(min1: number, max1: number, min2: number, max2: number): boolean {
  return Math.max(min1, min2) < Math.min(max1, max2);
}

export function checkSegmentIntersection(
  seg1: Segment,
  seg2: Segment,
  junctions: Junction[] = []
): IntersectionResult {
  const p1 = seg1.start;
  const p2 = seg1.end;
  const p3 = seg2.start;
  const p4 = seg2.end;

  // If sharing an exact endpoint
  const shareStartStart = distance(p1, p3) < 1;
  const shareStartEnd = distance(p1, p4) < 1;
  const shareEndStart = distance(p2, p3) < 1;
  const shareEndEnd = distance(p2, p4) < 1;

  if (shareStartStart || shareStartEnd || shareEndStart || shareEndEnd) {
    // If adjacent segments in same arrow, always allowed
    if (seg1.arrowId && seg1.arrowId === seg2.arrowId) {
      return { hasIntersection: false, isAllowed: true };
    }
    // If endpoints meet at a registered junction, allowed
    const meetPoint = shareStartStart || shareStartEnd ? p1 : p2;
    const isJunction = junctions.some(j => distance(j.point, meetPoint) < 10);
    if (isJunction) {
      return { hasIntersection: true, isAllowed: true, point: meetPoint, type: 'cross' };
    }
  }

  // Case 1: Both Horizontal
  if (seg1.orientation === 'horizontal' && seg2.orientation === 'horizontal') {
    if (Math.abs(p1.y - p3.y) < 1) {
      // Check if both arrows are part of a branch relationship
      const shareBranch = junctions.some(j => {
        const children = j.childArrowIds || [];
        return (j.parentArrowId === seg1.arrowId && children.includes(seg2.arrowId || '')) ||
               (j.parentArrowId === seg2.arrowId && children.includes(seg1.arrowId || '')) ||
               (children.includes(seg1.arrowId || '') && children.includes(seg2.arrowId || ''));
      });

      if (!shareBranch) {
        const minX1 = Math.min(p1.x, p2.x);
        const maxX1 = Math.max(p1.x, p2.x);
        const minX2 = Math.min(p3.x, p4.x);
        const maxX2 = Math.max(p3.x, p4.x);

        if (segmentsOverlap1D(minX1, maxX1, minX2, maxX2)) {
          return {
            hasIntersection: true,
            isAllowed: false,
            type: 'overlap',
            seg1,
            seg2,
            message: `Коллинеарное наложение горизонтальных сегментов (y=${p1.y})`,
          };
        }
      }
    }
    return { hasIntersection: false, isAllowed: true };
  }

  // Case 2: Both Vertical
  if (seg1.orientation === 'vertical' && seg2.orientation === 'vertical') {
    if (Math.abs(p1.x - p3.x) < 1) {
      const shareBranch = junctions.some(j => {
        const children = j.childArrowIds || [];
        return (j.parentArrowId === seg1.arrowId && children.includes(seg2.arrowId || '')) ||
               (j.parentArrowId === seg2.arrowId && children.includes(seg1.arrowId || '')) ||
               (children.includes(seg1.arrowId || '') && children.includes(seg2.arrowId || ''));
      });

      if (!shareBranch) {
        const minY1 = Math.min(p1.y, p2.y);
        const maxY1 = Math.max(p1.y, p2.y);
        const minY2 = Math.min(p3.y, p4.y);
        const maxY2 = Math.max(p3.y, p4.y);

        if (segmentsOverlap1D(minY1, maxY1, minY2, maxY2)) {
          return {
            hasIntersection: true,
            isAllowed: false,
            type: 'overlap',
            seg1,
            seg2,
            message: `Коллинеарное наложение вертикальных сегментов (x=${p1.x})`,
          };
        }
      }
    }
    return { hasIntersection: false, isAllowed: true };
  }

  // Case 3: One Horizontal, One Vertical
  const horiz = seg1.orientation === 'horizontal' ? seg1 : seg2;
  const vert = seg1.orientation === 'vertical' ? seg1 : seg2;

  const hMinX = Math.min(horiz.start.x, horiz.end.x);
  const hMaxX = Math.max(horiz.start.x, horiz.end.x);
  const hY = horiz.start.y;

  const vMinY = Math.min(vert.start.y, vert.end.y);
  const vMaxY = Math.max(vert.start.y, vert.end.y);
  const vX = vert.start.x;

  if (vX >= hMinX && vX <= hMaxX && hY >= vMinY && hY <= vMaxY) {
    const interPoint = { x: vX, y: hY };
    return {
      hasIntersection: true,
      isAllowed: true,
      point: interPoint,
      type: 'cross',
    };
  }

  return { hasIntersection: false, isAllowed: true };
}

export function checkSegmentBlockCollision(seg: Segment, block: Block): boolean {
  const margin = 2; // small threshold
  const bLeft = block.x + margin;
  const bRight = block.x + block.width - margin;
  const bTop = block.y + margin;
  const bBottom = block.y + block.height - margin;

  if (seg.orientation === 'horizontal') {
    const y = seg.start.y;
    if (y > bTop && y < bBottom) {
      const minX = Math.min(seg.start.x, seg.end.x);
      const maxX = Math.max(seg.start.x, seg.end.x);
      if (maxX > bLeft && minX < bRight) {
        return true;
      }
    }
  } else {
    const x = seg.start.x;
    if (x > bLeft && x < bRight) {
      const minY = Math.min(seg.start.y, seg.end.y);
      const maxY = Math.max(seg.start.y, seg.end.y);
      if (maxY > bTop && minY < bBottom) {
        return true;
      }
    }
  }
  return false;
}

export function validateAllIntersections(
  arrows: Arrow[],
  blocks: Block[],
  junctions: Junction[]
): IntersectionResult[] {
  const issues: IntersectionResult[] = [];
  const allSegments: Segment[] = [];

  for (const arrow of arrows) {
    const segs = getSegmentsFromPoints(arrow.points, arrow.id);
    allSegments.push(...segs);
  }

  // Pairwise segment check
  for (let i = 0; i < allSegments.length; i++) {
    for (let j = i + 1; j < allSegments.length; j++) {
      const res = checkSegmentIntersection(allSegments[i], allSegments[j], junctions);
      if (res.hasIntersection && !res.isAllowed) {
        issues.push(res);
      }
    }
  }

  // Segment vs Block body collisions
  for (const seg of allSegments) {
    for (const block of blocks) {
      if (checkSegmentBlockCollision(seg, block)) {
        issues.push({
          hasIntersection: true,
          isAllowed: false,
          type: 'block_collision',
          seg1: seg,
          block,
          message: `Пересечение тела блока «${block.name}» стрелкой`,
        });
      }
    }
  }

  return issues;
}

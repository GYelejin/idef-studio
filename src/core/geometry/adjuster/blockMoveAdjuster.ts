import { Arrow, Block, Junction } from "../../types/idef0";
import { getSegmentsFromPoints, distanceToSegment, generateLeaderPoints, clampLabelToCanvas } from "../math";
import { buildOrthogonalRoute } from "../router";

export function adjustArrowOnBlockMove(
  arrow: Arrow,
  blockOrId: Block | string,
  dx: number,
  dy: number,
  junctions: Junction[] = [],
  allBlocks: Block[] = []
): void {
  const blockId = typeof blockOrId === 'string' ? blockOrId : blockOrId.id;
  const currentMovedBlock = typeof blockOrId === 'string' ? allBlocks.find(b => b.id === blockId) || null : blockOrId;
  const isSource = arrow.source.type === 'block' && arrow.source.id === blockId;
  const isTarget = arrow.target.type === 'block' && arrow.target.id === blockId;
  const isBranchSource = arrow.source.type === 'junction' && arrow.source.id;

  if (!isSource && !isTarget && !isBranchSource) return;

  const oldPoints = arrow.points.map((p) => ({ ...p }));
  const oldSegs = getSegmentsFromPoints(oldPoints);
  let closestOldSegIdx = -1;
  let minLabelDist = Infinity;
  if (arrow.labelPos && oldSegs.length > 0) {
    for (let i = 0; i < oldSegs.length; i++) {
      const { dist } = distanceToSegment(arrow.labelPos, oldSegs[i]);
      if (dist < minLabelDist) {
        minLabelDist = dist;
        closestOldSegIdx = i;
      }
    }
  }

  const pts = arrow.points;
  const n = pts.length;
  if (n < 2) return;

  // Case A: Self Loop (both source and target are the moved block)
  if (isSource && isTarget) {
    for (let i = 0; i < n; i++) {
      pts[i].x += dx;
      pts[i].y += dy;
    }
    arrow.source.point.x += dx;
    arrow.source.point.y += dy;
    arrow.target.point.x += dx;
    arrow.target.point.y += dy;
  }
  // Case B: Inter-block flow (Source is Block, Target is Block)
  else if (arrow.source.type === 'block' && arrow.target.type === 'block') {
    const srcBlock = allBlocks.find(b => b.id === arrow.source.id);
    const tgtBlock = allBlocks.find(b => b.id === arrow.target.id);

    if (isSource) {
      arrow.source.point.x += dx;
      arrow.source.point.y += dy;
      pts[0].x += dx;
      pts[0].y += dy;
    }
    if (isTarget) {
      arrow.target.point.x += dx;
      arrow.target.point.y += dy;
      pts[n - 1].x += dx;
      pts[n - 1].y += dy;
    }

    const pSrc = arrow.source.point;
    const pTgt = arrow.target.point;

    // Subcase B1: Block(Right) -> Block(Left) (Forward or Feedback Loop)
    if (arrow.source.side === 'right' && arrow.target.side === 'left') {
      const isHigherPort = arrow.id === 'flow-confirmation' || arrow.label.includes('Требован') || arrow.target.point.y < 550;

      // Direct straight horizontal connection only if BOTH ports are already collinear
      if (Math.abs(pSrc.y - pTgt.y) < 1 && pSrc.x + 15 < pTgt.x) {
        arrow.points = [
          pSrc,
          pTgt,
        ];
      } else if (pSrc.x + 15 < pTgt.x) {
        const gap = pTgt.x - pSrc.x;
        // Distribute default ratio if multiple flows: higher port 0.65, lower port 0.30
        const defaultRatio = isHigherPort ? 0.65 : 0.30;
        let channelX = Math.round(pSrc.x + defaultRatio * gap);

        if (n === 4) {
          const oldSrcX = isSource ? pSrc.x - dx : pSrc.x;
          const oldTgtX = isTarget ? pTgt.x - dx : pTgt.x;
          const oldCorridorX = pts[1].x;
          const oldSpan = oldTgtX - oldSrcX;
          if (oldSpan > 10) {
            const ratio = Math.max(0.12, Math.min(0.88, (oldCorridorX - oldSrcX) / oldSpan));
            channelX = Math.round(pSrc.x + ratio * gap);
          }
        }

        arrow.points = [
          pSrc,
          { x: channelX, y: pSrc.y },
          { x: channelX, y: pTgt.y },
          pTgt,
        ];
      } else {
        // Feedback/bypass loop under the blocks with staggered clearances
        const maxY = Math.max(
          pSrc.y,
          pTgt.y,
          srcBlock ? srcBlock.y + srcBlock.height : pSrc.y,
          tgtBlock ? tgtBlock.y + tgtBlock.height : pTgt.y
        );
        const loopOffset = isHigherPort ? 60 : 35;
        const exitOffset = isHigherPort ? 35 : 18;
        const enterOffset = isHigherPort ? 35 : 18;
        const loopY = maxY + loopOffset;

        arrow.points = [
          pSrc,
          { x: pSrc.x + exitOffset, y: pSrc.y },
          { x: pSrc.x + exitOffset, y: loopY },
          { x: pTgt.x - enterOffset, y: loopY },
          { x: pTgt.x - enterOffset, y: pTgt.y },
          pTgt,
        ];
      }
    }
    // Subcase B2: Block(Right) -> Block(Top/Control)
    else if (arrow.source.side === 'right' && (arrow.target.side === 'top' || (arrow.target as any).role === 'control')) {
      if (pSrc.x + 20 < pTgt.x && pSrc.y < pTgt.y - 10) {
        arrow.points = [
          pSrc,
          { x: pTgt.x, y: pSrc.y },
          pTgt,
        ];
      } else {
        const minY = Math.min(
          pSrc.y,
          pTgt.y,
          srcBlock ? srcBlock.y : pSrc.y,
          tgtBlock ? tgtBlock.y : pTgt.y
        );
        const loopY = minY - 40;
        const channelX = Math.min(pSrc.x + 20, pTgt.x - 20);
        arrow.points = [
          pSrc,
          { x: channelX, y: pSrc.y },
          { x: channelX, y: loopY },
          { x: pTgt.x, y: loopY },
          pTgt,
        ];
      }
    }
    // Default 4-point stepped orthogonal routing
    else {
      const midX = Math.round((pSrc.x + pTgt.x) / 2);
      arrow.points = [
        pSrc,
        { x: midX, y: pSrc.y },
        { x: midX, y: pTgt.y },
        pTgt,
      ];
    }
  }
  // Case C: Boundary Inflow (Source is Border, Target is Moved Block)
  else if (arrow.source.type === 'border' && isTarget) {
    arrow.target.point.x += dx;
    arrow.target.point.y += dy;

    if (arrow.pathMode === 'auto') {
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, allBlocks);
    } else if (n === 2) {
      if (arrow.source.side === 'left' || arrow.source.side === 'right') {
        arrow.source.point.y += dy;
        pts[0].y += dy;
        pts[1].x += dx;
        pts[1].y += dy;
      } else if (arrow.source.side === 'top' || arrow.source.side === 'bottom') {
        arrow.source.point.x += dx;
        pts[0].x += dx;
        pts[1].x += dx;
        pts[1].y += dy;
      }
    } else if (n === 4) {
      pts[3].x = arrow.target.point.x;
      pts[3].y = arrow.target.point.y;
      if (arrow.source.side === 'top') {
        const safeMax = pts[3].y - 10;
        const safeMin = pts[0].y + 6;
        const stepY = safeMax > safeMin
          ? Math.min(pts[1].y, safeMax)
          : Math.round(pts[0].y + (pts[3].y - pts[0].y) / 2);
        pts[1] = { x: pts[0].x, y: stepY };
        pts[2] = { x: pts[3].x, y: stepY };
      } else if (arrow.source.side === 'bottom') {
        const safeMin = pts[3].y + 10;
        const safeMax = pts[0].y - 6;
        const stepY = safeMin < safeMax
          ? Math.max(pts[1].y, safeMin)
          : Math.round(pts[0].y + (pts[3].y - pts[0].y) / 2);
        pts[1] = { x: pts[0].x, y: stepY };
        pts[2] = { x: pts[3].x, y: stepY };
      } else if (arrow.source.side === 'left') {
        const safeMax = pts[3].x - 10;
        const safeMin = pts[0].x + 6;
        const stepX = safeMax > safeMin
          ? Math.min(pts[1].x, safeMax)
          : Math.round(pts[0].x + (pts[3].x - pts[0].x) / 2);
        pts[1] = { x: stepX, y: pts[0].y };
        pts[2] = { x: stepX, y: pts[3].y };
      } else {
        pts[1].x = pts[0].x;
        pts[2].x = pts[3].x;
        pts[2].y = pts[1].y;
      }
    } else {
      pts[n - 1].x = arrow.target.point.x;
      pts[n - 1].y = arrow.target.point.y;
      const lastSegIsHoriz = Math.abs(pts[n - 2].y - (pts[n - 1].y - dy)) < 2;
      if (lastSegIsHoriz) {
        pts[n - 2].y = pts[n - 1].y;
      } else {
        pts[n - 2].x = pts[n - 1].x;
      }
    }
  }
  // Case D: Boundary Outflow (Source is Moved Block, Target is Border)
  else if (isSource && arrow.target.type === 'border') {
    arrow.source.point.x += dx;
    arrow.source.point.y += dy;

    if (arrow.pathMode === 'auto') {
      arrow.points = buildOrthogonalRoute(arrow.source, arrow.target, allBlocks);
    } else if (n === 2) {
      if (arrow.target.side === 'left' || arrow.target.side === 'right') {
        arrow.target.point.y += dy;
        pts[0].x += dx;
        pts[0].y += dy;
        pts[1].y += dy;
      } else if (arrow.target.side === 'top' || arrow.target.side === 'bottom') {
        arrow.target.point.x += dx;
        pts[0].x += dx;
        pts[0].y += dy;
        pts[1].x += dx;
      }
    } else if (n === 4) {
      pts[0].x = arrow.source.point.x;
      pts[0].y = arrow.source.point.y;
      if (arrow.target.side === 'right') {
        const safeMin = pts[0].x + 10;
        const safeMax = pts[3].x - 6;
        const stepX = safeMin < safeMax
          ? Math.max(pts[1].x, safeMin)
          : Math.round(pts[0].x + (pts[3].x - pts[0].x) / 2);
        pts[1] = { x: stepX, y: pts[0].y };
        pts[2] = { x: stepX, y: pts[3].y };
      } else {
        pts[1].y = pts[0].y;
        pts[2].y = pts[3].y;
        pts[2].x = pts[1].x;
      }
    } else {
      pts[0].x = arrow.source.point.x;
      pts[0].y = arrow.source.point.y;
      const firstSegIsHoriz = Math.abs(pts[1].y - (pts[0].y - dy)) < 2;
      if (firstSegIsHoriz) {
        pts[1].y = pts[0].y;
      } else {
        pts[1].x = pts[0].x;
      }
    }
  }
  // Case E: Branch Arrow (Source is Junction) entering the Moved Target Block
  else if (arrow.source.type === 'junction' && isTarget) {
    arrow.target.point.x += dx;
    arrow.target.point.y += dy;
    pts[n - 1].x += dx;
    pts[n - 1].y += dy;

    const junc = junctions.find(j => j.id === arrow.source.id);
    const tgtBlock = currentMovedBlock || allBlocks.find(b => b.id === arrow.target.id);

    if (junc) {
      if (n === 2) {
        // Vertical drop: junction slides along horizontal trunk with target port X
        junc.point.x += dx;
        arrow.source.point.x += dx;
        pts[0].x += dx;
      } else if (n === 3) {
        // 3-point branch: junction is fixed on trunk; corner point shifts with target port
        pts[0] = { x: junc.point.x, y: junc.point.y };
        pts[1].x = arrow.target.point.x;
        pts[1].y = junc.point.y;
      } else if (n === 4) {
        pts[0] = { x: junc.point.x, y: junc.point.y };
        pts[n - 2].x = arrow.target.point.x;
        pts[n - 2].y = arrow.target.point.y;
      } else if (n >= 5) {
        // Multi-point feedback/bypass loop branch
        pts[0] = { x: junc.point.x, y: junc.point.y };
        const entryX = tgtBlock ? tgtBlock.x - 35 : pts[n - 1].x - 35;
        pts[n - 2].x = entryX;
        pts[n - 2].y = pts[n - 1].y;
        pts[n - 3].x = entryX;
      }
    }
  }
  // Case F: Merge Arrow (Target is Junction) leaving the Moved Source Block
  else if (isSource && arrow.target.type === 'junction') {
    arrow.source.point.x += dx;
    arrow.source.point.y += dy;
    pts[0].x += dx;
    pts[0].y += dy;

    const junc = junctions.find(j => j.id === arrow.target.id);
    if (n === 3) {
      pts[1].y = arrow.source.point.y;
      // Clearance protection: ensure vertical channel pts[1].x stays at least 20px outside block
      if (arrow.source.side === 'right') {
        const minChannelX = pts[0].x + 20;
        if (pts[1].x < minChannelX) {
          const shift = minChannelX - pts[1].x;
          pts[1].x += shift;
          if (junc) {
            junc.point.x += shift;
          }
          pts[2].x = pts[1].x;
        }
      }
    }
  }

  if (arrow.points && arrow.points.length >= 2) {
    arrow.points[0] = { ...arrow.source.point };
    arrow.points[arrow.points.length - 1] = { ...arrow.target.point };
  }

  // --- PRECISE SEGMENT-BOUND LABEL & LIGHTNING SYNCHRONIZATION ---
  if (arrow.labelPos) {
    if (isSource && isTarget) {
      arrow.labelPos.x += dx;
      arrow.labelPos.y += dy;
    } else if (closestOldSegIdx >= 0 && oldSegs[closestOldSegIdx]) {
      const newSegs = getSegmentsFromPoints(arrow.points);
      const oldSeg = oldSegs[closestOldSegIdx];
      let newSeg = newSegs[closestOldSegIdx];
      if (!newSeg || newSeg.orientation !== oldSeg.orientation) {
        newSeg = newSegs.find((s) => s.orientation === oldSeg.orientation) || newSegs[0];
      }

      if (newSeg && oldSeg) {
        const isFirstSeg = closestOldSegIdx === 0;
        const isLastSeg = closestOldSegIdx === oldSegs.length - 1;

        if (isFirstSeg && isSource) {
          // First segment attached to the moved source block
          arrow.labelPos.x += dx;
          arrow.labelPos.y += dy;
        } else if (isLastSeg && isTarget) {
          // Last segment attached to the moved target block
          arrow.labelPos.x += dx;
          arrow.labelPos.y += dy;
        } else if (oldSeg.orientation === 'horizontal' && newSeg.orientation === 'horizontal') {
          const shiftY = newSeg.start.y - oldSeg.start.y;
          arrow.labelPos.y += shiftY;
        } else if (oldSeg.orientation === 'vertical' && newSeg.orientation === 'vertical') {
          const shiftX = newSeg.start.x - oldSeg.start.x;
          arrow.labelPos.x += shiftX;
        }
      }
    }
  }

  if (arrow.labelPos) {
    arrow.labelPos = clampLabelToCanvas(arrow.labelPos, arrow.label);
  }

  // Update dynamic lightning leader points to maintain connection from moved label to moved arrow
  if (arrow.showLeader && arrow.labelPos) {
    arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
  }
}
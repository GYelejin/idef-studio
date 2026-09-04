import { Arrow, Block, Junction } from "../../types/idef0";
import { buildOrthogonalRoute } from "../router";
import { generateLeaderPoints } from "../math";

/**
 * Adjusts connected arrows when a functional block is resized via corner dragging or inspector dimensions.
 */
export function adjustArrowOnBlockResize(
  arrow: Arrow,
  block: Block,
  oldBounds: { x: number; y: number; width: number; height: number },
  newBounds: { x: number; y: number; width: number; height: number },
  junctions: Junction[] = [],
  allBlocks: Block[] = []
): void {
  const isSource = arrow.source.type === 'block' && arrow.source.id === block.id;
  const isTarget = arrow.target.type === 'block' && arrow.target.id === block.id;
  if (!isSource && !isTarget) return;

  const pts = arrow.points;
  const n = pts.length;
  if (n < 2) return;

  // 1. Adjust Source Endpoint
  if (isSource) {
    if (arrow.source.side === 'right') {
      arrow.source.point.x = newBounds.x + newBounds.width;
      if (oldBounds.height > 0) {
        const ratioY = (arrow.source.point.y - oldBounds.y) / oldBounds.height;
        arrow.source.point.y = Math.round(newBounds.y + ratioY * newBounds.height);
      }
    } else if (arrow.source.side === 'left') {
      arrow.source.point.x = newBounds.x;
      if (oldBounds.height > 0) {
        const ratioY = (arrow.source.point.y - oldBounds.y) / oldBounds.height;
        arrow.source.point.y = Math.round(newBounds.y + ratioY * newBounds.height);
      }
    } else if (arrow.source.side === 'top') {
      arrow.source.point.y = newBounds.y;
      if (oldBounds.width > 0) {
        const ratioX = (arrow.source.point.x - oldBounds.x) / oldBounds.width;
        arrow.source.point.x = Math.round(newBounds.x + ratioX * newBounds.width);
      }
    } else if (arrow.source.side === 'bottom') {
      arrow.source.point.y = newBounds.y + newBounds.height;
      if (oldBounds.width > 0) {
        const ratioX = (arrow.source.point.x - oldBounds.x) / oldBounds.width;
        arrow.source.point.x = Math.round(newBounds.x + ratioX * newBounds.width);
      }
    }
    pts[0].x = arrow.source.point.x;
    pts[0].y = arrow.source.point.y;
  }

  // 2. Adjust Target Endpoint
  if (isTarget) {
    if (arrow.target.side === 'left') {
      arrow.target.point.x = newBounds.x;
      if (oldBounds.height > 0) {
        const ratioY = (arrow.target.point.y - oldBounds.y) / oldBounds.height;
        arrow.target.point.y = Math.round(newBounds.y + ratioY * newBounds.height);
      }
    } else if (arrow.target.side === 'right') {
      arrow.target.point.x = newBounds.x + newBounds.width;
      if (oldBounds.height > 0) {
        const ratioY = (arrow.target.point.y - oldBounds.y) / oldBounds.height;
        arrow.target.point.y = Math.round(newBounds.y + ratioY * newBounds.height);
      }
    } else if (arrow.target.side === 'top') {
      arrow.target.point.y = newBounds.y;
      if (oldBounds.width > 0) {
        const ratioX = (arrow.target.point.x - oldBounds.x) / oldBounds.width;
        arrow.target.point.x = Math.round(newBounds.x + ratioX * newBounds.width);
      }
    } else if (arrow.target.side === 'bottom') {
      arrow.target.point.y = newBounds.y + newBounds.height;
      if (oldBounds.width > 0) {
        const ratioX = (arrow.target.point.x - oldBounds.x) / oldBounds.width;
        arrow.target.point.x = Math.round(newBounds.x + ratioX * newBounds.width);
      }
    }
    pts[n - 1].x = arrow.target.point.x;
    pts[n - 1].y = arrow.target.point.y;
  }

  // 3. Maintain Orthogonality across intermediate points
  if (n === 2) {
    if (arrow.source.side === 'left' || arrow.source.side === 'right' || arrow.target.side === 'left' || arrow.target.side === 'right') {
      if (arrow.source.type === 'border' && isTarget) {
        arrow.source.point.y = arrow.target.point.y;
        pts[0].y = arrow.target.point.y;
      } else if (isSource && arrow.target.type === 'border') {
        arrow.target.point.y = arrow.source.point.y;
        pts[1].y = arrow.source.point.y;
      }
    }
    if (arrow.source.side === 'top' || arrow.source.side === 'bottom' || arrow.target.side === 'top' || arrow.target.side === 'bottom') {
      if (arrow.source.type === 'border' && isTarget) {
        arrow.source.point.x = arrow.target.point.x;
        pts[0].x = arrow.target.point.x;
      } else if (isSource && arrow.target.type === 'border') {
        arrow.target.point.x = arrow.source.point.x;
        pts[1].x = arrow.source.point.x;
      }
    }
  } else if (n === 3) {
    if (isTarget) {
      if (arrow.target.side === 'top' || arrow.target.side === 'bottom') {
        pts[1].x = arrow.target.point.x;
      } else {
        pts[1].y = arrow.target.point.y;
      }
    }
    if (isSource) {
      if (arrow.source.side === 'top' || arrow.source.side === 'bottom') {
        pts[1].x = arrow.source.point.x;
      } else {
        pts[1].y = arrow.source.point.y;
      }
    }
  } else if (n === 4) {
    if (isSource) {
      pts[1].y = pts[0].y;
    }
    if (isTarget) {
      pts[2].y = pts[3].y;
    }
  }

  // Synchronize lightning leader if enabled
  if (arrow.showLeader && arrow.labelPos) {
    arrow.leaderPoints = generateLeaderPoints(arrow.labelPos, arrow.points);
  }
}
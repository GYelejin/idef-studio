import { Diagram } from "../../types/idef0";
import { adjustArrowOnBlockMove, synchronizeJunctions } from "./adjuster";

export function autoLayoutIdef0(diagram: Diagram): Diagram {
  const diag = JSON.parse(JSON.stringify(diagram)) as Diagram;
  if (!diag.blocks || diag.blocks.length === 0) return diag;

  // Sort blocks by nodeNumber
  const sorted = [...diag.blocks].sort((a, b) => (a.nodeNumber || 1) - (b.nodeNumber || 1));
  const n = sorted.length;

  const startX = 220;
  const startY = 150;
  const stepX = n > 1 ? Math.min(280, Math.floor((1250 - startX) / (n - 1))) : 0;
  const stepY = n > 1 ? Math.min(160, Math.floor((650 - startY) / (n - 1))) : 0;

  for (let i = 0; i < n; i++) {
    const b = sorted[i];
    const originalBlock = diag.blocks.find(blk => blk.id === b.id);
    if (!originalBlock) continue;

    const targetX = startX + i * stepX;
    const targetY = startY + i * stepY;
    const dx = targetX - originalBlock.x;
    const dy = targetY - originalBlock.y;

    originalBlock.x = targetX;
    originalBlock.y = targetY;
    originalBlock.width = 210;
    originalBlock.height = 130;

    for (const arrow of diag.arrows) {
      adjustArrowOnBlockMove(arrow, originalBlock.id, dx, dy, diag.junctions, diag.blocks);
    }
  }

  synchronizeJunctions(diag);
  return diag;
}





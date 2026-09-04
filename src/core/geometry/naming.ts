import { Arrow, Diagram } from "../../types/idef0";

export function getBlockCode(diagCode: string, nodeNumber: number): string {
  if (diagCode === 'A-0' || (diagCode === 'A0' && nodeNumber === 0)) {
    return 'A0';
  }
  if (diagCode === 'A0') {
    return `A${nodeNumber}`;
  }
  return `${diagCode}${nodeNumber}`;
}

/**
 * Finds the parent/trunk arrow if this arrow is a branch or merge connection.
 */
export function getArrowParent(arrow: Arrow, diag?: Diagram | null): Arrow | null {
  if (!diag || !diag.arrows) return null;

  // 1. Direct match via registered junctions
  if (diag.junctions) {
    const junc = diag.junctions.find(
      (j) => j.id === arrow.source.id || j.id === arrow.target.id || (j.childArrowIds && j.childArrowIds.includes(arrow.id))
    );
    if (junc && junc.parentArrowId && junc.parentArrowId !== arrow.id) {
      const parent = diag.arrows.find((a) => a.id === junc.parentArrowId);
      if (parent) return parent;
    }
  }

  // 2. Direct reference if source/target endpoint references parent arrow
  if (arrow.source.type === 'arrow_segment' || arrow.source.type === 'junction') {
    const parent = diag.arrows.find((a) => a.id === arrow.source.id);
    if (parent && parent.id !== arrow.id) return parent;
  }
  if (arrow.target.type === 'arrow_segment' || arrow.target.type === 'junction') {
    const parent = diag.arrows.find((a) => a.id === arrow.target.id);
    if (parent && parent.id !== arrow.id) return parent;
  }

  // 3. Waypoint geometry match: does source start on another arrow's segment?
  const startPt = arrow.points?.[0];
  if (startPt && (arrow.source.type === 'junction' || arrow.source.type === 'arrow_segment')) {
    for (const a of diag.arrows) {
      if (a.id === arrow.id || !a.points) continue;
      for (let i = 0; i < a.points.length - 1; i++) {
        const p1 = a.points[i];
        const p2 = a.points[i + 1];
        const isHoriz = Math.abs(p1.y - p2.y) < 2 && Math.abs(startPt.y - p1.y) < 6 &&
          startPt.x >= Math.min(p1.x, p2.x) - 6 && startPt.x <= Math.max(p1.x, p2.x) + 6;
        const isVert = Math.abs(p1.x - p2.x) < 2 && Math.abs(startPt.x - p1.x) < 6 &&
          startPt.y >= Math.min(p1.y, p2.y) - 6 && startPt.y <= Math.max(p1.y, p2.y) + 6;
        if (isHoriz || isVert) {
          return a;
        }
      }
    }
  }

  return null;
}

/**
 * Returns human-readable flow label:
 * - If label is non-empty, returns label
 * - If label is empty and has a parent arrow, returns 'Ответвление от "<Родитель>"'
 * - Otherwise returns 'Без названия'
 */
export function getArrowDisplayName(arrow: Arrow, diag?: Diagram | null): string {
  const label = arrow.label?.trim();
  if (label) {
    return label;
  }

  const parent = getArrowParent(arrow, diag);
  if (parent) {
    const parentLabel = parent.label?.trim() || 'Основной поток';
    return `Ответвление от «${parentLabel}»`;
  }

  return 'Без названия';
}

/**
 * Validates arrow connection against strict IDEF0 / ICOM standard topological rules:
 * - Left side of block is strictly INPUT (Receiver only)
 * - Top side of block is strictly CONTROL (Receiver only)
 * - Bottom side of block is strictly MECHANISM (Receiver only)
 * - Right side of block is strictly OUTPUT (Emitter only)
 * - Left border is INPUT source only
 * - Top border is CONTROL source only
 * - Bottom border is MECHANISM source only
 * - Right border is OUTPUT receiver only
 */

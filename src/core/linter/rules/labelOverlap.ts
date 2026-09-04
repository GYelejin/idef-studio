import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';

/**
 * FR-LINT-07: Подпись стрелки не должна перекрываться стрелкой или пересекать сегменты стрелок
 */
export const labelOverlapRule: LinterRule = {
  id: 'FR-LINT-07',
  name: 'Перекрытие подписи стрелкой',
  description: 'Подпись стрелки не должна пересекаться стрелками или накрываться линиями стрелок',
  category: 'geometry',
  defaultSeverity: 'warning',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];
    if (!diagram.arrows || diagram.arrows.length === 0) return issues;

    for (const arrow of diagram.arrows) {
      if (!arrow.label || !arrow.label.trim() || !arrow.points || arrow.points.length < 2) {
        continue;
      }

      const lx = arrow.labelPos ? arrow.labelPos.x : arrow.points[0].x + 10;
      const ly = arrow.labelPos ? arrow.labelPos.y : arrow.points[0].y - 10;
      const lines = arrow.label.split('\n');

      for (let lIdx = 0; lIdx < lines.length; lIdx++) {
        const line = lines[lIdx];
        if (!line.trim()) continue;

        // Font: Arial 12px. SVG baseline at ly + lIdx * 15
        const baseLineY = ly + lIdx * 15;
        const top = baseLineY - 9;
        const bottom = baseLineY + 3;
        const left = lx;
        const right = lx + line.length * 6.5;

        for (const other of diagram.arrows) {
          if (!other.points || other.points.length < 2) continue;

          for (let i = 0; i < other.points.length - 1; i++) {
            const p1 = other.points[i];
            const p2 = other.points[i + 1];
            const isH = Math.abs(p1.y - p2.y) < 0.001;
            const isV = Math.abs(p1.x - p2.x) < 0.001;

            if (isH) {
              const y = p1.y;
              const minX = Math.min(p1.x, p2.x);
              const maxX = Math.max(p1.x, p2.x);

              // Check if horizontal segment cuts through line vertically
              if (y > top + 1 && y < bottom - 1) {
                const overlap = Math.min(maxX, right) - Math.max(minX, left);
                if (overlap > 5) {
                  const issueId = `lint-07-overlap-${arrow.id}-${other.id}-h-${lIdx}`;
                  if (!issues.some(iss => iss.id === issueId)) {
                    const otherName = other.label ? `«${other.label.replace(/\n/g, ' ')}»` : `(${other.id})`;
                    issues.push({
                      id: issueId,
                      ruleId: 'FR-LINT-07',
                      severity: 'warning',
                      message: `Подпись стрелки «${arrow.label.replace(/\n/g, ' ')}» перекрывается сегментом стрелки ${otherName}`,
                      elementId: arrow.id,
                      elementType: 'arrow',
                      arrowId: arrow.id,
                      details: `Пересечение по оси Y=${y}, перекрытие ${Math.round(overlap)}px`,
                    });
                  }
                }
              }
            } else if (isV) {
              const x = p1.x;
              const minY = Math.min(p1.y, p2.y);
              const maxY = Math.max(p1.y, p2.y);

              // Check if vertical segment cuts through line horizontally
              if (x > left + 1 && x < right - 1) {
                const overlap = Math.min(maxY, bottom) - Math.max(minY, top);
                if (overlap > 5) {
                  const issueId = `lint-07-overlap-${arrow.id}-${other.id}-v-${lIdx}`;
                  if (!issues.some(iss => iss.id === issueId)) {
                    const otherName = other.label ? `«${other.label.replace(/\n/g, ' ')}»` : `(${other.id})`;
                    issues.push({
                      id: issueId,
                      ruleId: 'FR-LINT-07',
                      severity: 'warning',
                      message: `Подпись стрелки «${arrow.label.replace(/\n/g, ' ')}» перекрывается сегментом стрелки ${otherName}`,
                      elementId: arrow.id,
                      elementType: 'arrow',
                      arrowId: arrow.id,
                      details: `Пересечение по оси X=${x}, перекрытие ${Math.round(overlap)}px`,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }

    return issues;
  },
};

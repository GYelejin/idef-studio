import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';
import { validateAllIntersections } from '../../intersections';

/**
 * FR-LINT-05: Попарные пересечения и наложения стрелок и тел блоков
 */
export const intersectionsRule: LinterRule = {
  id: 'FR-LINT-05',
  name: 'Пересечения стрелок и блоков',
  description: 'Стрелки не должны пересекать тела блоков или накладываться друг на друга недопустимым образом',
  category: 'geometry',
  defaultSeverity: 'error',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];
    const intersectionResults = validateAllIntersections(diagram.arrows, diagram.blocks, diagram.junctions);

    for (let idx = 0; idx < intersectionResults.length; idx++) {
      const res = intersectionResults[idx];
      issues.push({
        id: `lint-05-coll-${idx}`,
        ruleId: 'FR-LINT-05',
        severity: 'error',
        message: res.message || 'Обнаружено недопустимое пересечение сегментов стрелок',
        elementId: res.seg1?.arrowId || res.block?.id,
        elementType: res.block ? 'block' : 'arrow',
        blockId: res.block?.id,
        arrowId: res.seg1?.arrowId,
        details: res.point ? `Координаты: (${res.point.x}, ${res.point.y})` : undefined,
      });
    }

    return issues;
  },
};

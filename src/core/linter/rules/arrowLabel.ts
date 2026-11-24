import { LinterRule, LinterContext } from '../types';
import { LinterIssue, Arrow, Diagram } from '../../../types/idef0';
import { getArrowParent } from '../../geometry';

function resolveArrowLabel(arrow: Arrow, diag: Diagram): string | null {
  if (arrow.label && arrow.label.trim().length > 0) {
    return arrow.label.trim();
  }
  // Check if branch inherits label from parent trunk
  const visited = new Set<string>();
  let curr: Arrow | null = arrow;
  while (curr && !visited.has(curr.id)) {
    visited.add(curr.id);
    const parent = getArrowParent(curr, diag);
    if (!parent) break;
    if (parent.label && parent.label.trim().length > 0) {
      return parent.label.trim();
    }
    curr = parent;
  }
  return null;
}

/**
 * FR-LINT-08: Проверка наличия наименования у стрелок (ГОСТ Р 50.1.028-2001)
 * Все стрелки потоков должны иметь непустое наименование (самостоятельное или унаследованное от ствола).
 */
export const arrowLabelRule: LinterRule = {
  id: 'FR-LINT-08',
  name: 'Обязательность подписи стрелок',
  description: 'Каждая стрелка должна иметь наименование. Стрелка без подписи не позволяет идентифицировать передаваемый поток данных или объектов.',
  category: 'semantics',
  defaultSeverity: 'warning',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];

    for (const arrow of diagram.arrows) {
      const resolvedLabel = resolveArrowLabel(arrow, diagram);
      if (!resolvedLabel) {
        issues.push({
          id: `lint-08-missing-label-${arrow.id}`,
          ruleId: 'FR-LINT-08',
          severity: 'warning',
          message: `Стрелка (${arrow.id}) не имеет подписи наименования потока`,
          elementId: arrow.id,
          elementType: 'arrow',
          arrowId: arrow.id,
        });
      }
    }

    return issues;
  },
};

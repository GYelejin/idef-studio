import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';

/**
 * FR-LINT-02: Полнота связей функционального блока (обязательно наличие Control и Output)
 */
export const icomCompletenessRule: LinterRule = {
  id: 'FR-LINT-02',
  name: 'Полнота связей функционального блока',
  description: 'Каждый блок должен иметь как минимум одно управляющее воздействие (сверху) и один выходной результат (справа)',
  category: 'semantics',
  defaultSeverity: 'warning',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];

    for (const block of diagram.blocks) {
      const hasControl = diagram.arrows.some(
        a => a.target.type === 'block' && a.target.id === block.id && a.target.side === 'top'
      );
      const hasOutput = diagram.arrows.some(
        a => a.source.type === 'block' && a.source.id === block.id && a.source.side === 'right'
      );

      if (!hasControl) {
        issues.push({
          id: `lint-02-ctrl-${block.id}`,
          ruleId: 'FR-LINT-02',
          severity: 'warning',
          message: `Блок «${block.name.replace(/\n/g, ' ')}» не имеет управляющей стрелки (Управление сверху)`,
          elementId: block.id,
          elementType: 'block',
          blockId: block.id,
        });
      }

      if (!hasOutput) {
        issues.push({
          id: `lint-02-out-${block.id}`,
          ruleId: 'FR-LINT-02',
          severity: 'warning',
          message: `Блок «${block.name.replace(/\n/g, ' ')}» не имеет выходной стрелки (Выход справа)`,
          elementId: block.id,
          elementType: 'block',
          blockId: block.id,
        });
      }
    }

    return issues;
  },
};

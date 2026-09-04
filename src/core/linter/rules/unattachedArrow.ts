import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';

/**
 * FR-LINT-06: Запрет не привязанных и висячих стрелок (Unattached Endpoints & Void Crossing)
 */
export const unattachedArrowRule: LinterRule = {
  id: 'FR-LINT-06',
  name: 'Привязка концов стрелок (Связанность графа)',
  description: 'Каждая стрелка должна иметь валидную привязку источника и приемника. Запрещены полностью не привязанные стрелки и сквозные потоки без связи с блоками на декомпозиции.',
  category: 'semantics',
  defaultSeverity: 'error',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];

    for (const arrow of diagram.arrows) {
      const arrowName = arrow.label ? arrow.label.replace(/\n/g, ' ') : 'Без названия';
      const isSrcUnattached = (arrow.source.type as string) === 'unattached';
      const isTgtUnattached = (arrow.target.type as string) === 'unattached';

      if (isSrcUnattached && isTgtUnattached) {
        issues.push({
          id: `lint-06-both-unattached-${arrow.id}`,
          ruleId: 'FR-LINT-06',
          severity: 'error',
          message: `Стрелка «${arrowName}» полностью отвязана (источник и приёмник не привязаны)`,
          elementId: arrow.id,
          elementType: 'arrow',
          arrowId: arrow.id,
        });
      } else if (isSrcUnattached) {
        issues.push({
          id: `lint-06-src-unattached-${arrow.id}`,
          ruleId: 'FR-LINT-06',
          severity: 'error',
          message: `Стрелка «${arrowName}» не имеет источника (начало не привязано)`,
          elementId: arrow.id,
          elementType: 'arrow',
          arrowId: arrow.id,
        });
      } else if (isTgtUnattached) {
        issues.push({
          id: `lint-06-tgt-unattached-${arrow.id}`,
          ruleId: 'FR-LINT-06',
          severity: 'error',
          message: `Стрелка «${arrowName}» не имеет приёмника (наконечник не привязан)`,
          elementId: arrow.id,
          elementType: 'arrow',
          arrowId: arrow.id,
        });
      }

      // Check border-to-border passthrough on decomposition diagrams with blocks
      if (
        diagram.blocks.length > 1 &&
        arrow.source.type === 'border' &&
        arrow.target.type === 'border'
      ) {
        issues.push({
          id: `lint-06-passthrough-${arrow.id}`,
          ruleId: 'FR-LINT-06',
          severity: 'error',
          message: `Стрелка «${arrowName}» проходит насквозь через диаграмму без привязки к функциональным блокам`,
          elementId: arrow.id,
          elementType: 'arrow',
          arrowId: arrow.id,
        });
      }

      // Check broken junction references
      if (arrow.source.type === 'junction' && arrow.source.id) {
        const junc = diagram.junctions.find(j => j.id === arrow.source.id);
        const parentArrow = junc ? diagram.arrows.find(a => a.id === junc.parentArrowId) : null;
        if (!junc || !parentArrow) {
          issues.push({
            id: `lint-06-broken-branch-${arrow.id}`,
            ruleId: 'FR-LINT-06',
            severity: 'error',
            message: `Разветвление стрелки «${arrowName}» ссылается на отсутствующий родительский поток`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }
      }

      if (arrow.target.type === 'junction' && arrow.target.id) {
        const junc = diagram.junctions.find(j => j.id === arrow.target.id);
        const parentArrow = junc ? diagram.arrows.find(a => a.id === junc.parentArrowId) : null;
        if (!junc || !parentArrow) {
          issues.push({
            id: `lint-06-broken-merge-${arrow.id}`,
            ruleId: 'FR-LINT-06',
            severity: 'error',
            message: `Слияние стрелки «${arrowName}» ссылается на отсутствующий целевой поток`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }
      }
    }

    return issues;
  },
};

import { LinterRule, LinterContext } from '../types';
import { LinterIssue, Diagram, Block } from '../../../types/idef0';

/**
 * FR-LINT-04: Балансировка граничных стрелок между родительской и дочерней диаграммами
 */
export const boundaryBalanceRule: LinterRule = {
  id: 'FR-LINT-04',
  name: 'Балансировка граничных стрелок',
  description: 'Все входящие и исходящие стрелки родительского блока должны присутствовать на диаграмме декомпозиции как граничные потоки',
  category: 'semantics',
  defaultSeverity: 'warning',

  validate({ project, diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];
    if (!diagram.parentBlockId) return issues;

    // Find parent diagram and block
    let parentDiag: Diagram | undefined;
    let parentBlock: Block | undefined;
    for (const d of project.diagrams) {
      const b = d.blocks.find(blk => blk.id === diagram.parentBlockId);
      if (b) {
        parentDiag = d;
        parentBlock = b;
        break;
      }
    }

    if (!parentDiag || !parentBlock) return issues;

    // Find parent arrows attached to parent block
    const parentInflows = parentDiag.arrows.filter(
      a => a.target.type === 'block' && a.target.id === parentBlock!.id
    );
    const parentOutflows = parentDiag.arrows.filter(
      a => a.source.type === 'block' && a.source.id === parentBlock!.id
    );

    // Boundary flows in child diagram
    const childBoundaryInputs = diagram.arrows.filter(a => a.source.type === 'border');
    const childBoundaryOutputs = diagram.arrows.filter(a => a.target.type === 'border');

    const norm = (str: string) => str.replace(/\s+/g, ' ').toLowerCase().trim();

    // Verify that all parent labels are present in child boundary flows
    for (const pin of parentInflows) {
      const pinNorm = norm(pin.label);
      if (pinNorm && !childBoundaryInputs.some(cin => norm(cin.label).includes(pinNorm) || pinNorm.includes(norm(cin.label)))) {
        issues.push({
          id: `lint-04-missing-in-${pin.id}`,
          ruleId: 'FR-LINT-04',
          severity: 'warning',
          message: `Граничный входящий поток «${pin.label.replace(/\n/g, ' ')}» родительского блока отсутствует на дочерней диаграмме`,
          elementId: diagram.id,
          elementType: 'diagram',
        });
      }
    }

    for (const pout of parentOutflows) {
      const poutNorm = norm(pout.label);
      if (poutNorm && !childBoundaryOutputs.some(cout => norm(cout.label).includes(poutNorm) || poutNorm.includes(norm(cout.label)))) {
        issues.push({
          id: `lint-04-missing-out-${pout.id}`,
          ruleId: 'FR-LINT-04',
          severity: 'warning',
          message: `Граничный исходящий поток «${pout.label.replace(/\n/g, ' ')}» родительского блока отсутствует на дочерней диаграмме`,
          elementId: diagram.id,
          elementType: 'diagram',
        });
      }
    }

    return issues;
  },
};

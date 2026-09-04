/**
 * ТЕСТ №187: Линтер: Дисбаланс граничных стрелок (отсутствует Вход в декомпозиции)
 * 
 * Класс эквивалентности: LINT-19 (Boundary Balance Missing Child Input)
 * Описание: Проверяет обнаружение пропавшего входного потока родительского блока на дочерней схеме.
 * Предусловия:
 *   - Родительский блок принимает сырье со стороны входа, на дочерней схеме входных стрелок нет.
 * Действия:
 *   1. Запустить boundaryBalanceRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксировано нарушение баланса входов.
 */

import { describe, it, expect } from 'bun:test';
import { boundaryBalanceRule } from '../../src/core/linter/rules/boundaryBalance';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №187: Дисбаланс входов LINT-19', () => {
  it('выдает предупреждение при отсутствии входа родителя в декомпозиции', () => {
    const parentDiag: Diagram = {
      id: 'd0',
      code: 'A0',
      title: 'Контекст',
      blocks: [{ id: 'b0', nodeNumber: 0, name: 'Система', x: 200, y: 200, width: 300, height: 150, decompDiagramId: 'd1' }],
      arrows: [
        { id: 'in1', label: 'Сырье', source: { type: 'border', side: 'left', point: { x: 30, y: 250 } }, target: { type: 'block', id: 'b0', side: 'left', point: { x: 200, y: 250 } }, role: 'input', points: [{ x: 30, y: 250 }, { x: 200, y: 250 }], pinned: false }
      ],
      junctions: [],
    };
    const childDiag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Декомпозиция',
      parentBlockId: 'b0',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Подпроцесс', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [parentDiag, childDiag] };
    const issues = boundaryBalanceRule.validate({ project, diagram: childDiag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-04')).toBe(true);
  });
});

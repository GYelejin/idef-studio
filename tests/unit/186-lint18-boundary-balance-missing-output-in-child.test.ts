/**
 * ТЕСТ №186: Линтер: Дисбаланс граничных стрелок (отсутствует Выход в дочерней диаграмме)
 * 
 * Класс эквивалентности: LINT-18 (Boundary Balance Missing Child Output)
 * Описание: Проверяет обнаружение отсутствующего выхода родительского блока на диаграмме декомпозиции.
 * Предусловия:
 *   - Родительский блок имеет 2 выхода, в декомпозиции представлен только 1.
 * Действия:
 *   1. Запустить boundaryBalanceRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксировано нарушение баланса граничных стрелок.
 */

import { describe, it, expect } from 'bun:test';
import { boundaryBalanceRule } from '../../src/core/linter/rules/boundaryBalance';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №186: Дисбаланс выходов LINT-18', () => {
  it('выдает предупреждение при отсутствии выхода родителя в декомпозиции', () => {
    const parentDiag: Diagram = {
      id: 'd0',
      code: 'A0',
      title: 'Контекст',
      blocks: [{ id: 'b0', nodeNumber: 0, name: 'Система', x: 200, y: 200, width: 300, height: 150, decompDiagramId: 'd1' }],
      arrows: [
        { id: 'out1', label: 'Выход 1', source: { type: 'block', id: 'b0', side: 'right', point: { x: 500, y: 240 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 240 } }, role: 'output', points: [{ x: 500, y: 240 }, { x: 1570, y: 240 }], pinned: false },
        { id: 'out2', label: 'Выход 2', source: { type: 'block', id: 'b0', side: 'right', point: { x: 500, y: 280 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 280 } }, role: 'output', points: [{ x: 500, y: 280 }, { x: 1570, y: 280 }], pinned: false },
      ],
      junctions: [],
    };
    const childDiag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Декомпозиция',
      parentBlockId: 'b0',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Подпроцесс', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [
        { id: 'c_out1', label: 'Выход 1', source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } }, role: 'output', points: [{ x: 400, y: 250 }, { x: 1570, y: 250 }], pinned: false }
      ],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [parentDiag, childDiag] };
    const issues = boundaryBalanceRule.validate({ project, diagram: childDiag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-04')).toBe(true);
  });
});

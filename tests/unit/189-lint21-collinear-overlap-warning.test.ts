/**
 * ТЕСТ №189: Линтер: Предупреждение о наложении коллинеарных стрелок (FR-LINT-05)
 * 
 * Класс эквивалентности: LINT-21 (Collinear Overlap Linter Warning)
 * Описание: Проверяет обнаружение двух стрелок, частично перекрывающихся по одной оси.
 * Предусловия:
 *   - Две стрелки частично накладываются на отрезке от (250, 300) до (400, 300).
 * Действия:
 *   1. Запустить intersectionsRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксировано предупреждение FR-LINT-05 о коллинеарном перекрытии линий.
 */

import { describe, it, expect } from 'bun:test';
import { intersectionsRule } from '../../src/core/linter/rules/intersections';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №189: Наложение стрелок LINT-21', () => {
  it('выдает предупреждение при наложении параллельных стрелок', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [
        { id: 'a1', label: 'Поток 1', source: { type: 'border', side: 'left', point: { x: 100, y: 300 } }, target: { type: 'border', side: 'right', point: { x: 400, y: 300 } }, role: 'input', points: [{ x: 100, y: 300 }, { x: 400, y: 300 }], pinned: false },
        { id: 'a2', label: 'Поток 2', source: { type: 'border', side: 'left', point: { x: 250, y: 300 } }, target: { type: 'border', side: 'right', point: { x: 600, y: 300 } }, role: 'input', points: [{ x: 250, y: 300 }, { x: 600, y: 300 }], pinned: false },
      ],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = intersectionsRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-05')).toBe(true);
  });
});

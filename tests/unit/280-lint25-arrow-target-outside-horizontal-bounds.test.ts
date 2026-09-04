/**
 * ТЕСТ №280: Линтер: Вход стрелки в верхнюю грань вне ширины блока (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-25 (Target Outside Horizontal Bounds)
 * Описание: Проверяет фиксацию ошибки линтера, если стрелка Управления входит правее блока.
 * Предусловия:
 *   - Блок X в диапазоне [200, 400], стрелка входит в X=450.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Обнаружена ошибка 'оканчивается в воздухе вне границ блока'.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №280: Вход вне ширины блока LINT-25', () => {
  it('фиксирует ошибку если стрелка входит в блок правее его границы', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1', label: 'Управление',
        source: { type: 'border', side: 'top', point: { x: 450, y: 40 } },
        target: { type: 'block', id: 'b1', side: 'top', point: { x: 450, y: 200 } },
        role: 'control', points: [{ x: 450, y: 40 }, { x: 450, y: 200 }], pinned: false,
      }],
      junctions: [],
    };
    const issues = geometryOrthoRule.validate({ project: { id: 'p', name: 'P', diagrams: [diag] }, diagram: diag });
    expect(issues.some(i => i.message.includes('в воздухе вне границ'))).toBe(true);
  });
});

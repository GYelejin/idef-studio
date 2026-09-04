/**
 * ТЕСТ №279: Линтер: Выход источника стрелки за вертикальные границы блока (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-24 (Source Outside Vertical Bounds)
 * Описание: Проверяет фиксацию ошибки линтера, если контактный порт стрелки на левой/правой грани блока выходит за границы по Y.
 * Предусловия:
 *   - Блок Y в диапазоне [200, 300], стрелка начинается в Y=350.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Обнаружена ошибка 'начинается вне границ блока'.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №279: Порт вне высоты блока LINT-24', () => {
  it('фиксирует ошибку если порт источника выходит за высоту блока', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1', label: 'Поток',
        source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 350 } },
        target: { type: 'border', side: 'right', point: { x: 1570, y: 350 } },
        role: 'output', points: [{ x: 400, y: 350 }, { x: 1570, y: 350 }], pinned: false,
      }],
      junctions: [],
    };
    const issues = geometryOrthoRule.validate({ project: { id: 'p', name: 'P', diagrams: [diag] }, diagram: diag });
    expect(issues.some(i => i.message.includes('начинается вне границ'))).toBe(true);
  });
});

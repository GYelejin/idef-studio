/**
 * ТЕСТ №270: Линтер: Ошибка при одновременной отвязке обоих концов стрелки (FR-LINT-06)
 * 
 * Класс эквивалентности: LINT-23 (Both Endpoints Unattached Error)
 * Описание: Проверяет обнаружение стрелки, у которой и начало, и конец отвязаны.
 * Предусловия:
 *   - Стрелка с source.type === 'unattached' и target.type === 'unattached'.
 * Действия:
 *   1. Запустить unattachedArrowRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксирована ошибка 'полностью отвязана'.
 */

import { describe, it, expect } from 'bun:test';
import { unattachedArrowRule } from '../../src/core/linter/rules/unattachedArrow';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №270: Полностью отвязанная стрелка LINT-23', () => {
  it('выдает критическую ошибку если оба конца стрелки не привязаны', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [{
        id: 'a1', label: 'Одиночная',
        source: { type: 'unattached', point: { x: 200, y: 200 } },
        target: { type: 'unattached', point: { x: 500, y: 200 } },
        role: 'input', points: [{ x: 200, y: 200 }, { x: 500, y: 200 }], pinned: true,
      }],
      junctions: [],
    };
    const issues = unattachedArrowRule.validate({ project: { id: 'p', name: 'P', diagrams: [diag] }, diagram: diag });
    expect(issues.some(i => i.message.includes('полностью отвязана'))).toBe(true);
  });
});

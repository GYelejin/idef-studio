/**
 * ТЕСТ №281: Линтер: Выход линии стрелки за пределы листа A4 (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-26 (Arrow Outside Canvas Bounds)
 * Описание: Проверяет обнаружение вылета звена стрелки за границы листа холста.
 * Предусловия:
 *   - Стрелка с точкой X=5 (меньше минимального поля 15px).
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Обнаружена ошибка 'выходит за пределы листа холста A4'.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №281: Вылет за лист холста LINT-26', () => {
  it('выдает ошибку если стрелка выходит за поля листа A4', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [{
        id: 'a1', label: 'Поток',
        source: { type: 'border', side: 'left', point: { x: 5, y: 200 } },
        target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
        role: 'input', points: [{ x: 5, y: 200 }, { x: 1570, y: 200 }], pinned: false,
      }],
      junctions: [],
    };
    const issues = geometryOrthoRule.validate({ project: { id: 'p', name: 'P', diagrams: [diag] }, diagram: diag });
    expect(issues.some(i => i.message.includes('пределы листа'))).toBe(true);
  });
});

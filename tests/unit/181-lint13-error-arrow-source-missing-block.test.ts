/**
 * ТЕСТ №181: Линтер: Ошибка ссылки на несуществующий блок-источник (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-13 (Missing Source Block Reference)
 * Описание: Проверяет фиксацию ошибки валидатором, если стрелка ссылается на удаленный или несуществующий блок-источник.
 * Предусловия:
 *   - Стрелка указывает source.id на 'missing-block'.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить наличие issues с severity 'error'.
 * Ожидаемый результат: Линтер зафиксировал ошибку отсутствия блока-источника.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №181: Несуществующий блок-источник LINT-13', () => {
  it('выдает ошибку при ссылке на отсутствующий блок-источник', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [{
        id: 'a1',
        label: 'Битая стрелка',
        source: { type: 'block', id: 'missing-id', side: 'right', point: { x: 200, y: 200 } },
        target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
        role: 'output',
        points: [{ x: 200, y: 200 }, { x: 1570, y: 200 }],
        pinned: false,
      }],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = geometryOrthoRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-03' && i.severity === 'error')).toBe(true);
  });
});

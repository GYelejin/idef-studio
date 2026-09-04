/**
 * ТЕСТ №182: Линтер: Ошибка ссылки на несуществующий блок-приемник (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-14 (Missing Target Block Reference)
 * Описание: Проверяет фиксацию ошибки валидатором при ссылке на отсутствующий целевой блок.
 * Предусловия:
 *   - Стрелка указывает target.id на 'missing-target'.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксирована ошибка валидации целевого блока.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №182: Несуществующий блок-приемник LINT-14', () => {
  it('выдает ошибку при ссылке на отсутствующий блок-цель', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [{
        id: 'a1',
        label: 'Битая стрелка',
        source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
        target: { type: 'block', id: 'missing-target', side: 'left', point: { x: 400, y: 200 } },
        role: 'input',
        points: [{ x: 30, y: 200 }, { x: 400, y: 200 }],
        pinned: false,
      }],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = geometryOrthoRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-03' && i.severity === 'error')).toBe(true);
  });
});

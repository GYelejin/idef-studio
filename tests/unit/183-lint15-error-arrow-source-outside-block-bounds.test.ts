/**
 * ТЕСТ №183: Линтер: Ошибка начала стрелки вне геометрических границ блока
 * 
 * Класс эквивалентности: LINT-15 (Source Outside Block Bounds)
 * Описание: Проверяет обнаружение оторванной стрелки, начинающейся в воздухе за пределами грани блока.
 * Предусловия:
 *   - Блок x: 200..400, y: 100..200; стрелка начинается в X=500 на верхней грани.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксирована ошибка выхода порта за габариты блока.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №183: Порт вне габаритов блока LINT-15', () => {
  it('выдает ошибку при выходе координаты порта за пределы блока', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 100, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1',
        label: 'Стрелка',
        source: { type: 'block', id: 'b1', side: 'top', point: { x: 500, y: 100 } },
        target: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
        role: 'control',
        points: [{ x: 500, y: 100 }, { x: 500, y: 40 }],
        pinned: false,
      }],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = geometryOrthoRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-03' && i.severity === 'error')).toBe(true);
  });
});

/**
 * ТЕСТ №184: Линтер: Ошибка окончания стрелки в воздухе вне границ блока
 * 
 * Класс эквивалентности: LINT-16 (Target Outside Block Bounds)
 * Описание: Проверяет обнаружение стрелки, оканчивающейся в воздухе за пределами грани целевого блока.
 * Предусловия:
 *   - Блок y: 200..300; стрелка входит в левую грань на Y=450.
 * Действия:
 *   1. Запустить geometryOrthoRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксирована ошибка входа стрелки вне габаритов блока.
 */

import { describe, it, expect } from 'bun:test';
import { geometryOrthoRule } from '../../src/core/linter/rules/geometryOrtho';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №184: Вход вне габаритов блока LINT-16', () => {
  it('выдает ошибку при входе стрелки в блок вне его контактной грани', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1',
        label: 'Стрелка',
        source: { type: 'border', side: 'left', point: { x: 30, y: 450 } },
        target: { type: 'block', id: 'b1', side: 'left', point: { x: 200, y: 450 } },
        role: 'input',
        points: [{ x: 30, y: 450 }, { x: 200, y: 450 }],
        pinned: false,
      }],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = geometryOrthoRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-03' && i.severity === 'error')).toBe(true);
  });
});

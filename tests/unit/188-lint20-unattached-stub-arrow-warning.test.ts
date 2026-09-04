/**
 * ТЕСТ №188: Линтер: Предупреждение о неподключенной стрелке-заглушке (FR-LINT-06)
 * 
 * Класс эквивалентности: LINT-20 (Unattached Stub Arrow Warning)
 * Описание: Проверяет обнаружение стрелки, у которой один из концов не подключен ни к блоку, ни к границе.
 * Предусловия:
 *   - Стрелка с эндпоинтом типа 'unattached'.
 * Действия:
 *   1. Запустить unattachedArrowRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксировано предупреждение о неподключенной стрелке.
 */

import { describe, it, expect } from 'bun:test';
import { unattachedArrowRule } from '../../src/core/linter/rules/unattachedArrow';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №188: Неподключенная стрелка LINT-20', () => {
  it('выдает предупреждение при наличии неподключенного эндпоинта', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [{ id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1',
        label: 'Заглушка',
        source: { type: 'unattached', point: { x: 200, y: 250 } },
        target: { type: 'block', id: 'b1', side: 'left', point: { x: 400, y: 250 } },
        role: 'input',
        points: [{ x: 200, y: 250 }, { x: 400, y: 250 }],
        pinned: false,
      }],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = unattachedArrowRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-06')).toBe(true);
  });
});

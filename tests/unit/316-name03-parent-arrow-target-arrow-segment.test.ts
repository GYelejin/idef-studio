/**
 * ТЕСТ №316: Именование: Определение родителя стрелки слияния по target.id
 * 
 * Класс эквивалентности: NAME-03 (Parent Arrow Target Segment)
 * Описание: Проверяет обнаружение родительской стрелки через getArrowParent, когда целевой эндпоинт стрелки имеет тип 'arrow_segment'.
 * Предусловия:
 *   - Стрелка с target.type: 'arrow_segment', target.id: trunk.id.
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен объект родительской стрелки trunk.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry/naming';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №316: Родитель стрелки слияния NAME-03', () => {
  it('определяет родительскую стрелку по target.type === arrow_segment', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        {
          id: 'trunk-1', label: 'Основной ствол',
          source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
          role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false,
        },
        {
          id: 'merge-1', label: 'Приток',
          source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
          target: { type: 'arrow_segment', id: 'trunk-1', point: { x: 500, y: 200 } } as any,
          role: 'control', points: [{ x: 500, y: 40 }, { x: 500, y: 200 }], pinned: false,
        }
      ],
      junctions: [],
    };

    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('trunk-1');
  });
});

/**
 * ТЕСТ №337: Именование: Возврат null при отсутствии родителя у стрелки в открытом поле
 * 
 * Класс эквивалентности: NAME-05 (Get Arrow Parent Returns Null Open Air)
 * Описание: Проверяет возврат null функцией getArrowParent, если начало стрелки не пересекает ни один сегмент диаграммы.
 * Предусловия:
 *   - Стрелка в открытом пространстве листа.
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry/naming';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №337: Стрелка без родителя NAME-05', () => {
  it('возвращает null если начало стрелки не совпадает с сегментами', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        {
          id: 'trunk', label: 'Ствол',
          source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
          role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false,
        },
        {
          id: 'isolated', label: '',
          source: { type: 'junction', id: 'orphan', point: { x: 500, y: 600 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 600 } },
          role: 'output', points: [{ x: 500, y: 600 }, { x: 1570, y: 600 }], pinned: false,
        }
      ],
      junctions: [],
    };

    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent).toBeNull();
  });
});

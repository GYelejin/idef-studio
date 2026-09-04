/**
 * ТЕСТ №317: Именование: Определение родителя по совпадению с вертикальным сегментом
 * 
 * Класс эквивалентности: NAME-04 (Parent Arrow Vertical Waypoint Match)
 * Описание: Проверяет определение родительской стрелки по геометрическому совпадению точки ветвления с вертикальным участком ствола.
 * Предусловия:
 *   - Ствол с вертикальным звеном от (400, 100) до (400, 500). Ветвь начинается в (400, 250).
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить найденный родитель.
 * Ожидаемый результат: Родитель определен по вертикальной соосности.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry/naming';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №317: Родитель по вертикальному сегменту NAME-04', () => {
  it('находит родительскую стрелку по расположению на вертикальном сегменте', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        {
          id: 'vert-trunk', label: 'Вертикальный ствол',
          source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
          target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
          role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 865 }], pinned: false,
        },
        {
          id: 'branch-1', label: '',
          source: { type: 'junction', id: 'ghost-j', point: { x: 400, y: 300 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
          role: 'output', points: [{ x: 400, y: 300 }, { x: 1570, y: 300 }], pinned: false,
        }
      ],
      junctions: [],
    };

    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('vert-trunk');
  });
});

/**
 * ТЕСТ №135: Именование: Определение родителя стрелки по геометрической близости сегмента
 * 
 * Класс эквивалентности: NAME-03 (Branch Parent by Geometry Proximity)
 * Описание: Проверяет определение родительского потока по расстоянию от точки ветвления до сегмента ствола.
 * Предусловия:
 *   - Стрелка ответвления начинается в 2px от ствола без явного ID узла.
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить нахождение родителя.
 * Ожидаемый результат: Родительская стрелка успешно определена по близости точек.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №135: Поиск родителя по геометрии NAME-03', () => {
  it('находит родительскую стрелку по геометрической близости точки начала ветви', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [
        {
          id: 'trunk',
          label: 'Магистральный поток',
          source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
          role: 'input',
          points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }],
          pinned: false,
        },
        {
          id: 'branch',
          label: '',
          source: { type: 'junction', id: 'j1', point: { x: 300, y: 200 } },
          target: { type: 'border', side: 'bottom', point: { x: 300, y: 865 } },
          role: 'mechanism',
          points: [{ x: 300, y: 200 }, { x: 300, y: 865 }],
          pinned: false,
        }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 300, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };
    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('trunk');
  });
});

/**
 * ТЕСТ №450: Геометрия: Ограничение сдвига сегмента стрелки с нижней грани блока
 * 
 * Класс эквивалентности: GEOM-28 (Shift Vertical Segment From Block Bottom Clamps X)
 * Описание: Проверяет удержание координаты X вертикального сегмента стрелки, выходящей из нижней грани блока, в пределах [block.x + 15, block.x + block.width - 15].
 * Предусловия:
 *   - Стрелка из нижней грани блока.
 * Действия:
 *   1. Сдвинуть сегмент далеко за пределы блока (X=900).
 *   2. Проверить удержание координаты X <= block.x + block.width - 15.
 * Ожидаемый результат: Сегмент удержан на правой границе блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №450: Ограничение сегмента с нижней грани GEOM-28', () => {
  it('не выпускает вертикальный сегмент с нижней грани за пределы ширины блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;

    const a: Arrow = {
      id: 'arr-bottom-1',
      label: 'Механизм',
      source: { type: 'block', id: b.id, side: 'bottom', point: { x: 400, y: 400 } },
      target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
      role: 'output',
      points: [{ x: 400, y: 400 }, { x: 400, y: 865 }],
      pinned: true,
    };
    diag.arrows.push(a);

    store.shiftArrowSegment(a.id, 0, 900);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].x).toBeLessThanOrEqual(b.x + b.width - 15);
  });
});

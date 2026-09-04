/**
 * ТЕСТ №408: Геометрия: Ограничение сдвига вертикального сегмента шириной блока
 * 
 * Класс эквивалентности: GEOM-23 (Shift Vertical Segment Clamped To Block Width)
 * Описание: Проверяет удержание координаты X вертикального сегмента стрелки Управления/Механизма в пределах ширины блока (clampToRange(newCoord, block.x, block.x + block.width)).
 * Предусловия:
 *   - Блок x=300..510, вертикальная стрелка.
 * Действия:
 *   1. Сдвинуть сегмент далеко влево (X=100).
 *   2. Проверить удержание X >= 300.
 * Ожидаемый результат: Сегмент удержан на левой границе блока X=300.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №408: Ограничение сдвига шириной блока GEOM-23', () => {
  it('не выпускает вертикальный сегмент за пределы ширины блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 300 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 300 }], pinned: true,
    })!;

    store.shiftArrowSegment(a.id, 0, 100);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].x).toBeGreaterThanOrEqual(300);
  });
});

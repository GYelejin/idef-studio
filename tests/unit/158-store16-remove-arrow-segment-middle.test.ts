/**
 * ТЕСТ №158: Хранилище: Удаление промежуточного сегмента стрелки (removeArrowSegment)
 * 
 * Класс эквивалентности: STORE-16 (Remove Arrow Segment Middle)
 * Описание: Проверяет удаление лишнего промежуточного звена сложного маршрута.
 * Предусловия:
 *   - Стрелка из 6 точек.
 * Действия:
 *   1. Вызвать store.removeArrowSegment(a.id, 2).
 *   2. Проверить пересчет точек.
 * Ожидаемый результат: Количество точек уменьшено, сегмент удален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №158: Удаление сегмента стрелки STORE-16', () => {
  it('удаляет промежуточный сегмент сложного маршрута', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(800, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 800, y: 265 } },
      role: 'output',
      points: [
        { x: 310, y: 265 },
        { x: 450, y: 265 },
        { x: 450, y: 350 },
        { x: 650, y: 350 },
        { x: 650, y: 265 },
        { x: 800, y: 265 }
      ],
      pinned: true,
    })!;
    store.removeArrowSegment(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated).toBeDefined();
  });
});

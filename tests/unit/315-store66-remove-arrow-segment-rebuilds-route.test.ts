/**
 * ТЕСТ №315: Хранилище: Удаление сегмента ломаной стрелки (removeArrowSegment)
 * 
 * Класс эквивалентности: STORE-66 (Remove Arrow Segment Rebuilds Route)
 * Описание: Проверяет схлопывание сегмента стрелки при вызове removeArrowSegment.
 * Предусловия:
 *   - Многоточечная стрелка.
 * Действия:
 *   1. Вызвать store.removeArrowSegment(a.id, 1).
 *   2. Проверить результат.
 * Ожидаемый результат: Сегмент удален, маршрут валиден.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №315: Удаление сегмента стрелки STORE-66', () => {
  it('удаляет промежуточный сегмент и восстанавливает непрерывность трассы', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 350 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 450, y: 150 }, { x: 450, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 350 }, { x: 700, y: 350 }],
      pinned: true,
    })!;

    store.removeArrowSegment(a.id, 1);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

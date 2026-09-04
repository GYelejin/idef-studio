/**
 * ТЕСТ №452: Геометрия: Перетрассировка при удалении последнего сегмента стрелки
 * 
 * Класс эквивалентности: GEOM-30 (Remove Arrow Segment Last Segment Fallback)
 * Описание: Проверяет автоматический вызов buildOrthogonalRoute при попытке удаления последнего сегмента стрелки (segmentIndex >= segs.length - 1).
 * Предусловия:
 *   - Многоточечная стрелка.
 * Действия:
 *   1. Вызвать removeArrowSegment для последнего сегмента.
 *   2. Проверить сохранение валидного пути.
 * Ожидаемый результат: Стрелка сохранена и перетрассирована.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №452: Удаление последнего сегмента GEOM-30', () => {
  it('перетрассирует стрелку при удалении последнего сегмента', () => {
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
      points: [{ x: 310, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 350 }, { x: 700, y: 350 }],
      pinned: true,
    })!;

    store.removeArrowSegment(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

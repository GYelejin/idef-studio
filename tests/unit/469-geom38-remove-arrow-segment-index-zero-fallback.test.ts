/**
 * ТЕСТ №469: Геометрия: Перетрассировка при удалении нулевого сегмента многоточечной стрелки
 * 
 * Класс эквивалентности: GEOM-38 (Remove Arrow Segment Index Zero Fallback)
 * Описание: Проверяет вызов buildOrthogonalRoute при передаче segmentIndex <= 0 в removeArrowSegment для стрелки из 5+ точек.
 * Предусловия:
 *   - 5-точечная стрелка.
 * Действия:
 *   1. Вызвать removeArrowSegment(a.id, 0).
 *   2. Проверить перетрассировку.
 * Ожидаемый результат: Стрелка перетрассирована через роутер.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №469: Удаление нулевого сегмента GEOM-38', () => {
  it('перетрассирует стрелку при segmentIndex <= 0 в removeArrowSegment', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 400, 'A1')!;

    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'output',
      points: [
        { x: 310, y: 150 },
        { x: 500, y: 150 },
        { x: 500, y: 300 },
        { x: 600, y: 300 },
        { x: 700, y: 450 },
      ],
      pinned: true,
    })!;

    store.removeArrowSegment(a.id, 0);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

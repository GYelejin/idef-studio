/**
 * ТЕСТ №470: Геометрия: Защитный вызов buildOrthogonalRoute при сжатии в removeArrowSegment
 * 
 * Класс эквивалентности: GEOM-39 (Remove Arrow Segment Fallback Build Route)
 * Описание: Проверяет перестроение стрелки через buildOrthogonalRoute при points.length < 2 в removeArrowSegment.
 * Предусловия:
 *   - 5-точечная стрелка.
 * Действия:
 *   1. Замокать simplifyCollinear один раз на [].
 *   2. Вызвать removeArrowSegment(a.id, 1).
 *   3. Проверить восстановление.
 * Ожидаемый результат: Стрелка успешно перестроена.
 */

import { describe, it, expect, spyOn } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import * as geom from '../../src/core/geometry';

describe('ТЕСТ №470: Защитное перестроение сегмента GEOM-39', () => {
  it('вызывает buildOrthogonalRoute при points.length < 2 в removeArrowSegment', () => {
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

    const spy = spyOn(geom, 'simplifyCollinear').mockReturnValueOnce([]);
    store.removeArrowSegment(a.id, 1);
    spy.mockRestore();

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

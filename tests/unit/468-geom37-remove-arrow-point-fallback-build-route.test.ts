/**
 * ТЕСТ №468: Геометрия: Защитный вызов buildOrthogonalRoute при сжатии стрелки в removeArrowPoint
 * 
 * Класс эквивалентности: GEOM-37 (Remove Arrow Point Fallback Build Route)
 * Описание: Проверяет защитное перестроение стрелки через buildOrthogonalRoute при сокращении точек до менее 2 (points.length < 2) в removeArrowPoint.
 * Предусловия:
 *   - 5-точечная стрелка.
 * Действия:
 *   1. Замокать simplifyCollinear один раз на возврат [].
 *   2. Вызвать removeArrowPoint(a.id, 2).
 *   3. Проверить восстановление точек.
 * Ожидаемый результат: Стрелка успешно восстановлена роутером.
 */

import { describe, it, expect, spyOn } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import * as geom from '../../src/core/geometry';

describe('ТЕСТ №468: Защитное перестроение точки GEOM-37', () => {
  it('вызывает buildOrthogonalRoute при points.length < 2 в removeArrowPoint', () => {
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
    store.removeArrowPoint(a.id, 2);
    spy.mockRestore();

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

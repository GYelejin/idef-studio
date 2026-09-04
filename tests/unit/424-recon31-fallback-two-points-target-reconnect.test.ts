/**
 * ТЕСТ №424: Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера цели
 * 
 * Класс эквивалентности: RECON-31 (Fallback Two Points Target Reconnect)
 * Описание: Проверяет срабатывание защитной ветки points = [srcPt, tgtPt] при отпускании цели стрелки в пустое место, если роутер вернул пустой массив точек.
 * Предусловия:
 *   - Стрелка из блока.
 * Действия:
 *   1. Замокать buildOrthogonalRoute на возврат [].
 *   2. Вызвать reconnectArrowEndpoint для target в свободное поле.
 *   3. Проверить points.length === 2.
 * Ожидаемый результат: Стрелке безопасно присвоен прямой 2-точечный отрезок [srcPt, tgtPt].
 */

import { describe, it, expect, spyOn } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';
import * as geom from '../../src/core/geometry';

describe('ТЕСТ №424: Защитный fallback цели RECON-31', () => {
  it('присваивает [srcPt, tgtPt] если роутер вернул пустой массив точек', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output', points: [{ x: 410, y: 250 }, { x: 1570, y: 250 }], pinned: false,
    })!;

    const spy = spyOn(geom, 'buildOrthogonalRoute').mockReturnValue([]);
    ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 700, y: 500 });
    spy.mockRestore();

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBe(2);
    expect(updated.points[0].x).toBe(410);
    expect(updated.points[1].x).toBe(700);
  });
});

/**
 * ТЕСТ №425: Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера источника
 * 
 * Класс эквивалентности: RECON-32 (Fallback Two Points Source Reconnect)
 * Описание: Проверяет срабатывание защитной ветки points = [srcPt, tgtPt] при отпускании источника стрелки в пустое место холста, если роутер вернул пустой массив точек.
 * Предусловия:
 *   - Стрелка во вход блока.
 * Действия:
 *   1. Замокать buildOrthogonalRoute на возврат [].
 *   2. Вызвать reconnectArrowEndpoint для source в свободное поле.
 *   3. Проверить points.length === 2.
 * Ожидаемый результат: Стрелке безопасно присвоен 2-точечный отрезок [srcPt, tgtPt].
 */

import { describe, it, expect, spyOn } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';
import * as geom from '../../src/core/geometry';

describe('ТЕСТ №425: Защитный fallback источника RECON-32', () => {
  it('присваивает [srcPt, tgtPt] если роутер вернул пустой массив точек для источника', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 600, y: 250 } },
      role: 'input', points: [{ x: 30, y: 250 }, { x: 600, y: 250 }], pinned: false,
    })!;

    const spy = spyOn(geom, 'buildOrthogonalRoute').mockReturnValue([]);
    ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', null, { x: 200, y: 500 });
    spy.mockRestore();

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBe(2);
    expect(updated.points[0].x).toBe(200);
    expect(updated.points[1].x).toBe(600);
  });
});

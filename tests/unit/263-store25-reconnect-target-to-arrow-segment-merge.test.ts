/**
 * ТЕСТ №263: Хранилище: Перепривязка конца стрелки к сегменту другого потока (Слияние)
 * 
 * Класс эквивалентности: STORE-25 (Reconnect Target to Arrow Segment)
 * Описание: Проверяет создание узла слияния при перетаскивании конца стрелки на сегмент существующего потока.
 * Предусловия:
 *   - Магистральный поток и боковой поток.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с target.type === 'arrow_segment'.
 *   2. Проверить junctions.
 * Ожидаемый результат: Создан узел типа 'merge'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №263: Слияние через reconnectArrowEndpoint STORE-25', () => {
  it('создает узел слияния при перепривязке конца к сегменту стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 700, y: 150 }],
      pinned: false,
    })!;
    const b3 = store.createBlock(400, 400, 'A1')!;
    const incoming = store.createArrow({
      label: 'Приток',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 610, y: 450 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 450 } },
      role: 'output',
      points: [{ x: 610, y: 450 }, { x: 1570, y: 450 }],
      pinned: false,
    })!;
    const ok = store.reconnectArrowEndpoint(incoming.id, 'target', {
      type: 'arrow_segment' as any, id: trunk.id, point: { x: 500, y: 150 }
    });
    expect(ok).toBe(true);
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.type === 'merge')).toBe(true);
  });
});

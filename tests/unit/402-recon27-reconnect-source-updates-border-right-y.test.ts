/**
 * ТЕСТ №402: Перепривязка стрелки: Выравнивание правого граничного выхода при смене источника
 * 
 * Класс эквивалентности: RECON-27 (Reconnect Source Updates Border Right Y)
 * Описание: Проверяет автоматическое выравнивание координаты Y целевой правой границы (target.point.y) по высоте нового источника при перепривязке начала стрелки к блоку.
 * Предусловия:
 *   - Стрелка, идущая на правую границу листа.
 * Действия:
 *   1. Перепривязать источник к новому блоку на высоте Y=400.
 *   2. Проверить целевую точку target.point.y === 400.
 * Ожидаемый результат: Целевая граница листа выровнена по высоте нового блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №402: Выравнивание выхода при смене источника RECON-27', () => {
  it('синхронизирует Y целевой правой границы при смене блока источника', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(100, 400, 'A1')!;

    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 1570, y: 150 }], pinned: false,
    })!;

    ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', {
      type: 'block', id: b2.id, side: 'right', point: { x: 310, y: 450 },
    });

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.y).toBe(450);
  });
});

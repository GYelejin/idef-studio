/**
 * ТЕСТ №383: Перепривязка стрелки: Удаление старого узла при отрыве цели стрелки
 * 
 * Класс эквивалентности: RECON-22 (Reconnect Target Cleans Up Old Junction)
 * Описание: Проверяет автоматическое удаление узла слияния из массива junctions при перепривязке стрелки слияния в свободное поле.
 * Предусловия:
 *   - Стрелка с target.type: 'junction'.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для цели в свободное поле.
 *   2. Проверить удаление узла из diag.junctions.
 * Ожидаемый результат: Осиротевший узел слияния удален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №383: Очистка узла при переносе цели RECON-22', () => {
  it('удаляет старый узел слияния при перепривязке стрелки в поле', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 150 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 450 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      role: 'output', points: [{ x: 310, y: 450 }, { x: 500, y: 150 }], pinned: false,
    })!;

    ArrowEndpointOps.reconnectArrowEndpoint(store.state, merge.id, 'target', null, { x: 800, y: 500 });
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

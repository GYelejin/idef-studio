/**
 * ТЕСТ №384: Перепривязка стрелки: Удаление старого узла при отрыве источника ветви
 * 
 * Класс эквивалентности: RECON-23 (Reconnect Source Cleans Up Old Junction)
 * Описание: Проверяет автоматическое удаление узла ветвления из массива junctions при перепривязке источника ветви в свободное поле.
 * Предусловия:
 *   - Стрелка с source.type: 'junction'.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для источника в свободное поле.
 *   2. Проверить удаление узла.
 * Ожидаемый результат: Осиротевший узел ветвления удален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №384: Очистка узла при переносе источника RECON-23', () => {
  it('удаляет старый узел ветвления при перепривязке источника в поле', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 500, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 450 }], pinned: false,
    })!;

    ArrowEndpointOps.reconnectArrowEndpoint(store.state, branch.id, 'source', null, { x: 100, y: 500 });
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

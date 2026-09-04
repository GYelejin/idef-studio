/**
 * ТЕСТ №431: Перепривязка стрелки: Очистка узла источника при выборе 'unattached' через ключ
 * 
 * Класс эквивалентности: RECON-33 (Set Endpoint Key Source Unattached Cleans Junction)
 * Описание: Проверяет удаление старого узла ветвления из diag.junctions при установке источника в статус 'unattached' через setArrowEndpointKey.
 * Предусловия:
 *   - Стрелка ветви от узла ствола.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(state, branch.id, 'source', 'unattached').
 *   2. Проверить удаление узла.
 * Ожидаемый результат: Узел ветвления удален из диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №431: Очистка узла при выборе unattached источника RECON-33', () => {
  it('удаляет узел при отвязке источника через инспектор', () => {
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

    ArrowEndpointOps.setArrowEndpointKey(store.state, branch.id, 'source', 'unattached');
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

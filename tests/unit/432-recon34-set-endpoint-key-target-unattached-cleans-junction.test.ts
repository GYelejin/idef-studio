/**
 * ТЕСТ №432: Перепривязка стрелки: Очистка узла цели при выборе 'unattached' через ключ
 * 
 * Класс эквивалентности: RECON-34 (Set Endpoint Key Target Unattached Cleans Junction)
 * Описание: Проверяет удаление узла слияния из diag.junctions при установке цели в статус 'unattached' через setArrowEndpointKey.
 * Предусловия:
 *   - Стрелка слияния в узел ствола.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(state, merge.id, 'target', 'unattached').
 *   2. Проверить удаление узла.
 * Ожидаемый результат: Узел слияния удален из диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №432: Очистка узла при выборе unattached цели RECON-34', () => {
  it('удаляет узел при отвязке цели через инспектор', () => {
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

    ArrowEndpointOps.setArrowEndpointKey(store.state, merge.id, 'target', 'unattached');
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

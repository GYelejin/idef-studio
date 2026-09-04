/**
 * ТЕСТ №405: Перепривязка стрелки: Удаление узла слияния при смене ключа цели через инспектор
 * 
 * Класс эквивалентности: RECON-30 (Set Endpoint Key Cleans Up Old Merge Junction)
 * Описание: Проверяет удаление старого узла слияния из diag.junctions при смене порта цели стрелки слияния через setArrowEndpointKey.
 * Предусловия:
 *   - Стрелка слияния в узел ствола.
 * Действия:
 *   1. Вызвать setArrowEndpointKey для цели на блок.
 *   2. Проверить отсутствие узла.
 * Ожидаемый результат: Старый узел слияния очищен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №405: Очистка узла цели через инспектор RECON-30', () => {
  it('удаляет старый узел слияния при смене порта цели через инспектор', () => {
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

    ArrowEndpointOps.setArrowEndpointKey(store.state, merge.id, 'target', `block:${b2.id}:left`);
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

/**
 * ТЕСТ №404: Перепривязка стрелки: Удаление узла ветвления при смене ключа источника через инспектор
 * 
 * Класс эквивалентности: RECON-29 (Set Endpoint Key Cleans Up Old Branch Junction)
 * Описание: Проверяет удаление старого узла ветвления из diag.junctions при смене порта источника через setArrowEndpointKey.
 * Предусловия:
 *   - Ветвь от узла ствола.
 * Действия:
 *   1. Вызвать setArrowEndpointKey для источника на блок.
 *   2. Проверить отсутствие старого узла в diag.junctions.
 * Ожидаемый результат: Старый узел ветвления очищен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №404: Очистка узла источника через инспектор RECON-29', () => {
  it('удаляет старый узел ветвления при смене порта источника через инспектор', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 400, 'A1')!;
    const b4 = store.createBlock(700, 400, 'A1')!;

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
      target: { type: 'block', id: b4.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 450 }], pinned: false,
    })!;

    ArrowEndpointOps.setArrowEndpointKey(store.state, branch.id, 'source', `block:${b3.id}:right`);
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

/**
 * ТЕСТ №433: Перепривязка стрелки: Очистка узла источника при переключении на границу через ключ
 * 
 * Класс эквивалентности: RECON-35 (Set Endpoint Key Source Border Cleans Junction)
 * Описание: Проверяет удаление старого узла ветвления при переключении источника стрелки на границу листа ('border:left') через setArrowEndpointKey.
 * Предусловия:
 *   - Стрелка ветви от узла.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(state, branch.id, 'source', 'border:left').
 *   2. Проверить удаление узла.
 * Ожидаемый результат: Старый узел ветвления удален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №433: Очистка узла при выборе границы RECON-35', () => {
  it('удаляет старый узел при переключении источника на границу', () => {
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

    ArrowEndpointOps.setArrowEndpointKey(store.state, branch.id, 'source', 'border:left');
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(false);
  });
});

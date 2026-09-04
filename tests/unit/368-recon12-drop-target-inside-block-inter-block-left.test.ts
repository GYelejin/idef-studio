/**
 * ТЕСТ №368: Перепривязка стрелки: Бросок межблочной стрелки внутрь следующего блока
 * 
 * Класс эквивалентности: RECON-12 (Drop Target Inside Block Inter Block Left)
 * Описание: Проверяет автоматическую привязку межблочной стрелки, исходящей слева от блока, к левой грани (Вход) при броске внутрь блока.
 * Предусловия:
 *   - Стрелка из блока 1 (x=100), блок 2 расположен правее (x=500).
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой внутри блока 2.
 *   2. Проверить target.side === 'left'.
 * Ожидаемый результат: Стрелка автоматически привязана к левому входу блока 2.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №368: Межблочный бросок во Вход RECON-12', () => {
  it('привязывает к левой стороне следующего блока при броске внутрь блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'unattached', point: { x: 400, y: 250 } },
      role: 'output', points: [{ x: 310, y: 250 }, { x: 400, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 550, y: 240 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('left');
  });
});

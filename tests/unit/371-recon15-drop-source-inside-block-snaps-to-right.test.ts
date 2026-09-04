/**
 * ТЕСТ №371: Перепривязка стрелки: Бросок начала стрелки внутрь блока (Выход источника)
 * 
 * Класс эквивалентности: RECON-15 (Drop Source Inside Block Snaps To Right)
 * Описание: Проверяет автоматическую привязку источника стрелки к правой грани блока (Выход) при отпускании начала стрелки внутри блока.
 * Предусловия:
 *   - Стрелка во вход блока 2.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для 'source' с точкой внутри блока 1.
 *   2. Проверить source.side === 'right'.
 * Ожидаемый результат: Начало стрелки привязано к правой стороне блока как Выход.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №371: Бросок начала стрелки в блок RECON-15', () => {
  it('привязывает начало стрелки к правой грани блока при броске внутрь', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'unattached', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 250 } },
      role: 'input', points: [{ x: 400, y: 250 }, { x: 600, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', null, { x: 300, y: 240 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('block');
    expect(updated.source.side).toBe('right');
    expect(updated.role).toBe('input');
  });
});

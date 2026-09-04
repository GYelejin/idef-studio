/**
 * ТЕСТ №369: Перепривязка стрелки: Бросок межблочной стрелки сверху внутрь блока (Управление)
 * 
 * Класс эквивалентности: RECON-13 (Drop Target Inside Block Inter Block Top)
 * Описание: Проверяет автоматическую привязку межблочной стрелки, исходящей выше блока, к верхней грани (Управление) при броске внутрь блока.
 * Предусловия:
 *   - Стрелка начинается выше блока цели.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой внутри блока 2.
 *   2. Проверить target.side === 'top'.
 * Ожидаемый результат: Стрелка автоматически привязана к верхнему порту Управления.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №369: Межблочный бросок в Управление RECON-13', () => {
  it('привязывает к верхней стороне блока при начале стрелки выше блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(500, 100, 'A1')!;
    const b2 = store.createBlock(400, 400, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 710, y: 150 } },
      target: { type: 'unattached', point: { x: 600, y: 300 } },
      role: 'output', points: [{ x: 710, y: 150 }, { x: 600, y: 300 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 500, y: 440 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('top');
  });
});

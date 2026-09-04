/**
 * ТЕСТ №401: Перепривязка стрелки: Бросок конца стрелки снизу внутрь блока (Механизм)
 * 
 * Класс эквивалентности: RECON-26 (Drop Target Inside Block Snaps To Bottom)
 * Описание: Проверяет автоматическую привязку цели к нижней грани блока (Механизм) при отпускании конца стрелки внутри блока, когда источник находится ниже блока.
 * Предусловия:
 *   - Стрелка с источником ниже целевого блока.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
 *   2. Проверить target.side === 'bottom' и role === 'mechanism'.
 * Ожидаемый результат: Стрелка привязана к нижней грани (Механизм).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №401: Бросок снизу в Механизм RECON-26', () => {
  it('привязывает к нижней грани блока при начале стрелки ниже блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(300, 500, 'A1')!;
    const b2 = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Механизм',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 510, y: 550 } },
      target: { type: 'unattached', point: { x: 400, y: 400 } },
      role: 'output', points: [{ x: 510, y: 550 }, { x: 400, y: 400 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 400, y: 240 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('bottom');
    expect(updated.role).toBe('mechanism');
  });
});

/**
 * ТЕСТ №366: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Механизма
 * 
 * Класс эквивалентности: RECON-10 (Drop Target Inside Block For Border Bottom)
 * Описание: Проверяет автоматическую привязку к нижней грани блока (Механизм) при отпускании конца стрелки с нижней границы внутри блока.
 * Предусловия:
 *   - Стрелка с нижней границы листа.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
 *   2. Проверить target.side === 'bottom' и role === 'mechanism'.
 * Ожидаемый результат: Стрелка автоматически привязана к нижнему порту Механизма.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №366: Бросок внутрь блока (Механизм) RECON-10', () => {
  it('автоматически привязывает к нижней грани блока при броске внутрь тела блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Механизм',
      source: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
      target: { type: 'unattached', point: { x: 400, y: 700 } },
      role: 'mechanism', points: [{ x: 400, y: 865 }, { x: 400, y: 700 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 400, y: 350 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('bottom');
    expect(updated.role).toBe('mechanism');
  });
});

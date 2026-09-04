/**
 * ТЕСТ №367: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Входа
 * 
 * Класс эквивалентности: RECON-11 (Drop Target Inside Block For Border Left)
 * Описание: Проверяет автоматическую привязку к левой грани блока (Вход) при броске конца стрелки с левой границы листа внутрь блока.
 * Предусловия:
 *   - Стрелка с левой границы листа.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
 *   2. Проверить target.side === 'left' и role === 'input'.
 * Ожидаемый результат: Стрелка автоматически привязана к левому порту Входа.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №367: Бросок внутрь блока (Вход) RECON-11', () => {
  it('автоматически привязывает к левой грани блока при броске внутрь тела блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 350 } },
      target: { type: 'unattached', point: { x: 150, y: 350 } },
      role: 'input', points: [{ x: 30, y: 350 }, { x: 150, y: 350 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 400, y: 350 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('left');
    expect(updated.role).toBe('input');
  });
});

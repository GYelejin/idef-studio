/**
 * ТЕСТ №365: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Управления
 * 
 * Класс эквивалентности: RECON-09 (Drop Target Inside Block For Border Top)
 * Описание: Проверяет автоматическую привязку к верхней грани блока (Управление) при отпускании конца стрелки, идущей с верхней границы листа, внутри прямоугольника блока.
 * Предусловия:
 *   - Стрелка с верхней границы листа.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с точкой отпускания внутри блока (400, 350).
 *   2. Проверить target.side === 'top' и role === 'control'.
 * Ожидаемый результат: Стрелка автоматически привязана к верхнему порту Управления.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №365: Бросок внутрь блока (Управление) RECON-09', () => {
  it('автоматически привязывает к верхней грани блока при броске внутрь тела блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'unattached', point: { x: 400, y: 150 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 150 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 400, y: 350 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('top');
    expect(updated.role).toBe('control');
  });
});

/**
 * ТЕСТ №373: Перепривязка стрелки: Синхронизация границы холста при выборе верхнего порта через ключ
 * 
 * Класс эквивалентности: RECON-17 (Set Endpoint Key Target Top Moves Border)
 * Описание: Проверяет автоматический перенос граничного источника стрелки на верхнюю границу листа (Y=40) при выборе цели 'block:b1:top' через инспектор.
 * Предусловия:
 *   - Граничная стрелка.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(state, a.id, 'target', 'block:b1:top').
 *   2. Проверить source.side === 'top' и source.point.y === 40.
 * Ожидаемый результат: Граница источника автоматически перенесена на верхнюю кромку листа.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №373: Перенос границы наверх через инспектор RECON-17', () => {
  it('переносит граничную точку источника наверх при привязке цели к top', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 350 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 350 } },
      role: 'input', points: [{ x: 30, y: 350 }, { x: 400, y: 350 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.setArrowEndpointKey(store.state, a.id, 'target', `block:${b.id}:top`);
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('top');
    expect(updated.source.point.y).toBe(40);
  });
});

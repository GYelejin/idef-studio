/**
 * ТЕСТ №374: Перепривязка стрелки: Синхронизация границы холста при выборе нижнего порта через ключ
 * 
 * Класс эквивалентности: RECON-18 (Set Endpoint Key Target Bottom Moves Border)
 * Описание: Проверяет автоматический перенос граничного источника на нижнюю границу (Y=865) при выборе цели 'block:b1:bottom' через инспектор.
 * Предусловия:
 *   - Граничная стрелка.
 * Действия:
 *   1. Вызвать setArrowEndpointKey для цели 'block:b1:bottom'.
 *   2. Проверить source.side === 'bottom'.
 * Ожидаемый результат: Граница источника перенесена на нижнюю кромку листа.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №374: Перенос границы вниз через инспектор RECON-18', () => {
  it('переносит граничную точку источника вниз при привязке цели к bottom', () => {
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

    const ok = ArrowEndpointOps.setArrowEndpointKey(store.state, a.id, 'target', `block:${b.id}:bottom`);
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('bottom');
    expect(updated.source.point.y).toBe(865);
  });
});

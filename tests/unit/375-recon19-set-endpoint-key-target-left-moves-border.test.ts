/**
 * ТЕСТ №375: Перепривязка стрелки: Синхронизация границы холста при выборе левого порта через ключ
 * 
 * Класс эквивалентности: RECON-19 (Set Endpoint Key Target Left Moves Border)
 * Описание: Проверяет перенос граничного источника на левую границу (X=30) при выборе цели 'block:b1:left' через инспектор.
 * Предусловия:
 *   - Граничная стрелка.
 * Действия:
 *   1. Вызвать setArrowEndpointKey для цели 'block:b1:left'.
 *   2. Проверить source.side === 'left'.
 * Ожидаемый результат: Граница источника перенесена на левую кромку листа.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №375: Перенос границы влево через инспектор RECON-19', () => {
  it('переносит граничную точку источника влево при привязке цели к left', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 300 } },
      role: 'control', points: [{ x: 500, y: 40 }, { x: 500, y: 300 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.setArrowEndpointKey(store.state, a.id, 'target', `block:${b.id}:left`);
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('left');
    expect(updated.source.point.x).toBe(30);
  });
});

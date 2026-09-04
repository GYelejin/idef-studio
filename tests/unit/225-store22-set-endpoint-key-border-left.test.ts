/**
 * ТЕСТ №225: Хранилище: Привязка стрелки к левой границе (border:left)
 * 
 * Класс эквивалентности: STORE-22 (Set Endpoint Key Border Left)
 * Описание: Проверяет переключение источника стрелки на левую границу холста.
 * Предусловия:
 *   - Стрелка между двумя блоками.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(a.id, 'source', 'border:left').
 *   2. Проверить source.side и source.type.
 * Ожидаемый результат: source.type === 'border', source.side === 'left'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №225: Привязка к левой границе STORE-22', () => {
  it('переключает источник стрелки на левую границу холста', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 250 } },
      role: 'output',
      points: [{ x: 310, y: 250 }, { x: 500, y: 250 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'source', 'border:left');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('left');
  });
});

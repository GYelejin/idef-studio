/**
 * ТЕСТ №155: Хранилище: Переключение эндпоинта на нижнюю границу (border:bottom)
 * 
 * Класс эквивалентности: STORE-13 (Set Endpoint Key Border Bottom)
 * Описание: Проверяет подключение источника стрелки к нижней границе листа.
 * Предусловия:
 *   - Стрелка направлена в нижнюю грань блока.
 * Действия:
 *   1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'border:bottom').
 *   2. Проверить эндпоинт.
 * Ожидаемый результат: arrow.source.side === 'bottom', arrow.source.type === 'border'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №155: Привязка к нижней границе STORE-13', () => {
  it('переключает источник стрелки на нижнюю границу', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Механизм',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'bottom', point: { x: 700, y: 330 } },
      role: 'mechanism',
      points: [{ x: 310, y: 265 }, { x: 700, y: 330 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'source', 'border:bottom');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('border');
    expect(updated.source.side).toBe('bottom');
  });
});

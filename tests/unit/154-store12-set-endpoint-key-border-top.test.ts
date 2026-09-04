/**
 * ТЕСТ №154: Хранилище: Переключение эндпоинта на верхнюю границу (border:top)
 * 
 * Класс эквивалентности: STORE-12 (Set Endpoint Key Border Top)
 * Описание: Проверяет подключение источника стрелки к верхней границе листа.
 * Предусловия:
 *   - Стрелка направлена в верхнюю грань блока.
 * Действия:
 *   1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'border:top').
 *   2. Проверить arrow.source.side и arrow.source.point.y.
 * Ожидаемый результат: arrow.source.side === 'top', arrow.source.point.y === 40.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №154: Привязка к верхней границе STORE-12', () => {
  it('переключает источник стрелки на верхнюю границу', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 700, y: 200 } },
      role: 'control',
      points: [{ x: 310, y: 265 }, { x: 700, y: 200 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'source', 'border:top');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('border');
    expect(updated.source.side).toBe('top');
  });
});

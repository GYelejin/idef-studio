/**
 * ТЕСТ №151: Хранилище: Открепление начала стрелки (setArrowEndpointKey 'unattached')
 * 
 * Класс эквивалентности: STORE-09 (Set Endpoint Key Unattached Source)
 * Описание: Проверяет преобразование начала стрелки в неподключенный эндпоинт типа 'unattached'.
 * Предусловия:
 *   - Стрелка между двумя блоками.
 * Действия:
 *   1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'unattached').
 *   2. Проверить arrow.source.type и pinned.
 * Ожидаемый результат: arrow.source.type === 'unattached', arrow.pinned === true.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №151: Открепление начала стрелки STORE-09', () => {
  it('преобразует начало стрелки в неподключенный эндпоинт', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 310, y: 265 }, { x: 600, y: 265 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'source', 'unattached');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('unattached');
    expect(updated.pinned).toBe(true);
  });
});

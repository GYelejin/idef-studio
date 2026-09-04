/**
 * ТЕСТ №152: Хранилище: Открепление конца стрелки (setArrowEndpointKey 'unattached')
 * 
 * Класс эквивалентности: STORE-10 (Set Endpoint Key Unattached Target)
 * Описание: Проверяет преобразование конца стрелки в неподключенный эндпоинт.
 * Предусловия:
 *   - Стрелка между двумя блоками.
 * Действия:
 *   1. Вызвать store.setArrowEndpointKey(a.id, 'target', 'unattached').
 *   2. Проверить arrow.target.type.
 * Ожидаемый результат: arrow.target.type === 'unattached'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №152: Открепление конца стрелки STORE-10', () => {
  it('преобразует конец стрелки в неподключенный эндпоинт', () => {
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
    const ok = store.setArrowEndpointKey(a.id, 'target', 'unattached');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.type).toBe('unattached');
  });
});

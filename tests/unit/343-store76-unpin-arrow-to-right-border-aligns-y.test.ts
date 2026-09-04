/**
 * ТЕСТ №343: Хранилище: Выравнивание Y целевой правой границы при сбросе фиксации
 * 
 * Класс эквивалентности: STORE-76 (Unpin Arrow To Right Border Aligns Y)
 * Описание: Проверяет выравнивание координаты Y целевой правой границы с координатой Y источника при вызове setArrowPinned(false).
 * Предусловия:
 *   - Стрелка с target: border right.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, false).
 *   2. Проверить target.point.y === source.point.y.
 * Ожидаемый результат: Координата Y цели выровнена по источнику.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №343: Автовыравнивание правого выхода STORE-76', () => {
  it('выравнивает Y целевой границы с портом выхода блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output', points: [{ x: 510, y: 250 }, { x: 1570, y: 400 }], pinned: true,
    })!;

    store.setArrowPinned(a.id, false);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.y).toBe(updated.source.point.y);
  });
});

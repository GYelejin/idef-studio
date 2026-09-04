/**
 * ТЕСТ №346: Хранилище: Спрямление стрелки к правой границе холста
 * 
 * Класс эквивалентности: STORE-79 (Straighten Arrow Right Border Aligns Y)
 * Описание: Проверяет выравнивание координаты Y целевой точки на правой границе холста по координате Y источника при вызове straightenArrow.
 * Предусловия:
 *   - Стрелка block right -> border right.
 * Действия:
 *   1. Вызвать store.straightenArrow(a.id).
 *   2. Проверить соосность Y.
 * Ожидаемый результат: Координата Y границы выровнена с портом блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №346: Спрямление к правой границе STORE-79', () => {
  it('выравнивает Y правой границы по порту блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 350 } },
      role: 'output', points: [{ x: 510, y: 250 }, { x: 1000, y: 250 }, { x: 1000, y: 350 }, { x: 1570, y: 350 }], pinned: true,
    })!;

    store.straightenArrow(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.y).toBe(updated.source.point.y);
  });
});

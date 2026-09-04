/**
 * ТЕСТ №310: Хранилище: Автовыравнивание граничной стрелки при откреплении (pinned: false)
 * 
 * Класс эквивалентности: STORE-61 (Unpin Boundary Arrow Resets Alignment)
 * Описание: Проверяет выравнивание координаты граничной точки со входом блока при вызове setArrowPinned(false).
 * Предусловия:
 *   - Граничная стрелка с source: border top и target: block top.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, false).
 *   2. Проверить совпадение X источника и цели.
 * Ожидаемый результат: Координата X граничной точки выровнена по порту блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №310: Автовыравнивание при откреплении STORE-61', () => {
  it('выравнивает граничный порт стрелки при сбросе фиксации', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 450, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 200 } },
      role: 'control', points: [{ x: 450, y: 40 }, { x: 400, y: 200 }], pinned: true,
    })!;

    store.setArrowPinned(a.id, false);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.point.x).toBe(updated.target.point.x);
  });
});

/**
 * ТЕСТ №84: Стрелки: Фиксация геометрии стрелки (setArrowPinned)
 * 
 * Класс эквивалентности: ARR-04 (Arrow Pinning State)
 * Описание: Проверяет фиксацию пользовательского маршрута флагом pinned.
 * Предусловия:
 *   - Стрелка создана с pinned: false.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, true).
 *   2. Проверить флаг pinned.
 * Ожидаемый результат: Флаг pinned установлен в true.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №84: Фиксация геометрии ARR-04', () => {
  it('устанавливает флаг pinned для фиксации маршрута', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    store.setArrowPinned(a.id, true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.pinned).toBe(true);
  });
});

/**
 * ТЕСТ №443: Хранилище: Автовыравнивание левой границы источника при снятии фиксации стрелки
 * 
 * Класс эквивалентности: STORE-92 (Set Arrow Unpinned Aligns Border Left Source Y)
 * Описание: Проверяет автоматическое выравнивание source.point.y по target.point.y при сбросе флага фиксации pinned в false для стрелки с левой границы листа.
 * Предусловия:
 *   - Зафиксированная стрелка с левой границы листа.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, false).
 *   2. Проверить source.point.y === target.point.y.
 * Ожидаемый результат: Координата границы Y автоматически выровнена по цели.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №443: Выравнивание границы Y при unpinned STORE-92', () => {
  it('выравнивает Y левой границы источника по цели при снятии фиксации', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(500, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 150 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 350 } },
      role: 'input', points: [{ x: 30, y: 150 }, { x: 200, y: 150 }, { x: 200, y: 350 }, { x: 500, y: 350 }],
      pinned: true,
    })!;

    store.setArrowPinned(a.id, false);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.point.y).toBe(updated.target.point.y);
  });
});

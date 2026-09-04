/**
 * ТЕСТ №444: Хранилище: Автовыравнивание верхней границы источника при снятии фиксации стрелки
 * 
 * Класс эквивалентности: STORE-93 (Set Arrow Unpinned Aligns Border Top Source X)
 * Описание: Проверяет автоматическое выравнивание source.point.x по target.point.x при сбросе pinned в false для стрелки с верхней границы листа.
 * Предусловия:
 *   - Зафиксированная стрелка Управления.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, false).
 *   2. Проверить source.point.x === target.point.x.
 * Ожидаемый результат: Координата границы X выровнена по целевому порту.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №444: Выравнивание границы X при unpinned STORE-93', () => {
  it('выравнивает X верхней границы источника по цели при снятии фиксации', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(500, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 150 }, { x: 600, y: 150 }, { x: 600, y: 300 }],
      pinned: true,
    })!;

    store.setArrowPinned(a.id, false);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.point.x).toBe(updated.target.point.x);
  });
});

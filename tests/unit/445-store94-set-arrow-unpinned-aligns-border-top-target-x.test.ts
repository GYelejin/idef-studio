/**
 * ТЕСТ №445: Хранилище: Автовыравнивание верхней границы цели при снятии фиксации стрелки
 * 
 * Класс эквивалентности: STORE-94 (Set Arrow Unpinned Aligns Border Top Target X)
 * Описание: Проверяет автоматическое выравнивание target.point.x по source.point.x при сбросе pinned в false для стрелки, уходящей на верхнюю границу листа.
 * Предусловия:
 *   - Зафиксированная стрелка к верхней границе.
 * Действия:
 *   1. Вызвать store.setArrowPinned(a.id, false).
 *   2. Проверить target.point.x === source.point.x.
 * Ожидаемый результат: Координата целевой границы X выровнена по источнику.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №445: Выравнивание цели X при unpinned STORE-94', () => {
  it('выравнивает X верхней границы цели по источнику при снятии фиксации', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 400, 'A1')!;

    const a = store.createArrow({
      label: 'Поток вверх',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 450 } },
      target: { type: 'border', side: 'top', point: { x: 700, y: 40 } },
      role: 'output', points: [{ x: 510, y: 450 }, { x: 700, y: 450 }, { x: 700, y: 40 }],
      pinned: true,
    })!;

    store.setArrowPinned(a.id, false);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.x).toBe(updated.source.point.x);
  });
});

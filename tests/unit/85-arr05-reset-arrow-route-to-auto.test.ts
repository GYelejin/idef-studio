/**
 * ТЕСТ №85: Стрелки: Сброс ручных изломов к автоматическому ортогональному маршруту
 * 
 * Класс эквивалентности: ARR-05 (Reset Arrow Route)
 * Описание: Проверяет сброс пользовательских изломов стрелки вызовом resetArrowRoute.
 * Предусловия:
 *   - Стрелка зафиксирована с ручным зигзагом (pinned: true).
 * Действия:
 *   1. Вызвать resetArrowRoute.
 *   2. Проверить pinned === false.
 * Ожидаемый результат: Флаг pinned сброшен, стрелка переведена в авто-режим.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №85: Сброс маршрута ARR-05', () => {
  it('сбрасывает ручной маршрут стрелки к авто-трассировке', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 200, y: 265 }, { x: 200, y: 350 }, { x: 400, y: 265 }],
      pinned: true,
    })!;
    store.resetArrowRoute(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.pinned).toBe(false);
  });
});

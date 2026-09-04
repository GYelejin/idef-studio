/**
 * ТЕСТ №09: Обратная связь по входу: Выход Блока 2 -> Вход Блока 1
 * 
 * Класс эквивалентности: F9 (Feedback Loop Output -> Input)
 * Описание: Проверяет построение обратной связи от выхода последующего блока к входу предшествующего блока.
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (600, 350).
 * Действия:
 *   1. Провести стрелку от выхода Блока 2 к левой грани Блока 1.
 *   2. Рассчитать огибающий маршрут.
 * Ожидаемый результат: Петля обратной связи корректно огибает блоки и заходит в левую грань Блока 1.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №09: Обратная связь F9', () => {
  it('строит обратную связь от выхода Блока 2 ко входу Блока 1', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(600, 350, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b2.id, side: "right", point: { x: b2.x + b2.width, y: b2.y + 65 } },
      { type: "block", id: b1.id, side: "left", point: { x: b1.x, y: b1.y + 65 } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F9-Feedback-Input',
      source: { type: 'block', id: b2.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b1.id, side: 'left', point: pts[pts.length - 1] },
      role: 'input',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('input');
    expect(pts.length).toBeGreaterThanOrEqual(4);
  });
});

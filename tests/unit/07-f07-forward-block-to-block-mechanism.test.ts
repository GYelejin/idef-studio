/**
 * ТЕСТ №07: Прямая межблочная связь: Выход Блока 1 -> Механизм Блока 2
 * 
 * Класс эквивалентности: F7 (Block Output -> Block Mechanism Forward)
 * Описание: Проверяет создание связи от выхода первого блока к нижней грани (механизму) второго блока.
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (550, 100).
 * Действия:
 *   1. Соединить правую грань Блока 1 с нижней гранью Блока 2.
 *   2. Построить ортогональный маршрут.
 * Ожидаемый результат: Стрелка создана с ролью 'mechanism', конечная сторона — 'bottom'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №07: Прямая связь F7', () => {
  it('соединяет выход Блока 1 с механизмом Блока 2', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(550, 100, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b1.id, side: "right", point: { x: b1.x + b1.width, y: b1.y + 65 } },
      { type: "block", id: b2.id, side: "bottom", point: { x: b2.x + 105, y: b2.y + b2.height } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F7-Forward-Mechanism',
      source: { type: 'block', id: b1.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b2.id, side: 'bottom', point: pts[pts.length - 1] },
      role: 'mechanism',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('mechanism');
    expect(a.target.side).toBe('bottom');
  });
});

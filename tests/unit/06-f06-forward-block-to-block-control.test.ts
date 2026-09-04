/**
 * ТЕСТ №06: Прямая межблочная связь: Выход Блока 1 -> Управление Блока 2
 * 
 * Класс эквивалентности: F6 (Block Output -> Block Control Forward)
 * Описание: Проверяет создание связи от выхода первого блока к верхней грани (управлению) второго блока.
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (550, 400).
 * Действия:
 *   1. Соединить правую грань Блока 1 с верхней гранью Блока 2.
 *   2. Построить ортогональный маршрут.
 * Ожидаемый результат: Стрелка успешно создана, роль равна 'control', конечная грань — 'top'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №06: Прямая связь F6', () => {
  it('соединяет выход Блока 1 с управлением Блока 2', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(550, 400, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b1.id, side: "right", point: { x: b1.x + b1.width, y: b1.y + 65 } },
      { type: "block", id: b2.id, side: "top", point: { x: b2.x + 105, y: b2.y } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F6-Forward-Control',
      source: { type: 'block', id: b1.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b2.id, side: 'top', point: pts[pts.length - 1] },
      role: 'control',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('control');
    expect(a.target.side).toBe('top');
  });
});

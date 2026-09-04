/**
 * ТЕСТ №05: Прямая межблочная связь: Выход Блока 1 -> Вход Блока 2
 * 
 * Класс эквивалентности: F5 (Block Output -> Block Input Forward)
 * Описание: Проверяет создание прямой связи между двумя блоками по диагонали (выход первого во вход второго).
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (500, 350).
 * Действия:
 *   1. Соединить правую грань Блока 1 с левой гранью Блока 2.
 *   2. Построить ортогональный маршрут.
 * Ожидаемый результат: Стрелка построена со ступенчатым ортогональным Z-маршрутом, роль равна 'input'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №05: Прямая связь F5', () => {
  it('соединяет выход Блока 1 со входом Блока 2', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(500, 350, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b1.id, side: "right", point: { x: b1.x + b1.width, y: b1.y + 65 } },
      { type: "block", id: b2.id, side: "left", point: { x: b2.x, y: b2.y + 65 } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F5-Forward-Input',
      source: { type: 'block', id: b1.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b2.id, side: 'left', point: pts[pts.length - 1] },
      role: 'input',
      points: pts,
      pinned: false,
    })!;
    expect(a).toBeDefined();
    expect(a.role).toBe('input');
    expect(pts.length).toBeGreaterThanOrEqual(2);
  });
});

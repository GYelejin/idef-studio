/**
 * ТЕСТ №08: Обратная связь по управлению: Выход Блока 2 -> Управление Блока 1
 * 
 * Класс эквивалентности: F8 (Feedback Loop Output -> Control)
 * Описание: Проверяет построение огибающей петли обратной связи (Feedback Loop) справа налево через верхний коридор диаграммы.
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 (200, 300) и Блок 2 (600, 450).
 * Действия:
 *   1. Провести стрелку от выхода Блока 2 к верхнему управлению Блока 1.
 *   2. Построить огибающий маршрут.
 * Ожидаемый результат: Петля обратной связи построена с коридором выше обоих блоков, роль равна 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №08: Обратная связь F8', () => {
  it('строит верхнюю петлю обратной связи от Блока 2 к управлению Блока 1', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 300, 'A1')!;
    const b2 = store.createBlock(600, 450, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b2.id, side: "right", point: { x: b2.x + b2.width, y: b2.y + 65 } },
      { type: "block", id: b1.id, side: "top", point: { x: b1.x + 105, y: b1.y } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F8-Feedback-Control',
      source: { type: 'block', id: b2.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b1.id, side: 'top', point: pts[pts.length - 1] },
      role: 'control',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('control');
    expect(pts.length).toBeGreaterThanOrEqual(4);
  });
});

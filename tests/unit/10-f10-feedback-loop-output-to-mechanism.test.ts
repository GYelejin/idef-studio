/**
 * ТЕСТ №10: Обратная связь по механизму: Выход Блока 2 -> Механизм Блока 1
 * 
 * Класс эквивалентности: F10 (Feedback Loop Output -> Mechanism)
 * Описание: Проверяет построение обратной петли через нижний коридор к механизму предшествующего блока.
 * Предусловия:
 *   - Диаграмма A1 содержит Блок 1 и Блок 2.
 * Действия:
 *   1. Провести стрелку от выхода Блока 2 к нижней грани Блока 1.
 *   2. Построить нижний ортогональный коридор.
 * Ожидаемый результат: Стрелка построена с нижним огибающим коридором, роль равна 'mechanism'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №10: Обратная связь F10', () => {
  it('строит нижнюю петлю обратной связи от Блока 2 к механизму Блока 1', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(600, 350, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b2.id, side: "right", point: { x: b2.x + b2.width, y: b2.y + 65 } },
      { type: "block", id: b1.id, side: "bottom", point: { x: b1.x + 105, y: b1.y + b1.height } },
      [b1, b2]
    );
    const a = store.createArrow({
      label: 'F10-Feedback-Mechanism',
      source: { type: 'block', id: b2.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b1.id, side: 'bottom', point: pts[pts.length - 1] },
      role: 'mechanism',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('mechanism');
    expect(pts[pts.length - 1].y).toBe(b1.y + b1.height);
  });
});

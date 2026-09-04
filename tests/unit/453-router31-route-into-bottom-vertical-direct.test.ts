/**
 * ТЕСТ №453: Трассировка: Прямой вертикальный ввод снизу в нижнюю грань блока
 * 
 * Класс эквивалентности: ROUTE-31 (Route Into Bottom Vertical Direct)
 * Описание: Проверяет построение прямого 2-точечного вертикального отрезка [pStart, (pStart.x, pEnd.y)] при соосности X (dX <= 10) и заходе снизу в нижний порт блока.
 * Предусловия:
 *   - Источник (400, 600), цель (402, 400) на грани side: 'bottom'.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Построен прямой 2-точечный вертикальный отрезок.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №453: Прямой вертикальный ввод снизу ROUTE-31', () => {
  it('строит 2-точечный вертикальный отрезок при заходе в нижнюю грань снизу', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 400, y: 600 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 402, y: 400 } }
    );
    expect(pts.length).toBe(2);
    expect(pts[1].x).toBe(400);
    expect(pts[1].y).toBe(400);
  });
});

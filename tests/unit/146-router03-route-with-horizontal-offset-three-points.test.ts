/**
 * ТЕСТ №146: Трассировка: Построение 3-точечного L-образного маршрута
 * 
 * Класс эквивалентности: ROUTE-03 (Route Three Point L-Shape)
 * Описание: Проверяет ортогональное соединение двух точек, смещенных по горизонтали и вертикали, через 1 угол (3 точки).
 * Предусловия:
 *   - Источник (Выход, x: 300, y: 200), приемник (Управление, x: 500, y: 300).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить ортогональность излома.
 * Ожидаемый результат: Построен L-образный маршрут с прямым углом.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №146: L-образный маршрут ROUTE-03', () => {
  it('строит ортогональный маршрут из 3 точек с одним прямым углом', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 300, y: 200 } },
      { type: 'block', id: 'b2', side: 'top', point: { x: 500, y: 300 } }
    );
    expect(pts.length).toBe(3);
    expect(pts[1].x).toBe(500);
    expect(pts[1].y).toBe(200);
  });
});

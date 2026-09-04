/**
 * ТЕСТ №147: Трассировка: Построение петли обратной связи (Feedback loop)
 * 
 * Класс эквивалентности: ROUTE-04 (Route Feedback Loop Around Blocks)
 * Описание: Проверяет построение обходного ортогонального маршрута для возврата потока справа налево.
 * Предусловия:
 *   - Источник справа (x: 700, y: 300), приемник слева (x: 200, y: 150).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить количество точек (>= 4).
 * Ожидаемый результат: Построен обходной маршрут обратной связи.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №147: Петля обратной связи ROUTE-04', () => {
  it('строит обходной ортогональный маршрут обратной связи', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b2', side: 'right', point: { x: 700, y: 300 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 200, y: 150 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
  });
});

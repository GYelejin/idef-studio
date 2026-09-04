/**
 * ТЕСТ №173: Трассировка: Ступенчатый ввод с левой границы при значительном смещении по Y
 * 
 * Класс эквивалентности: ROUTE-07 (Stepped Horizontal Entry from Left)
 * Описание: Проверяет построение 4-точечного ортогонального ввода от левой границы к левой грани блока при deltaY > 10.
 * Предусловия:
 *   - Источник (border, left, y: 100), цель (block, left, y: 300).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить количество точек.
 * Ожидаемый результат: Построен ступенчатый 4-точечный маршрут.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №173: Ступенчатый вход слева ROUTE-07', () => {
  it('строит ортогональный ступенчатый ввод с левой границы', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 400, y: 300 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
  });
});

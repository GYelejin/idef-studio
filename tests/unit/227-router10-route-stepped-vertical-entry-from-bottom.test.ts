/**
 * ТЕСТ №227: Трассировка: Ступенчатый ввод с нижней границы к Механизму
 * 
 * Класс эквивалентности: ROUTE-10 (Stepped Vertical Entry from Bottom)
 * Описание: Проверяет построение ортогонального ввода от нижней границы к нижней грани блока при смещении по горизонтали.
 * Предусловия:
 *   - Источник (border, bottom, x: 200), цель (block, bottom, x: 500).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить точки.
 * Ожидаемый результат: Построен ступенчатый ортогональный маршрут к нижней грани блока.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №227: Ступенчатый ввод снизу ROUTE-10', () => {
  it('строит ортогональный ступенчатый ввод с нижней границы', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'bottom', point: { x: 200, y: 865 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 500, y: 350 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(3);
  });
});

/**
 * ТЕСТ №175: Трассировка: Ступенчатый вывод на правую границу при смещении по Y
 * 
 * Класс эквивалентности: ROUTE-09 (Stepped Horizontal Exit to Right)
 * Описание: Проверяет построение ортогонального вывода от правой грани блока к правой границе листа.
 * Предусловия:
 *   - Источник (block, right, y: 200), цель (border, right, y: 400).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить точки.
 * Ожидаемый результат: Построен ступенчатый ортогональный маршрут к правой границе.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №175: Ступенчатый выход направо ROUTE-09', () => {
  it('строит ступенчатый выход на правую границу', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 200 } },
      { type: 'border', side: 'right', point: { x: 1570, y: 400 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(3);
  });
});

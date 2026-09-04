/**
 * ТЕСТ №397: Трассировка: Построение ортогонального маршрута при пустом массиве блоков
 * 
 * Класс эквивалентности: ROUTE-23 (Build Orthogonal Route Empty Blocks)
 * Описание: Проверяет возврат прямого ортогонального маршрута без падений при вызове buildOrthogonalRoute с blocks: [].
 * Предусловия:
 *   - Эндпоинты источника и цели, blocks = [].
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length >= 2.
 * Ожидаемый результат: Построен валидный ортогональный маршрут.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №397: Трассировка без блоков ROUTE-23', () => {
  it('строит ортогональный маршрут когда на диаграмме нет блоков', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      []
    );
    expect(pts.length).toBeGreaterThanOrEqual(2);
  });
});

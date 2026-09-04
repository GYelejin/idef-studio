/**
 * ТЕСТ №145: Трассировка: Построение ортогонального пути от нижней границы к Механизму
 * 
 * Класс эквивалентности: ROUTE-02 (Route Bottom Border to Block Mechanism)
 * Описание: Проверяет генерацию вертикальной трассы для стрелки механизма снизу.
 * Предусловия:
 *   - Начало на нижней границе, цель на нижней грани блока.
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить ориентацию звеньев.
 * Ожидаемый результат: Построен вертикальный маршрут к нижней грани блока.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №145: Трассировка Механизма снизу ROUTE-02', () => {
  it('строит вертикальный маршрут от нижней границы к нижней грани блока', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'bottom', point: { x: 500, y: 865 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 500, y: 350 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(2);
    expect(pts[0].x).toBe(500);
    expect(pts[pts.length - 1].x).toBe(500);
  });
});

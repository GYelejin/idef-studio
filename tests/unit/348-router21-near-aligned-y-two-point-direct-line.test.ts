/**
 * ТЕСТ №348: Трассировка: Построение прямого 2-точечного отрезка при малой несоосности по Y
 * 
 * Класс эквивалентности: ROUTE-21 (Near Aligned Y Two Point Line)
 * Описание: Проверяет схлопывание трассы в 2-точечный прямой отрезок, когда разница по оси Y между портом выхода и входа составляет менее 10px.
 * Предусловия:
 *   - Источник (200, 254), цель (500, 250) — разница 4px.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Построена прямая линия из 2 точек.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №348: Малая несоосность по Y ROUTE-21', () => {
  it('строит прямой 2-точечный отрезок при разнице по Y менее 10px', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 200, y: 254 } },
      { type: 'block', id: 'b2', side: 'left', point: { x: 500, y: 250 } }
    );
    expect(pts.length).toBe(2);
  });
});

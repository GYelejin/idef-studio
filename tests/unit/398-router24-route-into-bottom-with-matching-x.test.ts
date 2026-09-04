/**
 * ТЕСТ №398: Трассировка: Прямой 2-точечный вертикальный ввод в нижнюю грань
 * 
 * Класс эквивалентности: ROUTE-24 (Route Into Bottom With Matching X)
 * Описание: Проверяет построение строго вертикального 2-точечного отрезка при подключении в нижнюю грань блока снизу при соосности X (dX <= 10px, pStart.y > pEnd.y).
 * Предусловия:
 *   - Источник (500, 700), цель (502, 500) на нижней грани блока.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Построен прямой вертикальный отрезок из 2 точек.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №398: Прямой ввод в нижнюю грань ROUTE-24', () => {
  it('строит прямой 2-точечный отрезок при вертикальном вводе в нижнюю грань', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'border', side: 'bottom', point: { x: 500, y: 700 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 502, y: 500 } }
    );
    expect(pts.length).toBe(2);
  });
});

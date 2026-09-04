/**
 * ТЕСТ №434: Трассировка: 3-точечный заход ветви от узла в нижнюю грань снизу
 * 
 * Класс эквивалентности: ROUTE-29 (Route Into Bottom When Lower With DX)
 * Описание: Проверяет построение 3-точечного ортогонального пути [pStart, (pEnd.x, pStart.y), pEnd] при подключении ветви от узла снизу в нижнюю грань блока со смещением по горизонтали.
 * Предусловия:
 *   - Источник — узел ветвления (100, 500), цель на нижней грани блока (300, 400).
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 3.
 * Ожидаемый результат: Построен 3-точечный ортогональный маршрут.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №434: 3-точечный заход снизу ROUTE-29', () => {
  it('строит 3-точечный маршрут при заходе в нижнюю грань снизу со смещением', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 100, y: 500 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 300, y: 400 } }
    );
    expect(pts.length).toBe(3);
    expect(pts[1].x).toBe(300);
    expect(pts[1].y).toBe(500);
  });
});

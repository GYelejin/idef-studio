/**
 * ТЕСТ №256: Трассировка: 5-точечный обход от Выхода к Управлению при близких блоках
 * 
 * Класс эквивалентности: ROUTE-16 (Five-Point Detour Right to Top)
 * Описание: Проверяет построение 5-точечного обходного коридора, когда источник правее, но ниже цели.
 * Предусловия:
 *   - Источник (400, 200), цель (450, 205).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 5.
 * Ожидаемый результат: Построен 5-точечный обходной коридор над блоком.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №256: 5-точечный обход в Управление ROUTE-16', () => {
  it('строит 5-точечный обходной коридор при недостатке вертикального зазора', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 200 } },
      { type: 'block', id: 'b2', side: 'top', point: { x: 450, y: 205 } }
    );
    expect(pts.length).toBe(5);
  });
});

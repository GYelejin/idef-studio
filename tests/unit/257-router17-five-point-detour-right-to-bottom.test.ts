/**
 * ТЕСТ №257: Трассировка: 5-точечный обход от Выхода к Механизму при близких блоках
 * 
 * Класс эквивалентности: ROUTE-17 (Five-Point Detour Right to Bottom)
 * Описание: Проверяет построение 5-точечного обхода под блоками к Механизму.
 * Предусловия:
 *   - Источник (400, 300), цель (450, 295).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 5.
 * Ожидаемый результат: Построен 5-точечный обходной коридор под блоком.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №257: 5-точечный обход в Механизм ROUTE-17', () => {
  it('строит 5-точечный обходной коридор снизу', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 300 } },
      { type: 'block', id: 'b2', side: 'bottom', point: { x: 450, y: 295 } }
    );
    expect(pts.length).toBe(5);
  });
});

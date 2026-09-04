/**
 * ТЕСТ №349: Трассировка: Обходной коридор при вводе в правую сторону блока спереди
 * 
 * Класс эквивалентности: ROUTE-22 (Detour To Right Side Corridor)
 * Описание: Проверяет построение обходного коридора вокруг блока при подключении в его правую грань, когда источник расположен левее блока.
 * Предусловия:
 *   - Источник (200, 100), цель (500, 300) на правой грани.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length >= 4.
 * Ожидаемый результат: Построен обходной коридор.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №349: Обходной коридор в правую грань ROUTE-22', () => {
  it('строит обходную трассу при вводе в правую сторону блока спереди', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 200, y: 100 } },
      { type: 'block', id: 'b1', side: 'right', point: { x: 500, y: 300 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
  });
});

/**
 * ТЕСТ №254: Трассировка: Прямая 2-точечная вертикаль с нижней границы при соосности по X
 * 
 * Класс эквивалентности: ROUTE-14 (Direct 2-Point Entry Border Bottom)
 * Описание: Проверяет построение прямого 2-точечного ввода Механизма снизу при разнице X <= 10px.
 * Предусловия:
 *   - Источник (border, bottom, x: 450), цель (block, bottom, x: 455).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Возвращена прямая 2-точечная линия снизу.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №254: Прямой ввод снизу ROUTE-14', () => {
  it('строит прямую вертикальную линию снизу при соосности по X', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'bottom', point: { x: 450, y: 865 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 455, y: 500 } }
    );
    expect(pts.length).toBe(2);
  });
});

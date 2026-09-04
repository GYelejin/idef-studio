/**
 * ТЕСТ №253: Трассировка: Прямая 2-точечная вертикаль с верхней границы при соосности по X
 * 
 * Класс эквивалентности: ROUTE-13 (Direct 2-Point Entry Border Top)
 * Описание: Проверяет построение прямого 2-точечного спуска от верхней границы листа к блоку при разнице X <= 10px.
 * Предусловия:
 *   - Источник (border, top, x: 400), цель (block, top, x: 405).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Возвращена вертикальная 2-точечная линия.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №253: Прямой ввод сверху ROUTE-13', () => {
  it('строит прямую вертикальную линию сверху при соосности по X', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 405, y: 200 } }
    );
    expect(pts.length).toBe(2);
  });
});

/**
 * ТЕСТ №255: Трассировка: Прямой 2-точечный вывод на правую границу при соосности по Y
 * 
 * Класс эквивалентности: ROUTE-15 (Direct 2-Point Exit Block Right)
 * Описание: Проверяет построение прямой 2-точечной линии от Выхода блока на правую границу холста при Y <= 10px.
 * Предусловия:
 *   - Источник (block, right, y: 250), цель (border, right, y: 255).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Возвращен прямой горизонтальный 2-точечный отрезок.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №255: Прямой вывод направо ROUTE-15', () => {
  it('строит прямую горизонтальную линию выхода при соосности по Y', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 500, y: 250 } },
      { type: 'border', side: 'right', point: { x: 1570, y: 255 } }
    );
    expect(pts.length).toBe(2);
  });
});

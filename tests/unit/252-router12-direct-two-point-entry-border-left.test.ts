/**
 * ТЕСТ №252: Трассировка: Прямая 2-точечная линия с левой границы при соосности по Y
 * 
 * Класс эквивалентности: ROUTE-12 (Direct 2-Point Entry Border Left)
 * Описание: Проверяет построение прямой 2-точечной линии со Входа листа в блок при разнице Y <= 10px.
 * Предусловия:
 *   - Источник (border, left, y: 200), цель (block, left, y: 205).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Возвращен 2-точечный прямой отрезок.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №252: Прямой ввод слева ROUTE-12', () => {
  it('строит прямой 2-точечный отрезок при соосности с портом блока', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 300, y: 205 } }
    );
    expect(pts.length).toBe(2);
  });
});

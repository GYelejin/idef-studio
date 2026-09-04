/**
 * ТЕСТ №258: Трассировка: Прямой 2-точечный спуск от узла ветвления к Управлению
 * 
 * Класс эквивалентности: ROUTE-18 (Direct 2-Point Branch to Top)
 * Описание: Проверяет построение строго вертикального прямого спуска от узла ветвления к верхней грани блока.
 * Предусловия:
 *   - Узел ветвления соосен порту Управления по X.
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Возвращена 2-точечная вертикальная линия.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №258: Прямой спуск ветви в Управление ROUTE-18', () => {
  it('строит прямую вертикальную ветвь из 2 точек при соосности', () => {
    const pts = buildOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 500, y: 150 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 502, y: 300 } }
    );
    expect(pts.length).toBe(2);
  });
});

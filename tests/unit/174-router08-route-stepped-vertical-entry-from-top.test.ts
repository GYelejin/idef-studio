/**
 * ТЕСТ №174: Трассировка: Ступенчатый ввод с верхней границы при смещении по X
 * 
 * Класс эквивалентности: ROUTE-08 (Stepped Vertical Entry from Top)
 * Описание: Проверяет построение ортогональной трассы от верхней границы к верхней грани блока при смещении по горизонтали.
 * Предусловия:
 *   - Источник (border, top, x: 200), цель (block, top, x: 500).
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить звенья.
 * Ожидаемый результат: Сгенерирован ортогональный маршрут к верхней грани блока.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №174: Ступенчатый вход сверху ROUTE-08', () => {
  it('строит ортогональный ступенчатый ввод с верхней границы', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 500, y: 200 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(3);
  });
});

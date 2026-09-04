/**
 * ТЕСТ №144: Трассировка: Построение ортогонального пути от верхней границы к Управлению
 * 
 * Класс эквивалентности: ROUTE-01 (Route Top Border to Block Control)
 * Описание: Проверяет генерацию чистого вертикального отрезка для управляющего потока.
 * Предусловия:
 *   - Начало на верхней границе, цель на верхней грани блока на одной оси X.
 * Действия:
 *   1. Вызвать buildOrthogonalRoute.
 *   2. Проверить массив точек.
 * Ожидаемый результат: Сгенерирована строго вертикальная траектория.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №144: Трассировка Управления сверху ROUTE-01', () => {
  it('строит вертикальный маршрут от верхней границы к блоку', () => {
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'top', point: { x: 450, y: 40 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 450, y: 200 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(2);
    expect(pts[0].x).toBe(450);
    expect(pts[pts.length - 1].x).toBe(450);
  });
});

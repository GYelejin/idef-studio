/**
 * ТЕСТ №435: Трассировка: Прямой 2-точечный горизонтальный ввод во входную грань
 * 
 * Класс эквивалентности: ROUTE-30 (Route Into Left Side Small DY)
 * Описание: Проверяет построение строго горизонтального 2-точечного пути при подключении в левую грань блока (Вход) при практически равной высоте (dY <= 10).
 * Предусловия:
 *   - Источник (100, 200), цель (300, 204) на левой грани блока.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 2 и Y === pStart.y.
 * Ожидаемый результат: Построен прямой 2-точечный горизонтальный отрезок.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №435: Прямой ввод во Вход ROUTE-30', () => {
  it('строит прямой 2-точечный ввод при малой разнице по Y', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 100, y: 200 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 300, y: 204 } }
    );
    expect(pts.length).toBe(2);
    expect(pts[1].x).toBe(300);
    expect(pts[1].y).toBe(200);
  });
});

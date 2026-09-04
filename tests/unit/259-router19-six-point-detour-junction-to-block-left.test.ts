/**
 * ТЕСТ №259: Трассировка: 6-точечный обходной маршрут от узла ко Входу блока позади
 * 
 * Класс эквивалентности: ROUTE-19 (Six-Point Detour Junction to Block Left)
 * Описание: Проверяет построение обходного коридора из 6 точек, когда узел ветвления расположен правее и выше целевого входа блока.
 * Предусловия:
 *   - Узел (600, 200), блок-вход (300, 350).
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить points.length === 6.
 * Ожидаемый результат: Построена ортогональная петля обхода из 6 точек.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №259: 6-точечный обход ветви ROUTE-19', () => {
  it('строит 6-точечный обходной маршрут при обратном направлении ветви', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 600, y: 200 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 300, y: 350 } }
    );
    expect(pts.length).toBe(6);
  });
});

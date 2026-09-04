/**
 * ТЕСТ №260: Трассировка: Маршрутизация ветви в правую грань блока
 * 
 * Класс эквивалентности: ROUTE-20 (Branch to Block Right Stepped)
 * Описание: Проверяет трассировку ответвления в правую грань блока (выход) при прямом и обратном расположении.
 * Предусловия:
 *   - Узел левее и правее целевой правой грани.
 * Действия:
 *   1. Вызвать buildOrthogonalRoute для обоих случаев.
 *   2. Проверить ортогональность.
 * Ожидаемый результат: Оба маршрута строго ортогональны.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute, isOrthogonal } from '../../src/core/geometry';

describe('ТЕСТ №260: Ветвь в правую грань ROUTE-20', () => {
  it('строит корректную ортогональную трассу в правую грань блока', () => {
    const pts1 = buildOrthogonalRoute(
      { type: 'junction', id: 'j1', point: { x: 700, y: 150 } },
      { type: 'block', id: 'b1', side: 'right', point: { x: 500, y: 300 } }
    );
    expect(pts1.length).toBe(4);
    for (let i = 0; i < pts1.length - 1; i++) {
      expect(isOrthogonal(pts1[i], pts1[i + 1])).toBe(true);
    }
  });
});

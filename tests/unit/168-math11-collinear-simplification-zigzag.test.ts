/**
 * ТЕСТ №168: Математика: Устранение избыточных промежуточных точек на вертикали
 * 
 * Класс эквивалентности: MATH-11 (Collinear Simplification Vertical)
 * Описание: Проверяет объединение цепочки вертикальных точек (200, 100) -> (200, 200) -> (200, 300) в 2 точки.
 * Предусловия:
 *   - Массив из 3 коллинеарных точек.
 * Действия:
 *   1. Вызвать simplifyCollinear.
 *   2. Проверить длину результата.
 * Ожидаемый результат: Результат содержит ровно 2 граничные точки.
 */

import { describe, it, expect } from 'bun:test';
import { simplifyCollinear } from '../../src/core/geometry/math';

describe('ТЕСТ №168: Схлопывание вертикальных точек MATH-11', () => {
  it('удаляет промежуточную точку на вертикальной линии', () => {
    const pts = [{ x: 200, y: 100 }, { x: 200, y: 200 }, { x: 200, y: 300 }];
    const simplified = simplifyCollinear(pts);
    expect(simplified.length).toBe(2);
    expect(simplified[0]).toEqual({ x: 200, y: 100 });
    expect(simplified[1]).toEqual({ x: 200, y: 300 });
  });
});

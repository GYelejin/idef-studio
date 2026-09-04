/**
 * ТЕСТ №120: Математика: Слияние избыточных коллинеарных точек (simplifyCollinear)
 * 
 * Класс эквивалентности: MATH-02 (Collinear Point Simplification)
 * Описание: Проверяет удаление лишних промежуточных точек на одной прямой линии.
 * Предусловия:
 *   - Линия из 4 последовательных горизонтальных точек на Y=100.
 * Действия:
 *   1. Вызвать simplifyCollinear.
 *   2. Проверить длину массива точек.
 * Ожидаемый результат: Точки слиты в один отрезок из 2 граничных точек.
 */

import { describe, it, expect } from 'bun:test';
import { simplifyCollinear } from '../../src/core/geometry';

describe('ТЕСТ №120: Слияние коллинеарных точек MATH-02', () => {
  it('удаляет избыточные точки на одной прямой', () => {
    const pts = [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }, { x: 400, y: 100 }];
    const simplified = simplifyCollinear(pts);
    expect(simplified.length).toBe(2);
    expect(simplified[0].x).toBe(100);
    expect(simplified[1].x).toBe(400);
  });
});

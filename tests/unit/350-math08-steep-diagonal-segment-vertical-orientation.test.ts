/**
 * ТЕСТ №350: Математика: Определение вертикальной ориентации для крутого диагонального отрезка
 * 
 * Класс эквивалентности: MATH-08 (Steep Diagonal Vertical Orientation)
 * Описание: Проверяет присвоение orientation: 'vertical' отрезку, у которого приращение по Y строго больше приращения по X (dy > dx).
 * Предусловия:
 *   - Отрезок от (100, 100) до (102, 180) (dx=2, dy=80).
 * Действия:
 *   1. Вызвать getSegmentsFromPoints.
 *   2. Проверить segs[0].orientation === 'vertical'.
 * Ожидаемый результат: Сегменту присвоена вертикальная ориентация.
 */

import { describe, it, expect } from 'bun:test';
import { getSegmentsFromPoints } from '../../src/core/geometry/math';

describe('ТЕСТ №350: Крутой отрезок MATH-08', () => {
  it('присваивает вертикальную ориентацию отрезку при dy > dx', () => {
    const segs = getSegmentsFromPoints([{ x: 100, y: 100 }, { x: 102, y: 180 }]);
    expect(segs.length).toBe(1);
    expect(segs[0].orientation).toBe('vertical');
  });
});

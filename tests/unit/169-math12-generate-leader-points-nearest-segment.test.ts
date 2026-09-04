/**
 * ТЕСТ №169: Математика: Построение точек выноски к ближайшему звену стрелки
 * 
 * Класс эквивалентности: MATH-12 (Generate Leader Points Nearest Segment)
 * Описание: Проверяет генерацию точек выноски от текста к проекции на стрелке.
 * Предусловия:
 *   - Стрелка из 2 точек, подпись в стороне.
 * Действия:
 *   1. Вызвать generateLeaderPoints.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен массив точек, оканчивающийся на линии стрелки Y=200.
 */

import { describe, it, expect } from 'bun:test';
import { generateLeaderPoints } from '../../src/core/geometry/math';

describe('ТЕСТ №169: Генерация точек выноски MATH-12', () => {
  it('строит выноску от текста к проекции на стрелке', () => {
    const arrowPoints = [{ x: 100, y: 200 }, { x: 500, y: 200 }];
    const leader = generateLeaderPoints({ x: 300, y: 350 }, arrowPoints);
    expect(leader.length).toBeGreaterThanOrEqual(2);
    expect(leader[leader.length - 1].y).toBe(200);
  });
});

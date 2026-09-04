/**
 * ТЕСТ №149: Пересечения: Запрет коллинеарного наложения двух отрезков
 * 
 * Класс эквивалентности: INTER-02 (Collinear Segment Overlap Detection)
 * Описание: Проверяет запрет наложения двух параллельных отрезков стрелок на одной прямой.
 * Предусловия:
 *   - Два частично перекрывающихся горизонтальных отрезка на Y=200.
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить isAllowed.
 * Ожидаемый результат: Наложение отклонено как недопустимое (isAllowed: false, type: 'collinear').
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';

describe('ТЕСТ №149: Коллинеарное наложение отрезков INTER-02', () => {
  it('запрещает частичное или полное наложение параллельных отрезков', () => {
    const s1 = { start: { x: 100, y: 200 }, end: { x: 300, y: 200 }, orientation: 'horizontal' as const, arrowId: 'a1' };
    const s2 = { start: { x: 200, y: 200 }, end: { x: 400, y: 200 }, orientation: 'horizontal' as const, arrowId: 'a2' };
    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(false);
  });
});

/**
 * ТЕСТ №321: Пересечения: Детекция недопустимого нахлеста горизонтальных звеньев
 * 
 * Класс эквивалентности: INTER-09 (Collinear Horizontal Overlap Detected)
 * Описание: Проверяет обнаружение ошибки коллинеарного наложения двух независимых горизонтальных стрелок на одной высоте Y.
 * Предусловия:
 *   - Два отрезка на Y=200: (100, 200)-(400, 200) и (300, 200)-(600, 200).
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить результат.
 * Ожидаемый результат: hasIntersection === true, isAllowed === false, type === 'overlap'.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Segment } from '../../src/types/idef0';

describe('ТЕСТ №321: Горизонтальный нахлест INTER-09', () => {
  it('выявляет недопустимое коллинеарное наложение двух независимых горизонталей', () => {
    const s1: Segment = {
      id: 's1', arrowId: 'a1', orientation: 'horizontal',
      start: { x: 100, y: 200 }, end: { x: 400, y: 200 },
    };
    const s2: Segment = {
      id: 's2', arrowId: 'a2', orientation: 'horizontal',
      start: { x: 300, y: 200 }, end: { x: 600, y: 200 },
    };

    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(false);
    expect(res.type).toBe('overlap');
  });
});

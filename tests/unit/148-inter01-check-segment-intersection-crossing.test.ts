/**
 * ТЕСТ №148: Пересечения: Обнаружение перпендикулярного пересечения отрезков
 * 
 * Класс эквивалентности: INTER-01 (Perpendicular Segment Crossing)
 * Описание: Проверяет обнаружение допустимого прямого крестообразного пересечения двух стрелок.
 * Предусловия:
 *   - Горизонтальный отрезок (100, 200) -> (400, 200) и вертикальный (250, 100) -> (250, 300).
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить hasIntersection и isAllowed.
 * Ожидаемый результат: Пересечение зафиксировано как допустимое (isAllowed: true, type: 'perpendicular').
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';

describe('ТЕСТ №148: Перпендикулярное пересечение INTER-01', () => {
  it('фиксирует допустимое перпендикулярное пересечение двух стрелок', () => {
    const s1 = { start: { x: 100, y: 200 }, end: { x: 400, y: 200 }, orientation: 'horizontal' as const, arrowId: 'a1' };
    const s2 = { start: { x: 250, y: 100 }, end: { x: 250, y: 300 }, orientation: 'vertical' as const, arrowId: 'a2' };
    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(true);
  });
});

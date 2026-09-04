/**
 * ТЕСТ №234: Коллизии: Разрешение смежных сегментов одной и той же стрелки
 * 
 * Класс эквивалентности: INTER-04 (Adjacent Segments Same Arrow Allowed)
 * Описание: Проверяет, что стык двух смежных сегментов в одной стрелке всегда считается допустимым.
 * Предусловия:
 *   - Два звена одной стрелки стыкуются в точке (200, 200).
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить isAllowed.
 * Ожидаемый результат: isAllowed === true, hasIntersection === false.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';

describe('ТЕСТ №234: Смежные звенья стрелки INTER-04', () => {
  it('разрешает соединение звеньев внутри одной стрелки', () => {
    const seg1 = { start: { x: 100, y: 200 }, end: { x: 200, y: 200 }, orientation: 'horizontal' as const, arrowId: 'a1' };
    const seg2 = { start: { x: 200, y: 200 }, end: { x: 200, y: 300 }, orientation: 'vertical' as const, arrowId: 'a1' };
    const res = checkSegmentIntersection(seg1, seg2, []);
    expect(res.isAllowed).toBe(true);
    expect(res.hasIntersection).toBe(false);
  });
});

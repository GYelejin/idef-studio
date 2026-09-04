/**
 * ТЕСТ №238: Коллизии: Обнаружение запрещенного наложения несвязанных вертикалей
 * 
 * Класс эквивалентности: INTER-08 (Vertical Collinear Overlap Error)
 * Описание: Проверяет фиксацию ошибки коллизии при частичном перекрытии двух независимых вертикальных линий.
 * Предусловия:
 *   - Две независимые стрелки имеют наложение по X=250.
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить res.type и isAllowed.
 * Ожидаемый результат: res.isAllowed === false, res.type === 'overlap'.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';

describe('ТЕСТ №238: Недопустимый нахлест вертикалей INTER-08', () => {
  it('выявляет недопустимое коллинеарное наложение вертикалей', () => {
    const seg1 = { start: { x: 250, y: 100 }, end: { x: 250, y: 300 }, orientation: 'vertical' as const, arrowId: 'a1' };
    const seg2 = { start: { x: 250, y: 200 }, end: { x: 250, y: 400 }, orientation: 'vertical' as const, arrowId: 'a2' };
    const res = checkSegmentIntersection(seg1, seg2, []);
    expect(res.isAllowed).toBe(false);
    expect(res.type).toBe('overlap');
  });
});

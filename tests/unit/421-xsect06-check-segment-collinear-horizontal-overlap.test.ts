/**
 * ТЕСТ №421: Пересечения: Фиксация коллинеарного наложения горизонтальных отрезков
 * 
 * Класс эквивалентности: XSECT-06 (Check Segment Collinear Horizontal Overlap)
 * Описание: Проверяет обнаружение недопустимого коллинеарного наложения двух независимых горизонтальных сегментов стрелок на одной высоте Y при перекрытии диапазона X.
 * Предусловия:
 *   - Два отрезка на Y=200 с перекрывающимся диапазоном X (100..400 и 250..500).
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить hasIntersection: true, isAllowed: false, type: 'overlap'.
 * Ожидаемый результат: Зафиксировано коллинеарное наложение сегментов.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { ArrowSegment } from '../../src/types/idef0';

describe('ТЕСТ №421: Коллинеарное наложение XSECT-06', () => {
  it('обнаруживает наложение горизонтальных отрезков на одной высоте', () => {
    const s1: ArrowSegment = { arrowId: 'a1', start: { x: 100, y: 200 }, end: { x: 400, y: 200 }, orientation: 'horizontal' };
    const s2: ArrowSegment = { arrowId: 'a2', start: { x: 250, y: 200 }, end: { x: 500, y: 200 }, orientation: 'horizontal' };

    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(false);
    expect(res.type).toBe('overlap');
  });
});

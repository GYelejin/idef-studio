/**
 * ТЕСТ №396: Математика: Вертикальная ориентация вырожденного сегмента при контакте сверху
 * 
 * Класс эквивалентности: MATH-12 (Zero Length Segment Source Side Top)
 * Описание: Проверяет присвоение вертикальной ориентации (orientation: 'vertical') отрезку нулевой длины (dx=0, dy=0), начинающемуся на верхней грани блока (sourceSide: 'top').
 * Предусловия:
 *   - Две совпадающие точки.
 * Действия:
 *   1. Вызвать getSegmentsFromPoints с sourceSide: 'top'.
 *   2. Проверить orientation первого сегмента.
 * Ожидаемый результат: Ориентация определена как 'vertical'.
 */

import { describe, it, expect } from 'bun:test';
import { getSegmentsFromPoints } from '../../src/core/geometry/math';

describe('ТЕСТ №396: Вырожденный сегмент сверху MATH-12', () => {
  it('присваивает вертикальную ориентацию вырожденному сегменту сверху', () => {
    const segs = getSegmentsFromPoints([{ x: 200, y: 200 }, { x: 200, y: 200 }], 'arrow-1', 'top');
    expect(segs.length).toBe(1);
    expect(segs[0].orientation).toBe('vertical');
  });
});

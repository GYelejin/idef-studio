/**
 * ТЕСТ №236: Коллизии: Разрешение наложения параллельных звеньев в связке ствол-ветвь
 * 
 * Класс эквивалентности: INTER-06 (Horizontal Shared Branch Allowed)
 * Описание: Проверяет отсутствие ложной ошибки коллизии при совпадении горизонтальных звеньев ствола и его дочерней ветви.
 * Предусловия:
 *   - Узел ветвления связывает ствол a1 и ветвь a2.
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить res.isAllowed.
 * Ожидаемый результат: res.isAllowed === true.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Junction } from '../../src/types/idef0';

describe('ТЕСТ №236: Ствол и ветвь по горизонтали INTER-06', () => {
  it('разрешает наложение звеньев при наличии отношения ветвления', () => {
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 200, y: 100 }, parentArrowId: 'a1', childArrowIds: ['a2'] };
    const seg1 = { start: { x: 100, y: 100 }, end: { x: 300, y: 100 }, orientation: 'horizontal' as const, arrowId: 'a1' };
    const seg2 = { start: { x: 150, y: 100 }, end: { x: 250, y: 100 }, orientation: 'horizontal' as const, arrowId: 'a2' };
    const res = checkSegmentIntersection(seg1, seg2, [junc]);
    expect(res.isAllowed).toBe(true);
  });
});

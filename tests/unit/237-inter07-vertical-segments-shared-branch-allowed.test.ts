/**
 * ТЕСТ №237: Коллизии: Разрешение наложения вертикальных звеньев ствола и ветви
 * 
 * Класс эквивалентности: INTER-07 (Vertical Shared Branch Allowed)
 * Описание: Проверяет отсутствие ложного срабатывания коллизии при совпадении вертикальных звеньев связанных стрелок.
 * Предусловия:
 *   - Узел ветвления связывает вертикальные звенья.
 * Действия:
 *   1. Вызвать checkSegmentIntersection.
 *   2. Проверить res.isAllowed.
 * Ожидаемый результат: res.isAllowed === true.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Junction } from '../../src/types/idef0';

describe('ТЕСТ №237: Ствол и ветвь по вертикали INTER-07', () => {
  it('разрешает вертикальное наложение при связи через узел', () => {
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 150, y: 200 }, parentArrowId: 'a1', childArrowIds: ['a2'] };
    const seg1 = { start: { x: 150, y: 100 }, end: { x: 150, y: 400 }, orientation: 'vertical' as const, arrowId: 'a1' };
    const seg2 = { start: { x: 150, y: 200 }, end: { x: 150, y: 350 }, orientation: 'vertical' as const, arrowId: 'a2' };
    const res = checkSegmentIntersection(seg1, seg2, [junc]);
    expect(res.isAllowed).toBe(true);
  });
});

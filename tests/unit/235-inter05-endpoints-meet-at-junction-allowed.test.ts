/**
 * ТЕСТ №235: Коллизии: Разрешение пересечения в точке зарегистрированного узла
 * 
 * Класс эквивалентности: INTER-05 (Endpoints Meet at Junction Allowed)
 * Описание: Проверяет, что совпадение концов стрелок в точке узла ветвления/слияния считается легитимным.
 * Предусловия:
 *   - Две разные стрелки сходятся в точке узла (300, 150).
 * Действия:
 *   1. Вызвать checkSegmentIntersection с передачей junctions.
 *   2. Проверить res.isAllowed.
 * Ожидаемый результат: res.isAllowed === true, res.hasIntersection === true.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Junction } from '../../src/types/idef0';

describe('ТЕСТ №235: Стык в зарегистрированном узле INTER-05', () => {
  it('разрешает пересечение в координатах зарегистрированного узла', () => {
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 300, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const seg1 = { start: { x: 100, y: 150 }, end: { x: 300, y: 150 }, orientation: 'horizontal' as const, arrowId: 'trunk' };
    const seg2 = { start: { x: 300, y: 150 }, end: { x: 300, y: 300 }, orientation: 'vertical' as const, arrowId: 'branch' };
    const res = checkSegmentIntersection(seg1, seg2, [junc]);
    expect(res.isAllowed).toBe(true);
  });
});

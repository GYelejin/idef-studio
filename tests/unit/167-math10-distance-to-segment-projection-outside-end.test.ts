/**
 * ТЕСТ №167: Математика: Дистанция до проекции вне конца отрезка
 * 
 * Класс эквивалентности: MATH-10 (Distance to Segment Outside End)
 * Описание: Проверяет дистанцию от точки за пределами конца отрезка.
 * Предусловия:
 *   - Отрезок (100, 100) -> (300, 100), точка (350, 100).
 * Действия:
 *   1. Вызвать distanceToSegment.
 *   2. Проверить proj.
 * Ожидаемый результат: dist === 50, proj.x === 300.
 */

import { describe, it, expect } from 'bun:test';
import { distanceToSegment } from '../../src/core/geometry/math';

describe('ТЕСТ №167: Проекция правее конца отрезка MATH-10', () => {
  it('ограничивает проекцию концом отрезка', () => {
    const seg = { start: { x: 100, y: 100 }, end: { x: 300, y: 100 }, orientation: 'horizontal' as const };
    const { dist, proj } = distanceToSegment({ x: 350, y: 100 }, seg);
    expect(dist).toBe(50);
    expect(proj.x).toBe(300);
  });
});

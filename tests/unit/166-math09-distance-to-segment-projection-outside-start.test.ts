/**
 * ТЕСТ №166: Математика: Дистанция до проекции вне начала отрезка
 * 
 * Класс эквивалентности: MATH-09 (Distance to Segment Outside Start)
 * Описание: Проверяет дистанцию от внешней точки до начала отрезка.
 * Предусловия:
 *   - Отрезок (100, 100) -> (300, 100), точка (50, 100).
 * Действия:
 *   1. Вызвать distanceToSegment.
 *   2. Проверить dist и proj.
 * Ожидаемый результат: dist === 50, proj.x === 100, proj.y === 100.
 */

import { describe, it, expect } from 'bun:test';
import { distanceToSegment } from '../../src/core/geometry/math';

describe('ТЕСТ №166: Проекция левее начала отрезка MATH-09', () => {
  it('ограничивает проекцию началом отрезка', () => {
    const seg = { start: { x: 100, y: 100 }, end: { x: 300, y: 100 }, orientation: 'horizontal' as const };
    const { dist, proj } = distanceToSegment({ x: 50, y: 100 }, seg);
    expect(dist).toBe(50);
    expect(proj.x).toBe(100);
    expect(proj.y).toBe(100);
  });
});

/**
 * ТЕСТ №119: Математика: Расчет расстояния и проекции точки на отрезок
 * 
 * Класс эквивалентности: MATH-01 (Distance to Segment Projection)
 * Описание: Проверяет вычисление дистанции и ортогональной проекции точки на горизонтальный и вертикальный отрезок.
 * Предусловия:
 *   - Отрезок от (100, 100) до (400, 100).
 * Действия:
 *   1. Задать точку (200, 150).
 *   2. Вызвать distanceToSegment.
 * Ожидаемый результат: Дистанция равна 50, проекция строго в точке (200, 100).
 */

import { describe, it, expect } from 'bun:test';
import { distanceToSegment } from '../../src/core/geometry';

describe('ТЕСТ №119: Проекция точки на отрезок MATH-01', () => {
  it('точно рассчитывает дистанцию и точку проекции', () => {
    const seg = { start: { x: 100, y: 100 }, end: { x: 400, y: 100 }, orientation: 'horizontal' as const };
    const { dist, proj } = distanceToSegment({ x: 200, y: 150 }, seg);
    expect(dist).toBe(50);
    expect(proj.x).toBe(200);
    expect(proj.y).toBe(100);
  });
});

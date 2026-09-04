/**
 * ТЕСТ №426: Математика: Прямой шаг L curr без скругления при развороте потока на 180 градусов
 * 
 * Класс эквивалентности: MATH-13 (Points To SVG Path Collinear U-Turn Without Arc)
 * Описание: Проверяет генерацию прямого шага L curr.x,curr.y без дуги при развороте вектора сегмента на 180 градусов (коллинеарный разворот, dot < 0, cross < 0.001).
 * Предусловия:
 *   - Три точки с разворотом: (0, 0), (100, 0), (50, 0).
 * Действия:
 *   1. Вызвать pointsToSvgPath.
 *   2. Проверить результат.
 * Ожидаемый результат: Сгенерирован прямой шаг 'L 100,0' без дуги 'A'.
 */

import { describe, it, expect } from 'bun:test';
import { pointsToSvgPath } from '../../src/core/geometry/math';

describe('ТЕСТ №426: Коллинеарный разворот без скругления MATH-13', () => {
  it('строит прямой шаг L без скругления при коллинеарном развороте', () => {
    const pts = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 0 }];
    const path = pointsToSvgPath(pts);
    expect(path).toContain('L 100,0');
    expect(path).toContain('L 50,0');
    expect(path).not.toContain(' A ');
  });
});

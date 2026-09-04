/**
 * ТЕСТ №40: Геометрия: Разрешение перпендикулярного пересечения стрелок
 * 
 * Класс эквивалентности: GEOM-05 (Perpendicular Crossing Standard)
 * Описание: Проверяет соответствие стандарту IDEF0: прямое перпендикулярное пересечение двух стрелок под 90 градусов является валидным.
 * Предусловия:
 *   - Горизонтальная стрелка пересекает вертикальную стрелку под прямым углом.
 * Действия:
 *   1. Проверить обнаружение пересечения.
 *   2. Убедиться, что пересечение не трактуется как коллинеарная ошибка.
 * Ожидаемый результат: Перпендикулярное пересечение разрешено стандартом IDEF0.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Segment } from '../../src/types/idef0';

describe('ТЕСТ №40: Перпендикулярное пересечение GEOM-05', () => {
  it('фиксирует разрешенное пересечение двух ортогональных отрезков', () => {
    const s1: Segment = { start: { x: 100, y: 200 }, end: { x: 500, y: 200 }, orientation: 'horizontal' };
    const s2: Segment = { start: { x: 300, y: 50 }, end: { x: 300, y: 400 }, orientation: 'vertical' };
    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(true);
  });
});

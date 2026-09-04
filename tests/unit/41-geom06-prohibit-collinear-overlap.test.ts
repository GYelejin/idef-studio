/**
 * ТЕСТ №41: Геометрия: Запрет коллинеарного наложения стрелок
 * 
 * Класс эквивалентности: GEOM-06 (Collinear Overlap Prohibited)
 * Описание: Проверяет выявление недопустимого параллельного перекрытия сегментов разных стрелок на одной прямой.
 * Предусловия:
 *   - Два параллельных горизонтальных сегмента лежат на одной координате Y и пересекаются по X.
 * Действия:
 *   1. Проверить факт коллинеарного перекрытия между отрезками [100..400] и [200..500].
 *   2. Убедиться в фиксации коллинеарности.
 * Ожидаемый результат: Коллинеарное наложение зафиксировано для предотвращения слияния линий.
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentIntersection } from '../../src/core/intersections';
import { Segment } from '../../src/types/idef0';

describe('ТЕСТ №41: Коллинеарное наложение GEOM-06', () => {
  it('обнаруживает запрещенное параллельное перекрытие на одной линии', () => {
    const s1: Segment = { start: { x: 100, y: 200 }, end: { x: 400, y: 200 }, orientation: 'horizontal' };
    const s2: Segment = { start: { x: 300, y: 200 }, end: { x: 600, y: 200 }, orientation: 'horizontal' };
    const res = checkSegmentIntersection(s1, s2, []);
    expect(res.hasIntersection).toBe(true);
    expect(res.isAllowed).toBe(false);
    expect(res.type).toBe('overlap');
  });
});

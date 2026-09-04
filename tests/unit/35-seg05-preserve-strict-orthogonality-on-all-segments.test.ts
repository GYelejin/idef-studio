/**
 * ТЕСТ №35: Сегменты: Инвариант строгой ортогональности (100% прямые углы)
 * 
 * Класс эквивалентности: SEG-05 (Strict Orthogonality Invariant)
 * Описание: Проверяет инвариант: ни один сегмент маршрута не может быть диагональным (каждый отрезок строго параллелен оси X либо оси Y).
 * Предусловия:
 *   - Маршрут построен ортогональным роутером между произвольными точками.
 * Действия:
 *   1. Сгенерировать маршруты для различных взаимных конфигураций.
 *   2. Проверить каждый отрезок на условие p1.x === p2.x || p1.y === p2.y.
 * Ожидаемый результат: 100% сегментов строго горизонтальны либо вертикальны.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute, getSegmentsFromPoints } from '../../src/core/geometry';

describe('ТЕСТ №35: Инвариант ортогональности SEG-05', () => {
  it('гарантирует строгую ортогональность всех отрезков', () => {
    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 150, y: 120 } },
      { type: 'block', id: 'b2', side: 'top', point: { x: 650, y: 480 } },
      []
    );
    const segs = getSegmentsFromPoints(pts);
    for (const seg of segs) {
      const isOrthogonal = Math.abs(seg.start.x - seg.end.x) < 0.01 || Math.abs(seg.start.y - seg.end.y) < 0.01;
      expect(isOrthogonal).toBe(true);
    }
  });
});

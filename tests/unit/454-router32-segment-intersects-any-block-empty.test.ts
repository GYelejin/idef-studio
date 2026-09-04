/**
 * ТЕСТ №454: Трассировка: Обнаружение коллизии вертикального сегмента с телом блока
 * 
 * Класс эквивалентности: ROUTE-32 (Check Segment Block Collision Vertical)
 * Описание: Проверяет фиксацию пересечения вертикального отрезка стрелки с телом функционального блока (checkSegmentBlockCollision).
 * Предусловия:
 *   - Блок (200, 200, w=200, h=100) и вертикальный отрезок, проходящий через X=300 от Y=100 до Y=400.
 * Действия:
 *   1. Вызвать checkSegmentBlockCollision.
 *   2. Проверить результат true.
 * Ожидаемый результат: Зафиксировано пересечение (true).
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentBlockCollision } from '../../src/core/geometry/router';
import { Segment, Block } from '../../src/types/idef0';

describe('ТЕСТ №454: Вертикальная коллизия с блоком ROUTE-32', () => {
  it('детектирует пересечение вертикального сегмента с телом блока', () => {
    const block: Block = {
      id: 'b1', nodeNumber: 1, name: 'Блок',
      x: 200, y: 200, width: 200, height: 100,
      decompDiagramId: null,
    };
    const seg: Segment = {
      id: 'seg-1',
      arrowId: 'a1',
      start: { x: 300, y: 100 },
      end: { x: 300, y: 400 },
      orientation: 'vertical',
    };

    const collides = checkSegmentBlockCollision(seg, block);
    expect(collides).toBe(true);
  });
});

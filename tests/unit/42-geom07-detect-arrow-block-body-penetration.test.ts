/**
 * ТЕСТ №42: Геометрия: Запрет сквозного пересечения тела блока стрелкой
 * 
 * Класс эквивалентности: GEOM-07 (Block Body Penetration Prohibited)
 * Описание: Проверяет запрет прохождения линии стрелки насквозь через тело функционального блока.
 * Предусловия:
 *   - Блок расположен в координатах (300, 200, 200, 120).
 *   - Отрезок проходит от (100, 260) до (700, 260).
 * Действия:
 *   1. Вызвать функцию checkSegmentBlockCollision.
 *   2. Проверить результат детекции коллизии.
 * Ожидаемый результат: Коллизия с телом блока обнаружена (collides === true).
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentBlockCollision } from '../../src/core/geometry';
import { Block, Segment } from '../../src/types/idef0';

describe('ТЕСТ №42: Пересечение тела блока GEOM-07', () => {
  it('детектирует пересечение отрезка с телом блока', () => {
    const b: Block = {
      id: 'b1',
      nodeNumber: 1,
      name: 'Тест',
      x: 200,
      y: 200,
      width: 200,
      height: 100,
      decompDiagramId: null,
    };
    const seg: Segment = { start: { x: 100, y: 250 }, end: { x: 500, y: 250 }, orientation: 'horizontal' };
    expect(checkSegmentBlockCollision(seg, b)).toBe(true);
  });
});

/**
 * ТЕСТ №150: Пересечения: Разрешение касания внешней грани блока без проникновения
 * 
 * Класс эквивалентности: INTER-03 (Segment Block Edge Contact Allowed)
 * Описание: Проверяет стандарт IDEF0: касание стрелкой контактной грани блока не является внутренней коллизией.
 * Предусловия:
 *   - Отрезок касается внешней границы блока в контактном порту.
 * Действия:
 *   1. Вызвать checkSegmentBlockCollision.
 *   2. Проверить результат.
 * Ожидаемый результат: Коллизия внутрь тела не зафиксирована (возвращает false).
 */

import { describe, it, expect } from 'bun:test';
import { checkSegmentBlockCollision } from '../../src/core/intersections';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №150: Касание грани блока INTER-03', () => {
  it('разрешает контакт стрелки с внешней гранью блока', () => {
    const block: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const touchingSeg = { start: { x: 30, y: 250 }, end: { x: 200, y: 250 }, orientation: 'horizontal' as const };
    const collides = checkSegmentBlockCollision(touchingSeg, block);
    expect(collides).toBe(false);
  });
});

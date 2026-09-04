/**
 * ТЕСТ №420: Перемещение блока: Автотрассировка стрелки при перемещении блока
 * 
 * Класс эквивалентности: MOVE-21 (Auto Mode Arrow Recalculates Route On Block Move)
 * Описание: Проверяет полный пересчет маршрута стрелки с pathMode: 'auto' через buildOrthogonalRoute при смещении связанного блока.
 * Предусловия:
 *   - Стрелка в режиме auto между двумя блоками.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove с перемещением блока b1.
 *   2. Проверить points.length >= 2.
 * Ожидаемый результат: Маршрут автоматически перетрассирован.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №420: Автотрассировка при перемещении блока MOVE-21', () => {
  it('перетрассирует стрелку с pathMode auto при смещении блока', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 700, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 250 } },
      role: 'output',
      pathMode: 'auto',
      points: [{ x: 400, y: 250 }, { x: 700, y: 250 }],
      pinned: false,
    };

    adjustArrowOnBlockMove(arrow, b1, 50, 50);
    expect(arrow.points.length).toBeGreaterThanOrEqual(2);
    expect(arrow.points[0].x).toBe(450);
  });
});

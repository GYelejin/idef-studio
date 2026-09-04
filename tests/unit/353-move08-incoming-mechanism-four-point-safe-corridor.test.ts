/**
 * ТЕСТ №353: Перемещение блока: Пересчет 4-точечной входящей стрелки Механизма снизу
 * 
 * Класс эквивалентности: MOVE-08 (Incoming Mechanism Four Point Safe Corridor)
 * Описание: Проверяет адаптацию безопасного коридора для 4-точечной стрелки Механизма из нижней границы листа при перемещении блока вверх.
 * Предусловия:
 *   - 4-точечная входящая стрелка снизу.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove с перемещением блока вверх (dy = -50).
 *   2. Проверить ортогональность points[1] и points[2].
 * Ожидаемый результат: Коридор пересчитан с соблюдением безопасных отступов.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №353: Входящий Механизм снизу MOVE-08', () => {
  it('адаптирует 4-точечную стрелку Механизма при перемещении блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 400, y: 400, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Механизм',
      source: { type: 'border', side: 'bottom', point: { x: 500, y: 865 } },
      target: { type: 'block', id: 'b1', side: 'bottom', point: { x: 500, y: 500 } },
      role: 'mechanism',
      points: [{ x: 500, y: 865 }, { x: 500, y: 650 }, { x: 500, y: 650 }, { x: 500, y: 500 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 20, -50);
    expect(arrow.target.point.y).toBe(450);
    expect(arrow.points[1].y).toBe(arrow.points[2].y);
  });
});

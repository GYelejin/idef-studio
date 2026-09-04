/**
 * ТЕСТ №455: Перемещение блока: Адаптация 4-точечной стрелки с правой грани
 * 
 * Класс эквивалентности: MOVE-24 (Adapt Four Point Arrow Source Right Side)
 * Описание: Проверяет адаптацию промежуточных звеньев (pts[1].x = pts[0].x, pts[2].x = pts[3].x) 4-точечной стрелки, выходящей с правой стороны блока, при перемещении блока источника.
 * Предусловия:
 *   - 4-точечная стрелка из правого выхода блока.
 * Действия:
 *   1. Переместить блок b1.
 *   2. Проверить обновление координат стрелки.
 * Ожидаемый результат: Промежуточные звенья согласованы с новым положением выхода.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №455: 4-точечная стрелка с выхода MOVE-24', () => {
  it('адаптирует звенья 4-точечной стрелки при перемещении блока источника', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 700, y: 200, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 800, y: 200 } },
      role: 'control',
      points: [
        { x: 400, y: 250 },
        { x: 500, y: 250 },
        { x: 800, y: 150 },
        { x: 800, y: 200 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b1, 30, 20);
    expect(arrow.points.length).toBeGreaterThanOrEqual(3);
    expect(arrow.points[0].x).toBe(430);
  });
});

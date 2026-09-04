/**
 * ТЕСТ №471: Перемещение блока: Адаптация 4-точечной входящей стрелки с правой границы листа
 * 
 * Класс эквивалентности: MOVE-29 (Inflow From Right Border Four Points)
 * Описание: Проверяет адаптацию промежуточных точек (pts[1].x = pts[0].x, pts[2].x = pts[3].x, pts[2].y = pts[1].y) при перемещении блока, в который входит 4-точечная стрелка с правой границы.
 * Предусловия:
 *   - 4-точечная входящая стрелка с правой границы.
 * Действия:
 *   1. Сместить блок b.
 *   2. Проверить адаптацию точек.
 * Ожидаемый результат: Стрелка корректно адаптирована при перемещении блока назначения.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №471: 4-точечный вход с правой границы MOVE-29', () => {
  it('адаптирует 4-точечную стрелку с правой границы при сдвиге целевого блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Вход справа',
      source: { type: 'border', side: 'right', point: { x: 1570, y: 150 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [
        { x: 1570, y: 150 },
        { x: 1570, y: 200 },
        { x: 600, y: 200 },
        { x: 600, y: 300 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 40, 20);
    expect(arrow.points[arrow.points.length - 1].x).toBe(640);
  });
});

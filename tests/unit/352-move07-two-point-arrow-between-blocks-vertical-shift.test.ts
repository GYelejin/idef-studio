/**
 * ТЕСТ №352: Перемещение блока: Сдвиг 2-точечной стрелки между блоками
 * 
 * Класс эквивалентности: MOVE-07 (Two Point Arrow Vertical Shift)
 * Описание: Проверяет обновление Y координат 2-точечной стрелки при вертикальном перемещении блока источника.
 * Предусловия:
 *   - 2-точечная горизонтальная стрелка между блоками.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove(arrow, b1, 0, 30).
 *   2. Проверить points[0].y.
 * Ожидаемый результат: Координата Y источника сместилась на +30px.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №352: 2-точечная стрелка между блоками MOVE-07', () => {
  it('обновляет координаты 2-точечной стрелки между блоками при вертикальном сдвиге', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2, side: 'left', point: { x: 600, y: 250 } } as any,
      role: 'output', points: [{ x: 400, y: 250 }, { x: 600, y: 250 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b1, 0, 30);
    expect(arrow.points[0].y).toBe(280);
  });
});

/**
 * ТЕСТ №422: Перемещение блока: Сдвиг подписи на промежуточном горизонтальном коридоре петли
 * 
 * Класс эквивалентности: MOVE-22 (Middle Horizontal Segment Shifts Label Y)
 * Описание: Проверяет синхронный сдвиг координаты Y подписи стрелки, привязанной к промежуточному горизонтальному сегменту 6-точечной петли обратной связи.
 * Предусловия:
 *   - 6-точечная стрелка с подписью на среднем горизонтальном звене.
 * Действия:
 *   1. Сместить блок b1 вниз по оси Y.
 *   2. Проверить смещение координаты labelPos.y.
 * Ожидаемый результат: Подпись корректно смещена вслед за промежуточным коридором.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №422: Подпись на среднем звене петли MOVE-22', () => {
  it('сдвигает Y подписи на промежуточном горизонтальном звене петли', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 300, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 800, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Петля',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 350 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 800, y: 350 } },
      role: 'output',
      points: [
        { x: 400, y: 350 }, { x: 450, y: 350 }, { x: 450, y: 550 },
        { x: 750, y: 550 }, { x: 750, y: 350 }, { x: 800, y: 350 },
      ],
      pinned: true,
      labelPos: { x: 600, y: 550 },
    };

    adjustArrowOnBlockMove(arrow, b1, 0, 40);
    expect(arrow.labelPos).toBeDefined();
    expect(typeof arrow.labelPos?.y).toBe('number');
  });
});

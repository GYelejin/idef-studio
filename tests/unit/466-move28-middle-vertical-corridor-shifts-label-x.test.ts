/**
 * ТЕСТ №466: Перемещение блока: Сдвиг подписи по оси X на промежуточном вертикальном звене
 * 
 * Класс эквивалентности: MOVE-28 (Middle Vertical Corridor Shifts Label X)
 * Описание: Проверяет обновление координаты labelPos.x подписи при смещении промежуточного вертикального коридора 4-точечной стрелки.
 * Предусловия:
 *   - 4-точечная стрелка с подписью на среднем вертикальном звене (seg 1).
 * Действия:
 *   1. Сместить блок b1 по оси X на 60px.
 *   2. Проверить смещение координаты labelPos.x с 600 до 630.
 * Ожидаемый результат: Подпись синхронно смещена по оси X.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №466: Подпись на вертикальном коридоре MOVE-28', () => {
  it('сдвигает X подписи на вертикальном коридоре при смещении блока', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 300, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 800, y: 500, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 350 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 800, y: 550 } },
      role: 'output',
      points: [
        { x: 400, y: 350 },
        { x: 600, y: 350 },
        { x: 600, y: 550 },
        { x: 800, y: 550 },
      ],
      pinned: false,
      labelPos: { x: 600, y: 450 },
    };

    adjustArrowOnBlockMove(arrow, b1, 60, 0);
    expect(arrow.labelPos?.x).toBe(630);
  });
});

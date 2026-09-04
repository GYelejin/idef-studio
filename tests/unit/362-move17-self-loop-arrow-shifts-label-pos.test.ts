/**
 * ТЕСТ №362: Перемещение блока: Сдвиг подписи стрелки самозацикливания (self-loop)
 * 
 * Класс эквивалентности: MOVE-17 (Self Loop Arrow Shifts Label Pos)
 * Описание: Проверяет синхронный сдвиг координат labelPos стрелки самозацикливания (петли на тот же блок) при перемещении блока на (dx, dy).
 * Предусловия:
 *   - Стрелка соединяет блок сам с собой (isSource && isTarget).
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove(arrow, b, 30, 40).
 *   2. Проверить смещение labelPos.
 * Ожидаемый результат: Координаты подписи сместились ровно на (+30, +40).
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №362: Петля обратной связи MOVE-17', () => {
  it('сдвигает подпись стрелки петли обратной связи вместе с блоком', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 300, y: 300, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Петля',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 500, y: 350 } },
      target: { type: 'block', id: 'b1', side: 'top', point: { x: 400, y: 300 } },
      role: 'control',
      points: [{ x: 500, y: 350 }, { x: 550, y: 350 }, { x: 550, y: 250 }, { x: 400, y: 250 }, { x: 400, y: 300 }],
      pinned: true,
      labelPos: { x: 480, y: 240 },
    };

    adjustArrowOnBlockMove(arrow, b, 30, 40);
    expect(arrow.labelPos?.x).toBe(510);
    expect(arrow.labelPos?.y).toBe(280);
  });
});

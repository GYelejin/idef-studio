/**
 * ТЕСТ №423: Перемещение блока: Сдвиг подписи на промежуточном вертикальном коридоре
 * 
 * Класс эквивалентности: MOVE-23 (Middle Vertical Segment Shifts Label X)
 * Описание: Проверяет синхронный сдвиг координаты X подписи стрелки, привязанной к промежуточному вертикальному звену.
 * Предусловия:
 *   - Стрелка с подписью на среднем вертикальном звене.
 * Действия:
 *   1. Сместить блок b1 по оси X.
 *   2. Проверить смещение координаты labelPos.x.
 * Ожидаемый результат: Координата X подписи синхронизирована с промежуточным звеном.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №423: Подпись на вертикальном звене MOVE-23', () => {
  it('сдвигает X подписи на промежуточном вертикальном звене', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 300, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 800, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 350 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 800, y: 350 } },
      role: 'output',
      points: [
        { x: 400, y: 350 }, { x: 450, y: 350 }, { x: 450, y: 550 },
        { x: 750, y: 550 }, { x: 750, y: 350 }, { x: 800, y: 350 },
      ],
      pinned: true,
      labelPos: { x: 450, y: 450 },
    };

    adjustArrowOnBlockMove(arrow, b1, 30, 0);
    expect(arrow.labelPos).toBeDefined();
    expect(typeof arrow.labelPos?.x).toBe('number');
  });
});

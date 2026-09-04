/**
 * ТЕСТ №364: Перемещение блока: Синхронизация подписи на промежуточном вертикальном звене
 * 
 * Класс эквивалентности: MOVE-19 (Label On Vertical Segment Shifts X)
 * Описание: Проверяет горизонтальное смещение подписи вслед за смещением вертикального звена стрелки при горизонтальном перемещении блока.
 * Предусловия:
 *   - Стрелка с подписью на вертикальном звене.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove с dx = 60.
 *   2. Проверить labelPos.x.
 * Ожидаемый результат: Подпись сместилась по оси X вместе с вертикальным сегментом.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №364: Подпись на вертикальном звене MOVE-19', () => {
  it('сдвигает координату X подписи вслед за вертикальным звеном', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 700, y: 400, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: 'b2', side: 'top', point: { x: 800, y: 400 } },
      role: 'control',
      points: [{ x: 400, y: 250 }, { x: 800, y: 250 }, { x: 800, y: 400 }],
      pinned: true,
      // Подпись расположена на вертикальном звене (800, 250)-(800, 400)
      labelPos: { x: 810, y: 320 },
    };

    adjustArrowOnBlockMove(arrow, b2, 50, 0);
    expect(arrow.labelPos?.x).toBe(860);
  });
});

/**
 * ТЕСТ №363: Перемещение блока: Синхронизация подписи на промежуточном горизонтальном звене
 * 
 * Класс эквивалентности: MOVE-18 (Label On Horizontal Segment Shifts Y)
 * Описание: Проверяет вертикальное смещение подписи вслед за смещением горизонтального звена стрелки при перемещении блока.
 * Предусловия:
 *   - Стрелка с подписью на среднем горизонтальном сегменте.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove с dy = 50.
 *   2. Проверить labelPos.y.
 * Ожидаемый результат: Подпись сместилась по оси Y вместе с горизонтальным сегментом.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №363: Подпись на горизонтальном звене MOVE-18', () => {
  it('сдвигает координату Y подписи вслед за горизонтальным звеном', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 700, y: 400, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: 'b2', side: 'left', point: { x: 700, y: 450 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 550, y: 250 }, { x: 550, y: 450 }, { x: 700, y: 450 }],
      pinned: true,
      // Подпись расположена на первом горизонтальном сегменте (400, 250)-(550, 250)
      labelPos: { x: 450, y: 235 },
    };

    adjustArrowOnBlockMove(arrow, b1, 0, 40);
    expect(arrow.labelPos?.y).toBe(275);
  });
});

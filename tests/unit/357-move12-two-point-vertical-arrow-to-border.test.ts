/**
 * ТЕСТ №357: Перемещение блока: Горизонтальное смещение 2-точечной вертикальной стрелки к границе
 * 
 * Класс эквивалентности: MOVE-12 (Two Point Vertical Arrow To Border)
 * Описание: Проверяет обновление целевой координаты X на границе листа при горизонтальном смещении блока со стрелкой, направленной вверх/вниз.
 * Предусловия:
 *   - 2-точечная вертикальная стрелка к верхней границе.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove(arrow, b, 40, 0).
 *   2. Проверить target.point.x.
 * Ожидаемый результат: Целевая координата X на границе синхронно сместилась на +40px.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №357: Вертикальный выход к границе MOVE-12', () => {
  it('синхронно сдвигает X целевой границы листа при горизонтальном сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: 'b1', side: 'top', point: { x: 400, y: 200 } },
      target: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      role: 'control', points: [{ x: 400, y: 200 }, { x: 400, y: 40 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 40, 0);
    expect(arrow.target.point.x).toBe(440);
  });
});

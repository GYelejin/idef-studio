/**
 * ТЕСТ №354: Перемещение блока: Пересчет 4-точечной входящей стрелки Входа слева
 * 
 * Класс эквивалентности: MOVE-09 (Incoming Input Four Point Safe Corridor)
 * Описание: Проверяет адаптацию 4-точечной входящей стрелки с левой границы листа при сдвиге блока вправо/влево.
 * Предусловия:
 *   - 4-точечная стрелка Входа.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить выравнивание X точек.
 * Ожидаемый результат: Точки points[1].x и points[2].x согласованы.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №354: Входящий Вход слева MOVE-09', () => {
  it('адаптирует 4-точечную стрелку Входа при горизонтальном сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: 'b1', side: 'left', point: { x: 400, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 200, y: 250 }, { x: 200, y: 250 }, { x: 400, y: 250 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 50, 0);
    expect(arrow.target.point.x).toBe(450);
  });
});

/**
 * ТЕСТ №355: Перемещение блока: Адаптация многоточечной (>4) входящей граничной стрелки
 * 
 * Класс эквивалентности: MOVE-10 (Multi Point Incoming Boundary Arrow)
 * Описание: Проверяет адаптацию последнего сегмента многоточечной (5 точек) огибающей стрелки при перемещении целевого блока.
 * Предусловия:
 *   - 5-точечная стрелка из верхней границы в блок.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points[n-2].y.
 * Ожидаемый результат: Последнее звено адаптировано к новой позиции порта блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №355: Многоточечный граничный вход MOVE-10', () => {
  it('адаптирует последний сегмент многоточечной стрелки при сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      target: { type: 'block', id: 'b1', side: 'left', point: { x: 500, y: 350 } },
      role: 'input',
      points: [{ x: 200, y: 40 }, { x: 200, y: 200 }, { x: 350, y: 200 }, { x: 350, y: 350 }, { x: 500, y: 350 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 0, 40);
    expect(arrow.target.point.y).toBe(390);
    expect(arrow.points[3].y).toBe(390);
  });
});

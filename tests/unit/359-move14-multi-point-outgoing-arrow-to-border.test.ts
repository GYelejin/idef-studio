/**
 * ТЕСТ №359: Перемещение блока: Адаптация первого сегмента 5-точечной исходящей стрелки к границе
 * 
 * Класс эквивалентности: MOVE-14 (Multi Point Outgoing Arrow To Border)
 * Описание: Проверяет сдвиг начального горизонтального сегмента многоточечной стрелки к границе при перемещении блока-источника.
 * Предусловия:
 *   - 5-точечная стрелка к правой границе.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points[1].y === points[0].y.
 * Ожидаемый результат: Первый сегмент сохранен горизонтальным при сдвиге по высоте.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №359: Многоточечный выход к границе MOVE-14', () => {
  it('сохраняет горизонтальность первого сегмента 5-точечной стрелки', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 500 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 400 }, { x: 800, y: 400 }, { x: 1570, y: 500 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 0, 35);
    expect(arrow.points[1].y).toBe(arrow.points[0].y);
  });
});

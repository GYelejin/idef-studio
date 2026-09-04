/**
 * ТЕСТ №358: Перемещение блока: Адаптация 4-точечной стрелки к верхней/нижней границе
 * 
 * Класс эквивалентности: MOVE-13 (Four Point Arrow To Top/Bottom Border)
 * Описание: Проверяет обновление промежуточных точек 4-точечной исходящей стрелки к верхней границе листа при перемещении блока.
 * Предусловия:
 *   - 4-точечная стрелка block right -> border top.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points[1].y === points[0].y.
 * Ожидаемый результат: Ортогональность первого сегмента сохранена.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №358: 4-точечный выход вверх MOVE-13', () => {
  it('сохраняет ортогональность 4-точечной стрелки к верхней границе', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 500, y: 250 } },
      target: { type: 'border', side: 'top', point: { x: 700, y: 40 } },
      role: 'control',
      points: [{ x: 500, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 40 }, { x: 700, y: 40 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 20, 30);
    expect(arrow.points[1].y).toBe(arrow.points[0].y);
  });
});

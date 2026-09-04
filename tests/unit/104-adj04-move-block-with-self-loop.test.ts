/**
 * ТЕСТ №104: Адаптация: Смещение блока с циклическим потоком (Self Loop)
 * 
 * Класс эквивалентности: ADJ-04 (Block Move Self Loop Adjustment)
 * Описание: Проверяет параллельный перенос всех точек циклической стрелки при перемещении замкнутого на себя блока.
 * Предусловия:
 *   - Блок с циклической обратной связью (Self Loop).
 * Действия:
 *   1. Сместить блок на (100, 50).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Все точки циклической стрелки смещаются на (dx: 100, dy: 50) без искажения формы петли.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №104: Смещение циклического потока ADJ-04', () => {
  it('синхронно переносит всю петлю обратной связи при движении блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'loop',
      label: 'Цикл',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 600, y: 250 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 200 } },
      role: 'control',
      points: [
        { x: 600, y: 250 },
        { x: 640, y: 250 },
        { x: 640, y: 150 },
        { x: 500, y: 150 },
        { x: 500, y: 200 },
      ],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 100, 50, [], [b]);
    expect(a.points[0].x).toBe(700);
    expect(a.points[0].y).toBe(300);
    expect(a.points[2].x).toBe(740);
    expect(a.points[2].y).toBe(200);
  });
});

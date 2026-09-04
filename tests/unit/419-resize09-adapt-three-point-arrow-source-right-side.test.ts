/**
 * ТЕСТ №419: Адаптация при ресайзе: Синхронизация 3-точечной стрелки, исходящей справа
 * 
 * Класс эквивалентности: RESIZE-09 (Adapt Three Point Arrow Source Right Side)
 * Описание: Проверяет обновление промежуточной точки pts[1].y = arrow.source.point.y для 3-точечной стрелки, выходящей из правой грани блока, при изменении его высоты.
 * Предусловия:
 *   - 3-точечная стрелка из правого выхода блока.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize с изменением высоты блока.
 *   2. Проверить points[1].y === source.point.y.
 * Ожидаемый результат: Промежуточная точка выровнена по новой высоте выхода.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №419: 3-точечный выход при ресайзе RESIZE-09', () => {
  it('синхронизирует промежуточную точку 3-точечной стрелки с правой грани', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'top', point: { x: 600, y: 40 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 40 }],
      pinned: false,
    };

    const oldBounds = { x: 200, y: 200, width: 200, height: 100 };
    const newBounds = { x: 200, y: 200, width: 200, height: 180 };

    adjustArrowOnBlockResize(arrow, b, oldBounds, newBounds);
    expect(arrow.points[1].y).toBe(arrow.source.point.y);
  });
});

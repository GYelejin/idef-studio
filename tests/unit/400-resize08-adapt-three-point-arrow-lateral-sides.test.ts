/**
 * ТЕСТ №400: Адаптация при ресайзе: Синхронизация 3-точечной стрелки на боковых гранях
 * 
 * Класс эквивалентности: RESIZE-08 (Adapt Three Point Arrow Lateral Sides)
 * Описание: Проверяет обновление промежуточной точки 3-точечной стрелки, входящей в левую грань (Вход) или выходящей из правой грани (Выход), при изменении высоты блока.
 * Предусловия:
 *   - 3-точечная стрелка на боковой грани блока.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить points[1].y === target.point.y.
 * Ожидаемый результат: Промежуточная точка выровнена по высоте бокового контактного порта.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №400: Боковые 3-точечные стрелки при ресайзе RESIZE-08', () => {
  it('адаптирует промежуточную точку 3-точечной стрелки на боковой грани блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Вход',
      source: { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input',
      points: [{ x: 200, y: 40 }, { x: 200, y: 250 }, { x: 400, y: 250 }],
      pinned: false,
    };

    const oldBounds = { x: 400, y: 200, width: 200, height: 100 };
    const newBounds = { x: 400, y: 200, width: 200, height: 160 };

    adjustArrowOnBlockResize(arrow, b, oldBounds, newBounds);
    expect(arrow.points[1].y).toBe(arrow.target.point.y);
  });
});

/**
 * ТЕСТ №178: Масштабирование: Адаптация 3-точечной стрелки к левой грани блока
 * 
 * Класс эквивалентности: RESIZE-07 (Scale 3-Point Arrow Target Left)
 * Описание: Проверяет подстройку промежуточной точки 3-точечной входящей стрелки при изменении высоты блока.
 * Предусловия:
 *   - 3-точечная стрелка входит в левую грань блока.
 * Действия:
 *   1. Изменить высоту блока на +80px.
 *   2. Вызвать adjustArrowOnBlockResize.
 * Ожидаемый результат: Промежуточная точка pts[1].y выровнена с целевым портом target.point.y.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №178: 3-точечная стрелка слева RESIZE-07', () => {
  it('подстраивает промежуточную точку по Y при ресайзе блока-цели', () => {
    const oldB: Block = { id: 'b2', nodeNumber: 2, name: 'Блок', x: 500, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, height: 180 };
    const a: Arrow = {
      id: 'a1',
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: oldB.id, side: 'left', point: { x: 500, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 100 }, { x: 400, y: 250 }, { x: 500, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, 'b2', newB, oldB);
    expect(a.points[1].y).toBe(a.target.point.y);
  });
});

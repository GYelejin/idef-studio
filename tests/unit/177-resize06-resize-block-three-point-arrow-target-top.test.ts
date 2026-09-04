/**
 * ТЕСТ №177: Масштабирование: Адаптация 3-точечной стрелки к верхней грани блока
 * 
 * Класс эквивалентности: RESIZE-06 (Scale 3-Point Arrow Target Top)
 * Описание: Проверяет подстройку промежуточного излома 3-точечной стрелки при горизонтальном растяжении целевого блока.
 * Предусловия:
 *   - 3-точечная стрелка входит в верхнюю грань блока.
 * Действия:
 *   1. Растянуть блок по ширине на +100px.
 *   2. Вызвать adjustArrowOnBlockResize.
 * Ожидаемый результат: Промежуточная точка pts[1].x выровнена с целевым портом target.point.x.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №177: 3-точечная стрелка сверху RESIZE-06', () => {
  it('подстраивает промежуточную точку при ресайзе блока-цели', () => {
    const oldB: Block = { id: 'b2', nodeNumber: 2, name: 'Блок', x: 500, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, width: 300 };
    const a: Arrow = {
      id: 'a1',
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 300, y: 40 } },
      target: { type: 'block', id: oldB.id, side: 'top', point: { x: 600, y: 200 } },
      role: 'control',
      points: [{ x: 300, y: 40 }, { x: 600, y: 40 }, { x: 600, y: 200 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, 'b2', newB, oldB);
    expect(a.points[1].x).toBe(a.target.point.x);
  });
});

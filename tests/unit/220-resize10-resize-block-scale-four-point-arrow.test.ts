/**
 * ТЕСТ №220: Масштабирование: Адаптация 4-точечной стрелки (pts[1].y / pts[2].y)
 * 
 * Класс эквивалентности: RESIZE-10 (Scale 4-Point Arrow on Resize)
 * Описание: Проверяет выравнивание горизонтальных звеньев 4-точечной стрелки при ресайзе блока.
 * Предусловия:
 *   - 4-точечная стрелка подключена к блоку.
 * Действия:
 *   1. Изменить размеры блока.
 *   2. Вызвать adjustArrowOnBlockResize.
 * Ожидаемый результат: pts[1].y выровнена с pts[0].y.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №220: 4-точечная стрелка при ресайзе RESIZE-10', () => {
  it('выравнивает промежуточные звенья 4-точечной стрелки', () => {
    const oldB: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, height: 160 };
    const a: Arrow = {
      id: 'a1', label: 'Связь',
      source: { type: 'block', id: oldB.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 400 }, { x: 1570, y: 400 }],
      pinned: true,
    };
    adjustArrowOnBlockResize(a, newB, oldB, newB);
    expect(a.points[1].y).toBe(a.points[0].y);
  });
});

/**
 * ТЕСТ №329: Адаптация при ресайзе: Синхронизация 3-точечной входящей стрелки сверху
 * 
 * Класс эквивалентности: RESIZE-04 (Adapt Three Point Arrow Target Top)
 * Описание: Проверяет пересчет промежуточной точки 3-точечной стрелки Управления при масштабировании целевого блока.
 * Предусловия:
 *   - Блок увеличивается по ширине.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize с объектом Block.
 *   2. Проверить points[1].x.
 * Ожидаемый результат: Точка points[1].x выровнена по новому положению порта блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №329: Входящая стрелка сверху при ресайзе RESIZE-04', () => {
  it('адаптирует 3-точечную входящую стрелку сверху при изменении размера блока', () => {
    const targetBlock: Block = {
      id: 'b1', nodeNumber: 1, name: 'Б1', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null,
    };
    const arrow: Arrow = {
      id: 'a1', label: 'Управление',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: 'b1', side: 'top', point: { x: 350, y: 200 } },
      role: 'control',
      points: [{ x: 30, y: 100 }, { x: 350, y: 100 }, { x: 350, y: 200 }],
      pinned: false,
    };

    const oldBounds = { x: 300, y: 200, width: 200, height: 100 };
    const newBounds = { x: 300, y: 200, width: 300, height: 150 };

    adjustArrowOnBlockResize(arrow, targetBlock, oldBounds, newBounds);
    expect(arrow.points[1].x).toBe(arrow.target.point.x);
  });
});

/**
 * ТЕСТ №330: Адаптация при ресайзе: Синхронизация 3-точечной исходящей стрелки снизу
 * 
 * Класс эквивалентности: RESIZE-05 (Adapt Three Point Arrow Source Bottom)
 * Описание: Проверяет пересчет промежуточного изгиба 3-точечной стрелки, выходящей из нижней грани блока, при его ресайзе.
 * Предусловия:
 *   - Блок масштабируется.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize с объектом Block.
 *   2. Проверить points[1].x.
 * Ожидаемый результат: Точка points[1].x выровнена по новому положению порта выхода снизу.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №330: Исходящая стрелка снизу при ресайзе RESIZE-05', () => {
  it('адаптирует 3-точечную исходящую стрелку снизу при ресайзе исходного блока', () => {
    const srcBlock: Block = {
      id: 'b1', nodeNumber: 1, name: 'Б1', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null,
    };
    const arrow: Arrow = {
      id: 'a1', label: 'Механизм',
      source: { type: 'block', id: 'b1', side: 'bottom', point: { x: 400, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 500 } },
      role: 'output',
      points: [{ x: 400, y: 300 }, { x: 400, y: 500 }, { x: 1570, y: 500 }],
      pinned: false,
    };

    const oldBounds = { x: 300, y: 200, width: 200, height: 100 };
    const newBounds = { x: 300, y: 200, width: 300, height: 150 };

    adjustArrowOnBlockResize(arrow, srcBlock, oldBounds, newBounds);
    expect(arrow.points[1].x).toBe(arrow.source.point.x);
  });
});

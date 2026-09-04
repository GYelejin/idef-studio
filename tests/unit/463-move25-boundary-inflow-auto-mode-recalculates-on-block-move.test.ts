/**
 * ТЕСТ №463: Перемещение блока: Пересчет граничной входящей стрелки в режиме auto
 * 
 * Класс эквивалентности: MOVE-25 (Boundary Inflow Auto Mode Recalculates On Block Move)
 * Описание: Проверяет автоматический вызов buildOrthogonalRoute при перемещении блока назначения для граничной входящей стрелки в режиме pathMode: 'auto'.
 * Предусловия:
 *   - Входящая стрелка с границы с pathMode: 'auto'.
 * Действия:
 *   1. Сместить целевой блок b.
 *   2. Проверить пересчет точек arrow.points.
 * Ожидаемый результат: Трасса стрелки пересчитана роутером.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №463: Граничный вход в auto MOVE-25', () => {
  it('перетрассирует граничный вход в auto при сдвиге целевого блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 350 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 350 } },
      role: 'input',
      points: [{ x: 30, y: 350 }, { x: 500, y: 350 }],
      pinned: false,
      pathMode: 'auto',
    };

    adjustArrowOnBlockMove(arrow, b, 50, 40, [b]);
    expect(arrow.points[arrow.points.length - 1].x).toBe(550);
    expect(arrow.points[arrow.points.length - 1].y).toBe(390);
  });
});

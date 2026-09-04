/**
 * ТЕСТ №465: Перемещение блока: Адаптация первого горизонтального сегмента многоточечного выхода
 * 
 * Класс эквивалентности: MOVE-27 (Multi Point Outflow Adjusts Horizontal First Segment)
 * Описание: Проверяет обновление pts[1].y = pts[0].y при перемещении блока источника для граничной стрелки из 5+ точек с горизонтальным выходом.
 * Предусловия:
 *   - Стрелка из 5 точек к правой границе.
 * Действия:
 *   1. Сместить блок источника b по оси Y.
 *   2. Проверить pts[1].y === pts[0].y.
 * Ожидаемый результат: Начальный горизонтальный сегмент адаптирован по высоте источника.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №465: Многоточечный выход MOVE-27', () => {
  it('адаптирует вторую точку по Y при смещении блока источника', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 400, y: 350 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 600 } },
      role: 'output',
      points: [
        { x: 400, y: 350 },
        { x: 600, y: 350 },
        { x: 600, y: 500 },
        { x: 1000, y: 500 },
        { x: 1570, y: 600 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 0, 40);
    expect(arrow.points[1].y).toBe(arrow.points[0].y);
  });
});

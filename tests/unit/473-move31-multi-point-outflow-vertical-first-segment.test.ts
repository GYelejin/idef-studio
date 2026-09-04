/**
 * ТЕСТ №473: Перемещение блока: Адаптация вертикального начального сегмента многоточечного выхода
 * 
 * Класс эквивалентности: MOVE-31 (Multi Point Outflow Vertical First Segment)
 * Описание: Проверяет обновление pts[1].x = pts[0].x при перемещении блока источника для граничной стрелки из 5+ точек с вертикальным выходом (firstSegIsHoriz=false).
 * Предусловия:
 *   - 5-точечная стрелка с вертикальным выходом.
 * Действия:
 *   1. Сместить блок b по оси X.
 *   2. Проверить pts[1].x === pts[0].x.
 * Ожидаемый результат: Вторая точка по X согласована с выходом блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №473: Вертикальный многоточечный выход MOVE-31', () => {
  it('адаптирует вторую точку по X при смещении блока источника', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: b.id, side: 'top', point: { x: 250, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 600 } },
      role: 'output',
      points: [
        { x: 250, y: 300 },
        { x: 250, y: 150 },
        { x: 500, y: 150 },
        { x: 500, y: 600 },
        { x: 1570, y: 600 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 40, 0);
    expect(arrow.points[1].x).toBe(arrow.points[0].x);
  });
});

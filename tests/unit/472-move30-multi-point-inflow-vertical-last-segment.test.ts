/**
 * ТЕСТ №472: Перемещение блока: Адаптация вертикального завершающего сегмента многоточечного входа
 * 
 * Класс эквивалентности: MOVE-30 (Multi Point Inflow Vertical Last Segment)
 * Описание: Проверяет обновление pts[n - 2].x = pts[n - 1].x при перемещении целевого блока для граничной стрелки из 5+ точек с вертикальным заходом (lastSegIsHoriz=false).
 * Предусловия:
 *   - 5-точечная стрелка с вертикальным входом в блок.
 * Действия:
 *   1. Сместить целевой блок b по оси X.
 *   2. Проверить pts[3].x === pts[4].x.
 * Ожидаемый результат: Предпоследняя точка по X согласована с точкой контакта.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №472: Вертикальный многоточечный вход MOVE-30', () => {
  it('адаптирует предпоследнюю точку по X при смещении целевого блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Управление',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [
        { x: 30, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 200 },
        { x: 600, y: 200 },
        { x: 600, y: 300 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 30, 0);
    expect(arrow.points[arrow.points.length - 2].x).toBe(arrow.points[arrow.points.length - 1].x);
  });
});

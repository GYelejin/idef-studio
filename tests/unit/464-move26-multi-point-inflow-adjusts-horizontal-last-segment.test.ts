/**
 * ТЕСТ №464: Перемещение блока: Адаптация завершающего горизонтального сегмента многоточечного входа
 * 
 * Класс эквивалентности: MOVE-26 (Multi Point Inflow Adjusts Horizontal Last Segment)
 * Описание: Проверяет обновление pts[n - 2].y = pts[n - 1].y при перемещении целевого блока для граничной стрелки из 5+ точек с горизонтальным входом.
 * Предусловия:
 *   - Стрелка из 5 точек с горизонтальным входом в блок.
 * Действия:
 *   1. Сместить целевой блок b по оси Y.
 *   2. Проверить pts[3].y === pts[4].y.
 * Ожидаемый результат: Завершающий сегмент адаптирован по высоте.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №464: Многоточечный вход MOVE-26', () => {
  it('адаптирует предпоследнюю точку по Y при смещении блока цели', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 700, y: 300, width: 200, height: 100, decompDiagramId: null };

    const arrow: Arrow = {
      id: 'a1', label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 700, y: 350 } },
      role: 'input',
      points: [
        { x: 30, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 250 },
        { x: 500, y: 350 },
        { x: 700, y: 350 },
      ],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 0, 30);
    expect(arrow.points[arrow.points.length - 2].y).toBe(arrow.points[arrow.points.length - 1].y);
  });
});

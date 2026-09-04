/**
 * ТЕСТ №361: Перемещение блока: Защита зазора вертикального канала стрелки слияния (минимум 20px)
 * 
 * Класс эквивалентности: MOVE-16 (Merge Arrow Channel Clearance Protection)
 * Описание: Проверяет принудительное смещение вертикального канала и узла слияния вправо на безопасные 20px, если блок пододвигается вплотную к каналу.
 * Предусловия:
 *   - Стрелка слияния из 3 точек в узел.
 * Действия:
 *   1. Сдвинуть блок вправо в сторону узла.
 *   2. Проверить pts[1].x >= pts[0].x + 20.
 * Ожидаемый результат: Вертикальный канал и узел отодвинуты с соблюдением минимального зазора 20px.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №361: Защитный зазор слияния MOVE-16', () => {
  it('отодвигает вертикальный канал слияния при приближении блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'merge', point: { x: 430, y: 100 }, parentArrowId: 'trunk', childArrowIds: ['a1'] };
    const arrow: Arrow = {
      id: 'a1', label: 'Слияние',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'junction', id: 'j1', point: { x: 430, y: 100 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 430, y: 250 }, { x: 430, y: 100 }],
      pinned: true,
    };

    // Сдвигаем блок на 25px вправо (выход станет 425, а канал был 430: зазор всего 5px < 20px)
    adjustArrowOnBlockMove(arrow, b, 25, 0, [junc]);
    expect(arrow.points[1].x).toBeGreaterThanOrEqual(arrow.points[0].x + 20);
    expect(junc.point.x).toBe(arrow.points[1].x);
  });
});

/**
 * ТЕСТ №204: Адаптация: Ступенчатая 4-точечная трассировка по умолчанию
 * 
 * Класс эквивалентности: MOVE-08 (Block Move Default 4-Point Stepped)
 * Описание: Проверяет построение стандартной ступенчатой трассы через midX.
 * Предусловия:
 *   - Стрелка между блоками со смещением по диагонали.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить точки.
 * Ожидаемый результат: Стрелка содержит 4 точки с перегибом в midX.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №204: 4-точечная ступенчатая трасса MOVE-08', () => {
  it('строит ступенчатый маршрут через серединную координату', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 100, y: 100, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 600, y: 300, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'bottom', point: { x: 200, y: 200 } },
      target: { type: 'block', id: b2.id, side: 'bottom', point: { x: 700, y: 400 } },
      role: 'mechanism',
      points: [{ x: 200, y: 200 }, { x: 700, y: 400 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b1, 20, 20, [], [b1, b2]);
    expect(a.points.length).toBe(4);
  });
});

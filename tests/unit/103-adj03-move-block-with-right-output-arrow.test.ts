/**
 * ТЕСТ №103: Адаптация: Смещение блока с исходящей стрелкой Выхода
 * 
 * Класс эквивалентности: ADJ-03 (Block Move Output Adjustment)
 * Описание: Проверяет смещение начальной точки стрелки Выхода при перемещении блока-источника.
 * Предусловия:
 *   - Блок со стрелкой Выхода на правую границу.
 * Действия:
 *   1. Сместить блок на (60, 40).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Начальная точка стрелки Выхода смещается вместе с правой гранью блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №103: Смещение стрелки Выхода ADJ-03', () => {
  it('адаптирует начальную точку стрелки Выхода при перемещении источника', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Продукция',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 600, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 600, y: 250 }, { x: 1570, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 60, 40, [], [b]);
    expect(a.source.point.x).toBe(660);
    expect(a.source.point.y).toBe(290);
  });
});

/**
 * ТЕСТ №102: Адаптация: Смещение блока с подключенной стрелкой Механизма
 * 
 * Класс эквивалентности: ADJ-02 (Block Move Mechanism Adjustment)
 * Описание: Проверяет адаптацию стрелки Механизма при смещении блока.
 * Предусловия:
 *   - Блок со стрелкой Механизма снизу.
 * Действия:
 *   1. Сместить блок на (40, -30).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Стрелка Механизма синхронно следует за нижней гранью блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №102: Смещение стрелки Механизма ADJ-02', () => {
  it('адаптирует стрелку Механизма при перемещении блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Станок',
      source: { type: 'border', side: 'bottom', point: { x: 500, y: 865 } },
      target: { type: 'block', id: b.id, side: 'bottom', point: { x: 500, y: 300 } },
      role: 'mechanism',
      points: [{ x: 500, y: 865 }, { x: 500, y: 300 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 40, -30, [], [b]);
    expect(a.target.point.x).toBe(540);
    expect(a.target.point.y).toBe(270);
  });
});

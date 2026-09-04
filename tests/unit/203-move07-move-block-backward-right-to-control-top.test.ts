/**
 * ТЕСТ №203: Адаптация: Стрелка с Выхода на Управление назад (Subcase B2 Backward)
 * 
 * Класс эквивалентности: MOVE-07 (Block Move Right to Top Backward)
 * Описание: Проверяет обход над блоками при направлении с Выхода правого блока на Управление левого блока.
 * Предусловия:
 *   - Блок 1 правее Блока 2, стрелка Выход -> Управление.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points.length === 5.
 * Ожидаемый результат: arrow.points.length === 5, обход над блоками.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №203: Выход в Управление назад MOVE-07', () => {
  it('строит обходной маршрут над блоками при обратной подаче управления', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Управление',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 800, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 300, y: 200 } },
      role: 'control',
      points: [{ x: 800, y: 250 }, { x: 300, y: 200 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b1, 20, 0, [], [b1, b2]);
    expect(a.points.length).toBe(5);
  });
});

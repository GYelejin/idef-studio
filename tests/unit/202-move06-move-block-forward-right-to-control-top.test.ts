/**
 * ТЕСТ №202: Адаптация: Стрелка с Выхода на Управление вперед (Subcase B2 Forward)
 * 
 * Класс эквивалентности: MOVE-06 (Block Move Right to Top Forward)
 * Описание: Проверяет трассировку L-образной стрелки из 3 точек от Выхода к Управлению целевого блока правее.
 * Предусловия:
 *   - Блок 1 левее Блока 2, стрелка Выход -> Управление.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points.length === 3.
 * Ожидаемый результат: arrow.points.length === 3 с прямым углом.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №202: Выход в Управление вперед MOVE-06', () => {
  it('строит прямой L-образный маршрут при расположении цели впереди', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 100, y: 100, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 300, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [{ x: 300, y: 150 }, { x: 600, y: 300 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b1, 20, 0, [], [b1, b2]);
    expect(a.points.length).toBe(3);
    expect(a.points[1].x).toBe(600);
    expect(a.points[1].y).toBe(150);
  });
});

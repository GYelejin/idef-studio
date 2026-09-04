/**
 * ТЕСТ №201: Адаптация: Построение петли обратной связи под блоками (Subcase B1 Feedback)
 * 
 * Класс эквивалентности: MOVE-05 (Block Move Feedback Loop Under Blocks)
 * Описание: Проверяет построение обходного маршрута под блоками, когда источник смещен правее приемника.
 * Предусловия:
 *   - Блок 1 правее Блока 2, стрелка идет справа налево.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить количество точек (>= 6).
 * Ожидаемый результат: Стрелка обходит блоки снизу с сохранением ортогональности.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №201: Обход под блоками MOVE-05', () => {
  it('строит обходную петлю под блоками при обратном направлении потока', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 600, y: 100, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 200, y: 100, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Обратная связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 800, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 200, y: 150 } },
      role: 'output',
      points: [{ x: 800, y: 150 }, { x: 200, y: 150 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b1, 20, 0, [], [b1, b2]);
    expect(a.points.length).toBe(6);
  });
});

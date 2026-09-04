/**
 * ТЕСТ №209: Адаптация: Слияние стрелки в узел магистрали (Case F Merge)
 * 
 * Класс эквивалентности: MOVE-13 (Block Move Merge Arrow into Junction)
 * Описание: Проверяет смещение стрелки слияния при перемещении блока-источника.
 * Предусловия:
 *   - Стрелка идет от блока в узел слияния.
 * Действия:
 *   1. Сместить блок на (50, 30).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Начало стрелки смещается синхронно с блоком.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №209: Слияние в узел MOVE-13', () => {
  it('адаптирует стрелку слияния при сдвиге блока-источника', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'merge', point: { x: 500, y: 350 }, parentArrowId: 'trunk', childArrowIds: ['merge1'] };
    const mergeArr: Arrow = {
      id: 'merge1',
      label: 'Слияние',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'junction', id: 'j1', point: { x: 500, y: 350 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 350 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(mergeArr, b, 50, 30, [junc], [b]);
    expect(mergeArr.source.point.x).toBe(450);
    expect(mergeArr.source.point.y).toBe(280);
  });
});

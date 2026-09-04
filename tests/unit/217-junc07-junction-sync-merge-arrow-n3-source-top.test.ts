/**
 * ТЕСТ №217: Синхронизация узлов: Слияние из 3 точек с источником на верхней грани
 * 
 * Класс эквивалентности: JUNC-07 (Sync Merge Arrow n=3 Source Top)
 * Описание: Проверяет обновление промежуточных точек L-образного слияния сверху.
 * Предусловия:
 *   - Стрелка слияния начинается сверху (role: 'control').
 * Действия:
 *   1. Сместить узел junc.point.
 *   2. Вызвать synchronizeJunctions.
 * Ожидаемый результат: Промежуточный угол подстраивается под Y узла.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №217: Слияние сверху n=3 JUNC-07', () => {
  it('подстраивает промежуточную точку слияния сверху', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'left', point: { x: 30, y: 300 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } }, role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false },
        { id: 'merge', label: 'Управление', source: { type: 'border', side: 'top', point: { x: 400, y: 40 } }, target: { type: 'junction', id: 'j1', point: { x: 500, y: 300 } }, role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 300 }, { x: 500, y: 300 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'merge', point: { x: 550, y: 300 }, parentArrowId: 'trunk', childArrowIds: ['merge'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[2].x).toBe(550);
  });
});

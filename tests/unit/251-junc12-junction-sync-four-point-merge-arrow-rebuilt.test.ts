/**
 * ТЕСТ №251: Синхронизация узлов: Полный пересчет 4-точечной стрелки слияния
 * 
 * Класс эквивалентности: JUNC-12 (Sync 4-Point Merge Rebuilt)
 * Описание: Проверяет полную перетрассировку через buildOrthogonalRoute для стрелки слияния из 4 и более точек.
 * Предусловия:
 *   - Стрелка слияния из 4 точек входит в узел.
 * Действия:
 *   1. Сместить узел и вызвать synchronizeJunctions.
 *   2. Проверить конечную точку стрелки.
 * Ожидаемый результат: Конечная точка стрелки совпадает с новой позицией узла.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №251: 4-точечное слияние JUNC-12', () => {
  it('перетрассирует 4-точечную стрелку слияния при сдвиге узла', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'left', point: { x: 30, y: 300 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } }, role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false },
        { id: 'merge', label: 'Приток', source: { type: 'border', side: 'top', point: { x: 200, y: 40 } }, target: { type: 'junction', id: 'j1', point: { x: 500, y: 300 } }, role: 'control', points: [{ x: 200, y: 40 }, { x: 200, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 300 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'merge', point: { x: 550, y: 300 }, parentArrowId: 'trunk', childArrowIds: ['merge'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[diag.arrows[1].points.length - 1].x).toBe(550);
  });
});

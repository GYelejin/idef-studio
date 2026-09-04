/**
 * ТЕСТ №218: Синхронизация узлов: Слияние из 3 точек с источником на левой грани
 * 
 * Класс эквивалентности: JUNC-08 (Sync Merge Arrow n=3 Source Left)
 * Описание: Проверяет обновление промежуточного вертикального канала слияния слева.
 * Предусловия:
 *   - Стрелка слияния начинается слева.
 * Действия:
 *   1. Сместить узел junc.point.
 *   2. Вызвать synchronizeJunctions.
 * Ожидаемый результат: Промежуточный канал выравнивается по X узла.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №218: Слияние слева n=3 JUNC-08', () => {
  it('подстраивает вертикальный коридор слияния слева', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'top', point: { x: 500, y: 40 } }, target: { type: 'border', side: 'bottom', point: { x: 500, y: 865 } }, role: 'control', points: [{ x: 500, y: 40 }, { x: 500, y: 865 }], pinned: false },
        { id: 'merge', label: 'Поток', source: { type: 'border', side: 'left', point: { x: 30, y: 250 } }, target: { type: 'junction', id: 'j1', point: { x: 500, y: 250 } }, role: 'input', points: [{ x: 30, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 250 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'merge', point: { x: 500, y: 350 }, parentArrowId: 'trunk', childArrowIds: ['merge'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[2].y).toBe(350);
  });
});

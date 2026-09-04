/**
 * ТЕСТ №216: Синхронизация узлов: Слияние из 2 точек (synchronizeJunctions)
 * 
 * Класс эквивалентности: JUNC-06 (Sync Merge Arrow n=2)
 * Описание: Проверяет пересчет стрелки слияния при смещении узла на стволе.
 * Предусловия:
 *   - Стрелка слияния из 2 точек входит в узел junc.
 * Действия:
 *   1. Сместить junc.point на Y=300.
 *   2. Вызвать synchronizeJunctions.
 * Ожидаемый результат: Конечная точка стрелки обновлена до новой позиции узла.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №216: Слияние из 2 точек JUNC-06', () => {
  it('синхронизирует стрелку слияния при перемещении узла', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false },
        { id: 'merge', label: 'Вход', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'junction', id: 'j1', point: { x: 500, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 500, y: 200 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'merge', point: { x: 550, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['merge'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[1].x).toBe(550);
  });
});

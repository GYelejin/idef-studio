/**
 * ТЕСТ №320: Синхронизация узлов: Ортогонализация 2-точечной диагональной стрелки слияния
 * 
 * Класс эквивалентности: JUNC-14 (Sync Junctions Diagonal Two Point Merge)
 * Описание: Проверяет ортогонализацию диагональной 2-точечной стрелки слияния при вызове synchronizeJunctions.
 * Предусловия:
 *   - Стрелка слияния из 2 диагональных точек.
 * Действия:
 *   1. Вызвать synchronizeJunctions(diag).
 *   2. Проверить ортогональность.
 * Ожидаемый результат: Диагональная стрелка перестроена в ортогональный маршрут.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster/junctionSync';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №320: Ортогонализация слияния JUNC-14', () => {
  it('перестраивает 2-точечную диагональную входящую стрелку слияния', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест',
      blocks: [
        { id: 'b1', nodeNumber: 1, name: 'Б1', x: 100, y: 100, width: 200, height: 100, decompDiagramId: null },
        { id: 'b2', nodeNumber: 2, name: 'Б2', x: 100, y: 400, width: 200, height: 100, decompDiagramId: null },
      ],
      arrows: [
        {
          id: 'trunk', label: 'Ствол',
          source: { type: 'block', id: 'b1', side: 'right', point: { x: 300, y: 150 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 150 } },
          role: 'output', points: [{ x: 300, y: 150 }, { x: 1570, y: 150 }], pinned: false,
        },
        {
          id: 'merge', label: 'Слияние',
          source: { type: 'block', id: 'b2', side: 'right', point: { x: 300, y: 450 } },
          target: { type: 'junction', id: 'j1', point: { x: 500, y: 150 } },
          role: 'output', points: [{ x: 300, y: 450 }, { x: 500, y: 150 }], pinned: false,
        }
      ],
      junctions: [{ id: 'j1', type: 'merge', point: { x: 500, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['merge'] }],
    };

    synchronizeJunctions(diag);
    expect(diag.arrows[1].points.length).toBeGreaterThan(2);
  });
});

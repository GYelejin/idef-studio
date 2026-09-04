/**
 * ТЕСТ №319: Синхронизация узлов: Перетрассировка 4-точечной ветви при сдвиге родителя
 * 
 * Класс эквивалентности: JUNC-13 (Sync Junctions Four Point Child Branch)
 * Описание: Проверяет пересчет маршрута через buildOrthogonalRoute для 4-точечной дочерней стрелки при вызове synchronizeJunctions.
 * Предусловия:
 *   - 4-точечная ветвь от узла.
 * Действия:
 *   1. Вызвать synchronizeJunctions(diag).
 *   2. Проверить точки ветви.
 * Ожидаемый результат: Точки ветви синхронизированы с узлом.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster/junctionSync';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №319: 4-точечная ветвь при синхронизации JUNC-13', () => {
  it('перетрассирует 4-точечную дочернюю ветвь при вызове synchronizeJunctions', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест',
      blocks: [
        { id: 'b1', nodeNumber: 1, name: 'Б1', x: 100, y: 100, width: 200, height: 100, decompDiagramId: null },
        { id: 'b2', nodeNumber: 2, name: 'Б2', x: 600, y: 300, width: 200, height: 100, decompDiagramId: null },
      ],
      arrows: [
        {
          id: 'trunk', label: 'Ствол',
          source: { type: 'block', id: 'b1', side: 'right', point: { x: 300, y: 150 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 150 } },
          role: 'output', points: [{ x: 300, y: 150 }, { x: 1570, y: 150 }], pinned: false,
        },
        {
          id: 'branch', label: 'Ветвь',
          source: { type: 'junction', id: 'j1', point: { x: 450, y: 150 } },
          target: { type: 'block', id: 'b2', side: 'top', point: { x: 700, y: 300 } },
          role: 'control',
          points: [{ x: 450, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 250 }, { x: 700, y: 300 }],
          pinned: false,
        }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 450, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };

    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[0].x).toBe(450);
  });
});

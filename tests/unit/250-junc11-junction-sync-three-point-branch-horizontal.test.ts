/**
 * ТЕСТ №250: Синхронизация узлов: Адаптация 3-точечной горизонтальной ветви
 * 
 * Класс эквивалентности: JUNC-11 (Sync 3-Point Horizontal Branch)
 * Описание: Проверяет пересчет точек 3-точечной ветви при смещении узла ветвления.
 * Предусловия:
 *   - 3-точечная ветвь отходит от узла.
 * Действия:
 *   1. Сместить узел и вызвать synchronizeJunctions.
 *   2. Проверить child.points[0].
 * Ожидаемый результат: Начало ветви child.points[0] совмещено с узлом.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №250: 3-точечная ветвь JUNC-11', () => {
  it('выравнивает координаты точек 3-точечной ветви при сдвиге узла', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'top', point: { x: 400, y: 40 } }, target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } }, role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 865 }], pinned: false },
        { id: 'branch', label: 'Ветвь', source: { type: 'junction', id: 'j1', point: { x: 400, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 350 } }, role: 'output', points: [{ x: 400, y: 200 }, { x: 600, y: 200 }, { x: 1570, y: 350 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 400, y: 250 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].points[0].y).toBe(250);
  });
});

/**
 * ТЕСТ №360: Перемещение блока: Адаптация 4-точечной ветви от узла к перемещаемому блоку
 * 
 * Класс эквивалентности: MOVE-15 (Four Point Child Branch From Junction)
 * Описание: Проверяет обновление предпоследней точки 4-точечной ветви при перемещении целевого блока.
 * Предусловия:
 *   - Узел и 4-точечная дочерняя стрелка.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points[n-2].
 * Ожидаемый результат: Предпоследняя точка выровнена по целевому порту блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №360: 4-точечная ветвь от узла MOVE-15', () => {
  it('адаптирует предпоследнюю точку 4-точечной ветви при сдвиге целевого блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 600, y: 300, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 450, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['a1'] };
    const arrow: Arrow = {
      id: 'a1', label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 450, y: 150 } },
      target: { type: 'block', id: 'b1', side: 'top', point: { x: 700, y: 300 } },
      role: 'control',
      points: [{ x: 450, y: 150 }, { x: 500, y: 150 }, { x: 700, y: 300 }, { x: 700, y: 300 }],
      pinned: true,
    };

    adjustArrowOnBlockMove(arrow, b, 50, 40, [junc]);
    expect(arrow.target.point.x).toBe(750);
    expect(arrow.points[arrow.points.length - 2].x).toBe(750);
  });
});

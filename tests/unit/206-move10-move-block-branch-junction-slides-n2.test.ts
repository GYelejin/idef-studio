/**
 * ТЕСТ №206: Адаптация: Скольжение узла ветвления вдоль ствола (Case E n=2)
 * 
 * Класс эквивалентности: MOVE-10 (Block Move Branch Junction Slides n=2)
 * Описание: Проверяет скольжение точки ветвления по стволу при горизонтальном перемещении целевого блока 2-точечной ветви.
 * Предусловия:
 *   - Вертикальное ответвление из 2 точек от ствола к Управлению целевого блока.
 * Действия:
 *   1. Сместить целевой блок на dx=80.
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: junc.point.x смещается на +80, удерживая стрелку вертикальной.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №206: Скольжение узла ветвления MOVE-10', () => {
  it('смещает узел ветвления вдоль ствола синхронно с целевым блоком', () => {
    const b: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 600, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch',
      label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 600, y: 150 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [{ x: 600, y: 150 }, { x: 600, y: 300 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(branch, b, 80, 0, [junc], [b]);
    expect(junc.point.x).toBe(680);
    expect(branch.points[0].x).toBe(680);
  });
});

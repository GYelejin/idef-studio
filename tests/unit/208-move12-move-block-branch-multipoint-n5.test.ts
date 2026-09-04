/**
 * ТЕСТ №208: Адаптация: Многозвенное ответвление при сдвиге блока (Case E n>=5)
 * 
 * Класс эквивалентности: MOVE-12 (Block Move Multi-point Branch n>=5)
 * Описание: Проверяет адаптацию сложной обходной ветви при сдвиге блока-приемника.
 * Предусловия:
 *   - Ветвь из 5 точек входит в блок.
 * Действия:
 *   1. Сместить блок на (30, 40).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Целевая точка и предпоследняя точка смещаются синхронно.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №208: Многозвенная ветвь MOVE-12', () => {
  it('адаптирует сложную обходную ветвь при сдвиге целевого блока', () => {
    const b: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 200, y: 100 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch',
      label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 200, y: 100 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 350 } },
      role: 'input',
      points: [{ x: 200, y: 100 }, { x: 200, y: 250 }, { x: 450, y: 250 }, { x: 450, y: 350 }, { x: 500, y: 350 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(branch, b, 30, 40, [junc], [b]);
    expect(branch.target.point.x).toBe(530);
    expect(branch.target.point.y).toBe(390);
  });
});

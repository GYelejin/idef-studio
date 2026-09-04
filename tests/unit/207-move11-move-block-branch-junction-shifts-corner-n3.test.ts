/**
 * ТЕСТ №207: Адаптация: Подстройка угла 3-точечного ответвления (Case E n=3)
 * 
 * Класс эквивалентности: MOVE-11 (Block Move Branch Shifts Corner n=3)
 * Описание: Проверяет сохранение позиции узла на стволе со смещением промежуточного угла ветвления вслед за целевым блоком.
 * Предусловия:
 *   - 3-точечное ответвление от неподвижного узла.
 * Действия:
 *   1. Сместить целевой блок на (40, 50).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: junc.point остается на месте, угол pts[1].x следует за блоком.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №207: Угол 3-точечной ветви MOVE-11', () => {
  it('сохраняет узел на стволе и подстраивает угол ветвления', () => {
    const b: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 500, y: 300, width: 200, height: 100, decompDiagramId: null };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 300, y: 150 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch',
      label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 300, y: 150 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [{ x: 300, y: 150 }, { x: 600, y: 150 }, { x: 600, y: 300 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(branch, b, 40, 50, [junc], [b]);
    expect(junc.point.x).toBe(300);
    expect(branch.points[1].x).toBe(640);
  });
});

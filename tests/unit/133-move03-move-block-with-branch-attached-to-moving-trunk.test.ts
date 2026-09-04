/**
 * ТЕСТ №133: Адаптация: Смещение блока-источника ствола с привязанным ответвлением
 * 
 * Класс эквивалентности: MOVE-03 (Block Move with Branch on Trunk)
 * Описание: Проверяет смещение магистральной стрелки с синхронным пересчетом координат узла ветвления и дочерней ветви.
 * Предусловия:
 *   - Магистраль между блоками имеет узел ветвления.
 * Действия:
 *   1. Сместить первый блок на (50, 30).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Ствол перемещен, геометрия ветви сохраняет целостность соединения.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block, Junction } from '../../src/types/idef0';

describe('ТЕСТ №133: Смещение ствола с ветвлением MOVE-03', () => {
  it('адаптирует ствол стрелки при перемещении блока-источника', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const trunk: Arrow = {
      id: 'trunk',
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 250 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 600, y: 250 }],
      pinned: false,
    };
    const junc: Junction = {
      id: 'j1',
      type: 'branch',
      point: { x: 480, y: 250 },
      parentArrowId: 'trunk',
      childArrowIds: [],
    };
    adjustArrowOnBlockMove(trunk, b1, 50, 30, [junc], [b1, b2]);
    expect(trunk.source.point.x).toBe(450);
    expect(trunk.source.point.y).toBe(280);
  });
});

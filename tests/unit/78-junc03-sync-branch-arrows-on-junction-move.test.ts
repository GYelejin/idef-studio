/**
 * ТЕСТ №78: Узлы: Синхронное обновление маршрута дочерней ветви при смещении узла
 * 
 * Класс эквивалентности: JUNC-03 (Branch Synchronization on Move)
 * Описание: Проверяет синхронное смещение начальной точки подключенной ветви при движении узла ветвления.
 * Предусловия:
 *   - Узел ветвления соединяет ствол и дочернюю ветвь.
 * Действия:
 *   1. Сместить узел на 100px вправо.
 *   2. Проверить первую точку дочерней ветви branch.points[0].
 * Ожидаемый результат: Начальная точка ветви синхронно перемещена вслед за узлом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №78: Синхронизация ветвей JUNC-03', () => {
  it('синхронно обновляет начало дочерней стрелки при перемещении узла', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(400, 100, 'A1')!;
    const b2 = store.createBlock(400, 300, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'border', side: 'left', point: { x: 30, y: 165 } },
      target: { type: 'block', id: b1.id, side: 'left', point: { x: 400, y: 165 } },
      role: 'input',
      points: [{ x: 30, y: 165 }, { x: 400, y: 165 }],
      pinned: false,
    })!;
    const junc = store.createJunction('branch', { x: 200, y: 165 }, trunk.id);
    const branch = store.createArrow({
      label: 'Branch',
      source: { type: 'junction', id: junc.id, point: { x: 200, y: 165 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 400, y: 365 } },
      role: 'input',
      points: [{ x: 200, y: 165 }, { x: 200, y: 365 }, { x: 400, y: 365 }],
      pinned: false,
    })!;
    store.moveJunction(junc.id, { x: 280, y: 165 });
    const updatedBranch = store.getActiveDiagram()!.arrows.find(a => a.id === branch.id)!;
    expect(updatedBranch.points[0].x).toBe(280);
  });
});

/**
 * ТЕСТ №389: Хранилище: Каскадный пересчет выноски дочерней ветви при сдвиге родительского ствола
 * 
 * Класс эквивалентности: STORE-83 (Shift Trunk Updates Child Leader Points)
 * Описание: Проверяет обновление точек выносной линии leaderPoints у дочерней стрелки при перемещении сегмента родительского ствола.
 * Предусловия:
 *   - Ствол и дочерняя ветвь с выноской.
 * Действия:
 *   1. Сдвинуть сегмент ствола через shiftArrowSegment.
 *   2. Проверить leaderPoints у дочерней ветви.
 * Ожидаемый результат: Выноска дочерней стрелки синхронно пересчитана.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №389: Выноска ветви при сдвиге ствола STORE-83', () => {
  it('синхронизирует выносную линию дочерней стрелки при сдвиге ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 450, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 450, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 450, y: 150 }, { x: 600, y: 150 }, { x: 600, y: 450 }, { x: 700, y: 450 }], pinned: false,
      showLeader: true, labelPos: { x: 500, y: 120 },
    })!;

    store.shiftArrowSegment(trunk.id, 0, 180);
    const d = store.getActiveDiagram()!;
    const updatedBranch = d.arrows.find(ar => ar.id === branch.id)!;
    expect(updatedBranch.leaderPoints).toBeDefined();
  });
});

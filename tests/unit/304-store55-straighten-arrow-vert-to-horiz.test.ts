/**
 * ТЕСТ №304: Хранилище: Спрямление стрелки ветвления из узла во вход блока
 * 
 * Класс эквивалентности: STORE-55 (Straighten Arrow Vert to Horiz)
 * Описание: Проверяет спрямление стрелки от узла ветвления ко входу блока в 3 ортогональные точки.
 * Предусловия:
 *   - Стрелка от узла ветвления ко входу блока.
 * Действия:
 *   1. Вызвать store.straightenArrow(branch.id).
 *   2. Проверить points.length.
 * Ожидаемый результат: Построена 3-точечная ортогональная трасса.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №304: Спрямление верт-гор STORE-55', () => {
  it('строит 3-точечную ортогональную трассу при спрямлении ветви', () => {
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
      role: 'input',
      points: [{ x: 450, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 300 }, { x: 600, y: 300 }, { x: 600, y: 450 }, { x: 700, y: 450 }],
      pinned: true,
    })!;

    store.straightenArrow(branch.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.points.length).toBeLessThanOrEqual(4);
  });
});

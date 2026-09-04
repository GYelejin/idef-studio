/**
 * ТЕСТ №303: Хранилище: Спрямление стрелки из горизонтальной грани в вертикальную (right -> top)
 * 
 * Класс эквивалентности: STORE-54 (Straighten Arrow Horiz to Vert)
 * Описание: Проверяет спрямление стрелки между правой гранью блока и верхней гранью следующего блока в 3 ортогональные точки.
 * Предусловия:
 *   - Стрелка из block1 right в block2 top.
 * Действия:
 *   1. Вызвать store.straightenArrow(a.id).
 *   2. Проверить points.length === 3.
 * Ожидаемый результат: Маршрут спрямлен в L-образную ортогональную ломаную из 3 точек.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №303: Спрямление гор-верт STORE-54', () => {
  it('строит 3-точечную ортогональную трассу при спрямлении из right в top', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(400, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 500, y: 300 } },
      role: 'control',
      points: [{ x: 310, y: 150 }, { x: 350, y: 150 }, { x: 350, y: 200 }, { x: 500, y: 200 }, { x: 500, y: 300 }],
      pinned: true,
    })!;

    store.straightenArrow(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBe(3);
  });
});

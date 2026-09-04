/**
 * ТЕСТ №416: Узлы: Перетрассировка 4-точечной ветви при смещении родительского узла
 * 
 * Класс эквивалентности: JUNC-20 (Move Junction Reroutes Four Point Child Branch)
 * Описание: Проверяет вызов buildOrthogonalRoute для дочерней ветви из 4+ точек при смещении узла на магистрали.
 * Предусловия:
 *   - Ствол и 4-точечная дочерняя ветвь.
 * Действия:
 *   1. Сместить узел через moveJunction.
 *   2. Проверить points[0].x === junc.point.x.
 * Ожидаемый результат: Начало дочерней ветви смещено вслед за узлом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №416: 4-точечная ветвь при сдвиге узла JUNC-20', () => {
  it('перетрассирует 4-точечную ветвь при перемещении узла', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 500, 'A1')!;

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
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 800, y: 500 } },
      role: 'control',
      points: [{ x: 450, y: 150 }, { x: 600, y: 150 }, { x: 600, y: 300 }, { x: 800, y: 300 }, { x: 800, y: 500 }],
      pinned: false,
    })!;

    store.moveJunction(junc.id, { x: 480, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.points[0].x).toBe(480);
  });
});

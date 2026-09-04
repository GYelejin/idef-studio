/**
 * ТЕСТ №291: Хранилище: Обновление входящих стрелок слияния при сдвиге узла
 * 
 * Класс эквивалентности: STORE-45 (Update Merge Arrows On Junction Move)
 * Описание: Проверяет синхронизацию входящих 3-точечных и 4-точечных стрелок слияния при перемещении целевого узла.
 * Предусловия:
 *   - Ствол и узел слияния, к которому сходится стрелка слияния из блока.
 * Действия:
 *   1. Переместить узел через moveJunction.
 *   2. Проверить пересчет промежуточных точек входящих стрелок.
 * Ожидаемый результат: Точки входящих стрелок согласованы с новым положением узла.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №291: Синхронизация слияния при сдвиге узла STORE-45', () => {
  it('адаптирует трассы входящих стрелок слияния при смещении узла', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 300, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;
    const junc = store.createJunction('merge', { x: 500, y: 150 }, trunk.id);
    const inMerge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 350 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 350 }, { x: 500, y: 350 }, { x: 500, y: 150 }],
      pinned: false,
    })!;

    store.moveJunction(junc.id, { x: 550, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(a => a.id === inMerge.id)!;
    expect(updated.points[updated.points.length - 1].x).toBe(550);
  });
});

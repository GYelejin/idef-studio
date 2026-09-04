/**
 * ТЕСТ №223: Хранилище: Смещение сегмента ствола со встроенным узлом слияния
 * 
 * Класс эквивалентности: STORE-20 (Shift Segment with Merge Junction)
 * Описание: Проверяет перемещение узла слияния и конца входящей стрелки при сдвиге несущего сегмента ствола.
 * Предусловия:
 *   - Ствол содержит узел слияния и входящую стрелку слияния.
 * Действия:
 *   1. Вызвать store.shiftArrowSegment.
 *   2. Проверить junc.point.
 * Ожидаемый результат: Узел слияния смещен на новую координату.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №223: Сдвиг сегмента со слиянием STORE-20', () => {
  it('синхронно перемещает узел слияния при сдвиге несущего отрезка', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(400, 400, 'A1')!;
    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 700, y: 150 }],
      pinned: true,
    })!;
    const junc = store.createJunction('merge', { x: 500, y: 150 }, trunk.id);
    const mergeArr = store.createArrow({
      label: 'Приток',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 610, y: 450 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      role: 'output',
      points: [{ x: 610, y: 450 }, { x: 500, y: 450 }, { x: 500, y: 150 }],
      pinned: true,
    })!;
    junc.childArrowIds = [mergeArr.id];
    store.shiftArrowSegment(trunk.id, 0, 190);
    const d = store.getActiveDiagram()!;
    const updatedJunc = d.junctions.find(j => j.id === junc.id)!;
    expect(updatedJunc.point.y).toBe(190);
  });
});

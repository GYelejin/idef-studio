/**
 * ТЕСТ №312: Хранилище: Синхронизация координаты X узла при сдвиге вертикального сегмента
 * 
 * Класс эквивалентности: STORE-63 (Shift Segment Updates Source Junction X)
 * Описание: Проверяет обновление координаты X узла при сдвиге начального вертикального отрезка ответвления.
 * Предусловия:
 *   - Вертикальное ответвление от узла.
 * Действия:
 *   1. Вызвать store.shiftArrowSegment(branch.id, 0, 480).
 *   2. Проверить junc.point.x === 480.
 * Ожидаемый результат: Координата X узла синхронно обновлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №312: Сдвиг вертикального звена у узла STORE-63', () => {
  it('обновляет координату X узла при сдвиге первого вертикального сегмента', () => {
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
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 450, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 450, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 450, y: 400 } },
      role: 'control',
      points: [{ x: 450, y: 150 }, { x: 450, y: 400 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(branch.id, 0, 480);
    const d = store.getActiveDiagram()!;
    const updatedJunc = d.junctions.find(j => j.id === junc.id)!;
    expect(updatedJunc.point.x).toBe(480);
  });
});

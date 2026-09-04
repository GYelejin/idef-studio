/**
 * ТЕСТ №459: Геометрия: Синхронизация входящей стрелки слияния при сдвиге вертикального ствола
 * 
 * Класс эквивалентности: GEOM-32 (Shift Vertical Trunk Updates Incoming Merge)
 * Описание: Проверяет обновление последней и предпоследней точек входящей стрелки слияния при сдвиге вертикального сегмента ствола.
 * Предусловия:
 *   - Трасса со стволом, имеющим вертикальный сегмент 1.
 * Действия:
 *   1. Сдвинуть ствол по оси X.
 *   2. Проверить смещение incoming.points[lastIdx].x.
 * Ожидаемый результат: Точки слияния согласованы со стволом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №459: Слияние в вертикальный ствол GEOM-32', () => {
  it('обновляет стрелку слияния при сдвиге вертикального ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 150, 'A1')!;
    const b2 = store.createBlock(600, 550, 'A1')!;
    const b3 = store.createBlock(100, 350, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 200 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 600 } },
      role: 'output',
      points: [{ x: 310, y: 200 }, { x: 500, y: 200 }, { x: 500, y: 600 }, { x: 600, y: 600 }],
      pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 400 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 400 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 400 } },
      role: 'output',
      points: [{ x: 310, y: 400 }, { x: 500, y: 400 }, { x: 500, y: 400 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(trunk.id, 1, 520);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[updated.points.length - 1].x).toBe(520);
  });
});

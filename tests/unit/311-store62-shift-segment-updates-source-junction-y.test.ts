/**
 * ТЕСТ №311: Хранилище: Синхронизация координаты Y узла при сдвиге родительского ствола
 * 
 * Класс эквивалентности: STORE-62 (Shift Trunk Segment Updates Junction Y)
 * Описание: Проверяет каскадное обновление координаты Y узла при сдвиге горизонтального сегмента родительского ствола.
 * Предусловия:
 *   - Ствол и узел ветвления с дочерней стрелкой.
 * Действия:
 *   1. Вызвать store.shiftArrowSegment для ствола.
 *   2. Проверить junc.point.y.
 * Ожидаемый результат: Координата Y узла переместилась вместе со стволом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №311: Сдвиг ствола обновляет узел STORE-62', () => {
  it('обновляет координату Y узла при сдвиге горизонтального ствола', () => {
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
    store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 450, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 450, y: 150 }, { x: 700, y: 450 }], pinned: false,
    });

    store.shiftArrowSegment(trunk.id, 0, 180);
    const d = store.getActiveDiagram()!;
    const updatedJunc = d.junctions.find(j => j.id === junc.id)!;
    expect(updatedJunc.point.y).toBe(180);
  });
});

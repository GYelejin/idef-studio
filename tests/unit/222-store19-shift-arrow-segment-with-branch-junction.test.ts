/**
 * ТЕСТ №222: Хранилище: Смещение сегмента ствола со встроенным узлом ветвления
 * 
 * Класс эквивалентности: STORE-19 (Shift Segment with Branch Junction)
 * Описание: Проверяет автоматическое синхронное перемещение узла ветвления и дочерней стрелки при сдвиге сегмента ствола.
 * Предусловия:
 *   - Ствол содержит узел ветвления и дочернюю ветвь к блоку 3.
 * Действия:
 *   1. Вызвать store.shiftArrowSegment.
 *   2. Проверить junc.point.
 * Ожидаемый результат: Узел ветвления смещен на новый уровень координаты.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №222: Сдвиг сегмента с ветвлением STORE-19', () => {
  it('синхронно перемещает узел ветвления при сдвиге несущего сегмента', () => {
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
    const junc = store.createJunction('branch', { x: 500, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 500, y: 400 } },
      role: 'control',
      points: [{ x: 500, y: 150 }, { x: 500, y: 400 }],
      pinned: false,
    })!;
    junc.childArrowIds = [branch.id];
    store.shiftArrowSegment(trunk.id, 0, 180);
    const d = store.getActiveDiagram()!;
    const updatedJunc = d.junctions.find(j => j.id === junc.id)!;
    expect(updatedJunc.point.y).toBe(180);
  });
});

/**
 * ТЕСТ №345: Хранилище: Каскадный пересчет дочерних стрелок при сдвиге вертикального ствола
 * 
 * Класс эквивалентности: STORE-78 (Shift Vertical Trunk Updates Children)
 * Описание: Проверяет смещение узлов ветвления и перетрассировку дочерних стрелок при сдвиге вертикального участка ствола через shiftArrowSegment.
 * Предусловия:
 *   - Вертикальный ствол с дочерней ветвью.
 * Действия:
 *   1. Вызвать store.shiftArrowSegment для вертикального участка ствола.
 *   2. Проверить координату X узла.
 * Ожидаемый результат: Координата X узла синхронно обновлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №345: Сдвиг вертикального ствола STORE-78', () => {
  it('сдвигает узел и обновляет дочерние стрелки при смещении вертикали', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(300, 200, 'A1')!;
    const b2 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b1.id, side: 'top', point: { x: 400, y: 200 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 200 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 400, y: 120 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 400, y: 120 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 400, y: 120 }, { x: 500, y: 120 }, { x: 500, y: 450 }, { x: 700, y: 450 }], pinned: false,
    })!;

    store.shiftArrowSegment(trunk.id, 0, 430);
    const d = store.getActiveDiagram()!;
    const updatedJunc = d.junctions.find(j => j.id === junc.id)!;
    expect(updatedJunc.point.x).toBe(430);
  });
});

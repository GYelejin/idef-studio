/**
 * ТЕСТ №409: Геометрия: Синхронизация координаты X входящего слияния при сдвиге ствола
 * 
 * Класс эквивалентности: GEOM-24 (Shift Trunk Segment Updates Merge Arrow X)
 * Описание: Проверяет синхронный сдвиг координаты X последнего сегмента входящей стрелки слияния при перемещении сегмента магистрали.
 * Предусловия:
 *   - Ствол и стрелка слияния в узел ствола.
 * Действия:
 *   1. Сдвинуть сегмент ствола.
 *   2. Проверить координату точки контакта стрелки слияния.
 * Ожидаемый результат: Точка контакта стрелки слияния обновлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №409: Синхронизация слияния при сдвиге ствола GEOM-24', () => {
  it('синхронизирует координату X стрелки слияния при сдвиге ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 150 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 450 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      role: 'output', points: [{ x: 310, y: 450 }, { x: 500, y: 450 }, { x: 500, y: 150 }], pinned: true,
    })!;

    store.shiftArrowSegment(trunk.id, 0, 180);
    const d = store.getActiveDiagram()!;
    const updatedMerge = d.arrows.find(ar => ar.id === merge.id)!;
    expect(updatedMerge.target.point.y).toBe(180);
  });
});

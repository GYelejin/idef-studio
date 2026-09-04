/**
 * ТЕСТ №462: Геометрия: Синхронизация горизонтального слияния при сдвиге горизонтального ствола
 * 
 * Класс эквивалентности: GEOM-35 (Shift Horizontal Trunk Updates Incoming Merge)
 * Описание: Проверяет обновление предпоследней точки incoming.points[lastIdx - 1].y стрелки слияния при смещении горизонтального ствола.
 * Предусловия:
 *   - Горизонтальный ствол и входящая стрелка слияния.
 * Действия:
 *   1. Сдвинуть ствол по Y.
 *   2. Проверить обновление координаты Y у входящей стрелки.
 * Ожидаемый результат: Координаты слияния синхронизированы по высоте ствола.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №462: Слияние в горизонтальный ствол GEOM-35', () => {
  it('обновляет стрелку слияния при сдвиге горизонтального ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 250, 'A1')!;
    const b2 = store.createBlock(100, 500, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'output', points: [{ x: 310, y: 300 }, { x: 1570, y: 300 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 600, y: 300 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b2.id, side: 'right', point: { x: 310, y: 550 } },
      target: { type: 'junction', id: junc.id, point: { x: 600, y: 300 } },
      role: 'output',
      points: [{ x: 310, y: 550 }, { x: 600, y: 550 }, { x: 600, y: 300 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(trunk.id, 0, 330);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[updated.points.length - 1].y).toBe(330);
  });
});

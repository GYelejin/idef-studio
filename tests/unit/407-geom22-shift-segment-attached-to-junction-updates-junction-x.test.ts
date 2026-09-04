/**
 * ТЕСТ №407: Геометрия: Сдвиг вертикального сегмента у узла обновляет координату X узла
 * 
 * Класс эквивалентности: GEOM-22 (Shift Segment Attached To Junction Updates Junction X)
 * Описание: Проверяет синхронное смещение координаты X узла слияния при сдвиге последнего вертикального сегмента входящей стрелки.
 * Предусловия:
 *   - Стрелка слияния с target.type: 'junction'.
 * Действия:
 *   1. Сдвинуть последний сегмент стрелки по горизонтали на X=530.
 *   2. Проверить junc.point.x === 530.
 * Ожидаемый результат: Координата X узла синхронизирована.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №407: Сдвиг вертикального сегмента у узла GEOM-22', () => {
  it('обновляет координату X узла при сдвиге прикрепленного сегмента', () => {
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

    store.shiftArrowSegment(merge.id, 1, 540);
    expect(junc.point.x).toBe(540);
  });
});

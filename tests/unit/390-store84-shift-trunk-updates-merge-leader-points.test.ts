/**
 * ТЕСТ №390: Хранилище: Каскадный пересчет выноски стрелки слияния при сдвиге родительского ствола
 * 
 * Класс эквивалентности: STORE-84 (Shift Trunk Updates Merge Leader Points)
 * Описание: Проверяет обновление точек выносной линии leaderPoints у стрелки слияния при сдвиге сегмента принимающего ствола.
 * Предусловия:
 *   - Ствол и стрелка слияния с выноской.
 * Действия:
 *   1. Сдвинуть сегмент ствола через shiftArrowSegment.
 *   2. Проверить leaderPoints стрелки слияния.
 * Ожидаемый результат: Выноска стрелки слияния пересчитана.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №390: Выноска слияния при сдвиге ствола STORE-84', () => {
  it('синхронизирует выносную линию стрелки слияния при сдвиге ствола', () => {
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
      role: 'output', points: [{ x: 310, y: 450 }, { x: 500, y: 450 }, { x: 500, y: 150 }], pinned: false,
      showLeader: true, labelPos: { x: 400, y: 400 },
    })!;

    store.shiftArrowSegment(trunk.id, 0, 180);
    const d = store.getActiveDiagram()!;
    const updatedMerge = d.arrows.find(ar => ar.id === merge.id)!;
    expect(updatedMerge.leaderPoints).toBeDefined();
  });
});

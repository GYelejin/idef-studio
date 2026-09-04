/**
 * ТЕСТ №80: Узлы: Синхронное обновление входящей стрелки слияния при сдвиге узла
 * 
 * Класс эквивалентности: JUNC-05 (Merge Synchronization on Move)
 * Описание: Проверяет синхронное смещение конечной точки стрелки притока при перемещении узла слияния.
 * Предусловия:
 *   - Узел слияния объединяет магистраль и входящую стрелку притока.
 * Действия:
 *   1. Сместить узел слияния.
 *   2. Проверить координаты конца стрелки притока.
 * Ожидаемый результат: Конечная точка стрелки притока точно совпадает с новой координатой узла слияния.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №80: Синхронизация слияния JUNC-05', () => {
  it('синхронно обновляет конечную точку стрелки притока при сдвиге узла слияния', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(100, 300, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 165 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 165 } },
      role: 'output',
      points: [{ x: 310, y: 165 }, { x: 1570, y: 165 }],
      pinned: false,
    })!;
    const junc = store.createJunction('merge', { x: 600, y: 165 }, trunk.id);
    const tributary = store.createArrow({
      label: 'Tributary',
      source: { type: 'block', id: b2.id, side: 'right', point: { x: 310, y: 365 } },
      target: { type: 'junction', id: junc.id, point: { x: 600, y: 165 } },
      role: 'output',
      points: [{ x: 310, y: 365 }, { x: 600, y: 365 }, { x: 600, y: 165 }],
      pinned: false,
    })!;
    store.moveJunction(junc.id, { x: 750, y: 165 });
    const updatedTrib = store.getActiveDiagram()!.arrows.find(a => a.id === tributary.id)!;
    const lastPt = updatedTrib.points[updatedTrib.points.length - 1];
    expect(lastPt.x).toBe(750);
  });
});

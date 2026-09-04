/**
 * ТЕСТ №437: Узлы: Синхронизация промежуточной точки 3-точечного слияния сверху
 * 
 * Класс эквивалентности: JUNC-22 (Move Junction Updates Three Point Merge From Top)
 * Описание: Проверяет обновление промежуточной точки (points[1].y = junc.point.y) для 3-точечной входящей стрелки слияния со стороны 'top'.
 * Предусловия:
 *   - Ствол и 3-точечная стрелка слияния из top.
 * Действия:
 *   1. Сместить узел по оси Y.
 *   2. Проверить points[1].y === junc.point.y.
 * Ожидаемый результат: Промежуточная точка выровнена по высоте узла.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №437: 3-точечное слияние сверху JUNC-22', () => {
  it('синхронизирует промежуточную точку 3-точечного слияния сверху с узлом', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 500, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 300 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 550 } },
      role: 'output', points: [{ x: 310, y: 300 }, { x: 500, y: 300 }, { x: 500, y: 550 }, { x: 700, y: 550 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 300 }, trunk.id);
    const merge: Arrow = {
      id: 'merge-arrow-1',
      label: 'Слияние',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 300 } },
      role: 'control',
      points: [{ x: 500, y: 40 }, { x: 500, y: 300 }, { x: 500, y: 300 }],
      pinned: true,
    };
    diag.arrows.push(merge);

    store.moveJunction(junc.id, { x: 500, y: 350 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[1].y).toBe(350);
  });
});

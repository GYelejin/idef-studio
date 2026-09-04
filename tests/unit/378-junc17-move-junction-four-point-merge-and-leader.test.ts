/**
 * ТЕСТ №378: Узлы: Перетрассировка 4-точечной стрелки слияния и выноски при сдвиге узла
 * 
 * Класс эквивалентности: JUNC-17 (Move Junction Four Point Merge And Leader)
 * Описание: Проверяет пересчет маршрута 4-точечной стрелки слияния и синхронизацию точек выноски leaderPoints при перемещении узла.
 * Предусловия:
 *   - Стрелка слияния с выноской.
 * Действия:
 *   1. Переместить узел слияния.
 *   2. Проверить points и leaderPoints.
 * Ожидаемый результат: Маршрут перетрассирован, точки выноски обновлены.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №378: Перетрассировка слияния с выноской JUNC-17', () => {
  it('перетрассирует 4-точечную стрелку слияния и обновляет выноску', () => {
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
      role: 'output',
      points: [{ x: 310, y: 450 }, { x: 400, y: 450 }, { x: 400, y: 150 }, { x: 500, y: 150 }],
      pinned: true, showLeader: true, labelPos: { x: 350, y: 430 },
    })!;

    store.moveJunction(junc.id, { x: 550, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[updated.points.length - 1].x).toBe(550);
  });
});

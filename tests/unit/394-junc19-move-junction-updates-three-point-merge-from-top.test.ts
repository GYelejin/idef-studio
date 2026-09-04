/**
 * ТЕСТ №394: Узлы: Адаптация 3-точечной стрелки слияния при сдвиге узла
 * 
 * Класс эквивалентности: JUNC-19 (Move Junction Updates Three Point Merge)
 * Описание: Проверяет обновление промежуточного угла 3-точечной стрелки слияния при смещении узла на магистрали.
 * Предусловия:
 *   - Ствол между блоками и 3-точечная стрелка слияния из правого выхода блока 3.
 * Действия:
 *   1. Сместить узел через moveJunction.
 *   2. Проверить points[1].x === junc.point.x.
 * Ожидаемый результат: Промежуточный изгиб выровнен по X узла.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №394: Слияние при сдвиге узла JUNC-19', () => {
  it('синхронизирует промежуточную точку стрелки слияния с узлом', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 300, 'A1')!;
    const b2 = store.createBlock(700, 300, 'A1')!;
    const b3 = store.createBlock(100, 100, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 350 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 350 } },
      role: 'output', points: [{ x: 310, y: 350 }, { x: 700, y: 350 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 350 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 350 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 350 }],
      pinned: false,
    })!;

    store.moveJunction(junc.id, { x: 530, y: 350 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[1].x).toBe(530);
  });
});

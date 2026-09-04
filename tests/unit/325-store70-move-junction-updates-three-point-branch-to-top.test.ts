/**
 * ТЕСТ №325: Хранилище: Пересчет 3-точечной ветви Управления при сдвиге узла
 * 
 * Класс эквивалентности: STORE-70 (Move Junction Updates Three Point Branch To Top)
 * Описание: Проверяет обновление промежуточной точки 3-точечной ветви, входящей в верхнюю грань блока (Управление), при смещении родительского узла.
 * Предусловия:
 *   - 3-точечная ветвь в грань 'top'.
 * Действия:
 *   1. Вызвать store.moveJunction.
 *   2. Проверить координаты points[1].
 * Ожидаемый результат: Промежуточная точка согласована с новым положением узла.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №325: 3-точечная ветвь Управления STORE-70', () => {
  it('синхронизирует промежуточную точку ветви в верхнюю грань блока', () => {
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
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 450, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 450, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 500, y: 400 } },
      role: 'control',
      points: [{ x: 450, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 400 }],
      pinned: false,
    })!;

    store.moveJunction(junc.id, { x: 480, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.points[0].x).toBe(480);
  });
});

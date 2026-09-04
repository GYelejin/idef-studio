/**
 * ТЕСТ №289: Хранилище: Восстановление родителя при перемещении узла
 * 
 * Класс эквивалентности: STORE-43 (Move Junction Locates Parent Proximity)
 * Описание: Проверяет автоматическое определение родительского ствола по близости к сегменту при вызове moveJunction без parentArrowId.
 * Предусловия:
 *   - Узел без parentArrowId лежит рядом со стволом.
 * Действия:
 *   1. Вызвать moveJunction.
 *   2. Проверить parentArrowId.
 * Ожидаемый результат: parentArrowId восстановлен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №289: Восстановление родителя узла STORE-43', () => {
  it('определяет родительскую стрелку по координатам при вызове moveJunction', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;
    const junc = store.createJunction('branch', { x: 400, y: 150 }, trunk.id);
    junc.parentArrowId = undefined as any;
    store.moveJunction(junc.id, { x: 450, y: 150 });
    expect(junc.parentArrowId).toBe(trunk.id);
  });
});

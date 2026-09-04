/**
 * ТЕСТ №290: Хранилище: Ограничение смещения узла защитным отступом 15px от концов стрелки
 * 
 * Класс эквивалентности: STORE-44 (Move Junction Clamps Margin 15px)
 * Описание: Проверяет принудительное удержание узла на расстоянии не ближе 15px к началу и концу сегмента.
 * Предусловия:
 *   - Ствол от (100, 200) до (500, 200).
 * Действия:
 *   1. Переместить узел в точку (105, 200).
 *   2. Проверить junc.point.x >= 115.
 * Ожидаемый результат: Координата ограничена отступом 15px от начала.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №290: Защитный отступ узла от концов STORE-44', () => {
  it('удерживает узел на расстоянии не ближе 15px к портам стрелки', () => {
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
    store.moveJunction(junc.id, { x: 315, y: 150 });
    expect(junc.point.x).toBeGreaterThanOrEqual(325);
  });
});

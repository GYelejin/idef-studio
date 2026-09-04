/**
 * ТЕСТ №387: Хранилище: Наследование цвета родительского ствола при создании ветви
 * 
 * Класс эквивалентности: STORE-81 (Branch Inherits Parent Trunk Color)
 * Описание: Проверяет автоматическое присвоение цвета родительского ствола (color) новой дочерней ветви при её создании от узла ветвления на цветном стволе.
 * Предусловия:
 *   - Цветной родительский ствол (color: '#f59e0b') и узел ветвления.
 * Действия:
 *   1. Создать дочернюю ветвь от узла junc.id.
 *   2. Проверить цвет созданной ветви.
 * Ожидаемый результат: Дочерняя ветвь унаследовала цвет '#f59e0b'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №387: Наследование цвета ствола STORE-81', () => {
  it('автоматически присваивает цвет родителя создаваемой ветви', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Цветной ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
      color: '#f59e0b',
    })!;

    const junc = store.createJunction('branch', { x: 500, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 450 }], pinned: false,
    })!;

    expect(branch?.color).toBe('#f59e0b');
  });
});

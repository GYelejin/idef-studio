/**
 * ТЕСТ №376: Узлы: Ограничение смещения узла не ближе 15px к концу горизонтальной стрелки
 * 
 * Класс эквивалентности: JUNC-15 (Move Junction Clamps Horizontal End Margin)
 * Описание: Проверяет принудительное ограничение координаты узла ветвления на расстоянии не ближе 15px до цели горизонтального родительского ствола.
 * Предусловия:
 *   - Горизонтальный ствол заканчивается в точке X=700.
 * Действия:
 *   1. Переместить узел в точку X=695.
 *   2. Проверить junc.point.x <= 685.
 * Ожидаемый результат: Узел удержан на безопасном расстоянии 15px от конца стрелки.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №376: Защита конца горизонтального ствола JUNC-15', () => {
  it('не дает узлу подойти ближе 15px к концу горизонтального ствола', () => {
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

    const junc = store.createJunction('branch', { x: 500, y: 150 }, trunk.id);
    store.moveJunction(junc.id, { x: 695, y: 150 });
    expect(junc.point.x).toBeLessThanOrEqual(685);
  });
});

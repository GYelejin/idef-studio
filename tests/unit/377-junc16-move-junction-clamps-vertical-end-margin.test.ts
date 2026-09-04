/**
 * ТЕСТ №377: Узлы: Ограничение смещения узла не ближе 15px к концу вертикальной стрелки
 * 
 * Класс эквивалентности: JUNC-16 (Move Junction Clamps Vertical End Margin)
 * Описание: Проверяет принудительное ограничение координаты узла не ближе 15px до конца вертикального ствола Управления.
 * Предусловия:
 *   - Вертикальный ствол от Y=40 до Y=400.
 * Действия:
 *   1. Сдвинуть узел в точку Y=395.
 *   2. Проверить junc.point.y <= 385.
 * Ожидаемый результат: Узел удержан на безопасном расстоянии 15px от цели.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №377: Защита конца вертикального ствола JUNC-16', () => {
  it('не дает узлу подойти ближе 15px к концу вертикального ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 400 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 400 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 400, y: 200 }, trunk.id);
    store.moveJunction(junc.id, { x: 400, y: 395 });
    expect(junc.point.y).toBeLessThanOrEqual(385);
  });
});

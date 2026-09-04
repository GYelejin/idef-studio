/**
 * ТЕСТ №324: Хранилище: Защитный отступ узла на вертикальном родительском стволе
 * 
 * Класс эквивалентности: STORE-69 (Move Junction Vertical Parent Clamps Margin)
 * Описание: Проверяет принудительное ограничение смещения узла по оси Y не ближе 15px к началу вертикального ствола Управления.
 * Предусловия:
 *   - Вертикальный ствол Управления от границы top (Y=40) до блока top (Y=300).
 * Действия:
 *   1. Переместить узел в точку (400, 45).
 *   2. Проверить junc.point.y >= 55.
 * Ожидаемый результат: Координата Y ограничена отступом 15px от границы (не ближе 55).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №324: Отступ узла на вертикали STORE-69', () => {
  it('удерживает узел на вертикальном стволе на расстоянии не ближе 15px', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 300, 'A1')!;

    const trunk = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 300 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 300 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 400, y: 150 }, trunk.id);
    store.moveJunction(junc.id, { x: 400, y: 45 });
    expect(junc.point.y).toBeGreaterThanOrEqual(55);
  });
});

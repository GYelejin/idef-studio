/**
 * ТЕСТ №139: Переподключение: Переключение конца стрелки на левую грань блока (Вход)
 * 
 * Класс эквивалентности: RECONN-07 (Reconnect Target to Block Left)
 * Описание: Проверяет подключение приемника стрелки к левой грани блока (Вход).
 * Предусловия:
 *   - Стрелка направлена в верхнюю грань блока.
 * Действия:
 *   1. Переподключить конец к левой грани.
 *   2. Проверить target.side.
 * Ожидаемый результат: Целевая грань стрелки успешно переключена на 'left'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №139: Переподключение к грани Входа RECONN-07', () => {
  it('переключает конец стрелки на левую грань блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 600, y: 200 } },
      role: 'control',
      points: [{ x: 310, y: 265 }, { x: 600, y: 200 }],
      pinned: false,
    })!;
    store.reconnectArrowEndpoint(a.id, 'target', { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 265 } }, { x: 500, y: 265 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('left');
  });
});

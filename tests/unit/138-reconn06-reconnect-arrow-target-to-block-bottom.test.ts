/**
 * ТЕСТ №138: Переподключение: Переключение конца стрелки на нижнюю грань блока (Механизм)
 * 
 * Класс эквивалентности: RECONN-06 (Reconnect Target to Block Bottom)
 * Описание: Проверяет переподключение стрелки к нижней контактной грани блока.
 * Предусловия:
 *   - Стрелка направлена в левую грань блока.
 * Действия:
 *   1. Переподключить конец к нижней грани блока.
 *   2. Проверить обновленный эндпоинт.
 * Ожидаемый результат: Целевой эндпоинт указывает на нижнюю грань блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №138: Переподключение к грани Механизма RECONN-06', () => {
  it('переключает конец стрелки на нижнюю грань блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 400, y: 265 }],
      pinned: false,
    })!;
    store.reconnectArrowEndpoint(a.id, 'target', { type: 'block', id: b.id, side: 'bottom', point: { x: 500, y: 330 } }, { x: 500, y: 330 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('bottom');
  });
});

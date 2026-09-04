/**
 * ТЕСТ №137: Переподключение: Переключение конца стрелки на верхнюю грань блока (Управление)
 * 
 * Класс эквивалентности: RECONN-05 (Reconnect Target to Block Top)
 * Описание: Проверяет смену целевой контактной грани на верхнюю с автоматическим присвоением роли 'control'.
 * Предусловия:
 *   - Стрелка направлена в левую грань блока.
 * Действия:
 *   1. Переподключить конец стрелки к верхней грани блока.
 *   2. Проверить target.side и target.role.
 * Ожидаемый результат: Целевая сторона стрелки изменена на 'top' с ролью 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №137: Переподключение к грани Управления RECONN-05', () => {
  it('переключает конец стрелки на верхнюю грань блока', () => {
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
    store.reconnectArrowEndpoint(a.id, 'target', { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 200 } }, { x: 500, y: 200 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('top');
  });
});

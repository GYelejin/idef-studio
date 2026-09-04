/**
 * ТЕСТ №272: Хранилище: Запрет открепления источника при уже открепленной цели
 * 
 * Класс эквивалентности: STORE-29 (Reject Both Unattached on Source)
 * Описание: Проверяет отклонение попытки переподключить источник в unattached при открепленной цели.
 * Предусловия:
 *   - Стрелка с unattached целью.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint('source', { type: 'unattached' }).
 *   2. Проверить возврат false.
 * Ожидаемый результат: Возвращен false, операция отклонена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №272: Запрет полной отвязки источника STORE-29', () => {
  it('отклоняет открепление источника если цель уже откреплена', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 250 } },
      target: { type: 'unattached', point: { x: 600, y: 250 } },
      role: 'output', points: [{ x: 410, y: 250 }, { x: 600, y: 250 }], pinned: true,
    })!;
    const ok = store.reconnectArrowEndpoint(a.id, 'source', { type: 'unattached', point: { x: 100, y: 250 } });
    expect(ok).toBe(false);
  });
});

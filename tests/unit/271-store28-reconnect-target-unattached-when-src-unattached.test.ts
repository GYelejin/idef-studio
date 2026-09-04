/**
 * ТЕСТ №271: Хранилище: Запрет открепления цели при уже открепленном источнике
 * 
 * Класс эквивалентности: STORE-28 (Reject Both Unattached on Target)
 * Описание: Проверяет отклонение попытки переподключить цель в unattached, если начало стрелки уже не привязано.
 * Предусловия:
 *   - Стрелка с unattached источником.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint('target', { type: 'unattached' }).
 *   2. Проверить возврат false.
 * Ожидаемый результат: Возвращен false, операция отклонена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №271: Запрет полной отвязки цели STORE-28', () => {
  it('отклоняет открепление цели если источник уже откреплен', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'unattached', point: { x: 200, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input', points: [{ x: 200, y: 250 }, { x: 400, y: 250 }], pinned: true,
    })!;
    const ok = store.reconnectArrowEndpoint(a.id, 'target', { type: 'unattached', point: { x: 600, y: 250 } });
    expect(ok).toBe(false);
  });
});

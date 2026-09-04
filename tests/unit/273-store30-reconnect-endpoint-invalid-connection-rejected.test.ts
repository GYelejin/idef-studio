/**
 * ТЕСТ №273: Хранилище: Отклонение переподключения стрелки с нарушением правил IDEF0
 * 
 * Класс эквивалентности: STORE-30 (Reconnect Invalid Rejected)
 * Описание: Проверяет отклонение попытки переподключить стрелку в недопустимую конфигурацию (например, выход во вход блока справа налево).
 * Предусловия:
 *   - Стрелка между блоками.
 * Действия:
 *   1. Попытаться переподключить цель в правую грань блока (Выход).
 *   2. Проверить возврат false.
 * Ожидаемый результат: Возвращен false, валидация отклонила операцию.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №273: Отклонение невалидного переподключения STORE-30', () => {
  it('отклоняет переподключение цели в правую грань блока (Выход)', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 250 } },
      role: 'output', points: [{ x: 310, y: 250 }, { x: 500, y: 250 }], pinned: false,
    })!;
    const ok = store.reconnectArrowEndpoint(a.id, 'target', {
      type: 'block', id: b2.id, side: 'right', point: { x: 710, y: 250 }
    });
    expect(ok).toBe(false);
  });
});

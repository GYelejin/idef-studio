/**
 * ТЕСТ №282: Хранилище: Возврат null при попытке создания недопустимой стрелки
 * 
 * Класс эквивалентности: STORE-36 (Create Arrow Invalid Connection Null)
 * Описание: Проверяет, что store.createArrow возвращает null при попытке создать стрелку из границы листа в границу листа напрямую.
 * Предусловия:
 *   - Попытка создания стрелки border -> border.
 * Действия:
 *   1. Вызвать store.createArrow.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null, стрелка не добавлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №282: Отклонение невалидной стрелки STORE-36', () => {
  it('возвращает null при попытке соединить границу с границей', () => {
    const store = new EditorStore();
    const a = store.createArrow({
      label: 'Недопустимая',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false,
    });
    expect(a).toBeNull();
  });
});

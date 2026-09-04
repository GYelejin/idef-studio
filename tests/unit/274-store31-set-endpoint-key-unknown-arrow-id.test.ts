/**
 * ТЕСТ №274: Хранилище: Защита setArrowEndpointKey при несуществующем ID стрелки
 * 
 * Класс эквивалентности: STORE-31 (Endpoint Key Unknown Arrow ID)
 * Описание: Проверяет возврат false при вызове setArrowEndpointKey для несуществующего идентификатора стрелки.
 * Предусловия:
 *   - Пустая диаграмма.
 * Действия:
 *   1. Вызвать setArrowEndpointKey('non-existent', 'source', 'border:left').
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false, состояние не повреждено.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №274: Несуществующая стрелка STORE-31', () => {
  it('возвращает false при попытке настройки эндпоинта неизвестной стрелки', () => {
    const store = new EditorStore();
    const ok = store.setArrowEndpointKey('ghost-arrow', 'source', 'border:left');
    expect(ok).toBe(false);
  });
});

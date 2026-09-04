/**
 * ТЕСТ №287: Хранилище: Безопасность setArrowPinned при несуществующем ID стрелки
 * 
 * Класс эквивалентности: STORE-41 (Set Arrow Pinned Ghost ID)
 * Описание: Проверяет безопасную обработку вызова фиксации стрелки с фантомным ID.
 * Предусловия:
 *   - Пустое хранилище.
 * Действия:
 *   1. Вызвать setArrowPinned('ghost', true).
 *   2. Проверить отсутствие ошибок.
 * Ожидаемый результат: Ошибок нет, приложение стабильно.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №287: Фиксация несуществующей стрелки STORE-41', () => {
  it('безопасно обрабатывает вызов setArrowPinned для неизвестной стрелки', () => {
    const store = new EditorStore();
    expect(() => store.setArrowPinned('ghost', true)).not.toThrow();
  });
});

/**
 * ТЕСТ №298: Хранилище: Ограничение глубины истории изменений 50 снимками
 * 
 * Класс эквивалентности: STORE-50 (History Stack Capped at 50)
 * Описание: Проверяет ограничение размера стека истории 50 элементами при выполнении более 50 последовательных операций.
 * Предусловия:
 *   - Хранилище EditorStore.
 * Действия:
 *   1. Выполнить 55 вызовов pushHistory.
 *   2. Проверить store.state.history.length.
 * Ожидаемый результат: Длина истории равна ровно 50 (более ранние снимки вытеснены).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №298: Лимит стека истории 50 снимков STORE-50', () => {
  it('ограничивает историю изменений 50 состояниями', () => {
    const store = new EditorStore();
    for (let i = 0; i < 55; i++) {
      store.pushHistory();
    }
    expect(store.state.history.length).toBe(50);
  });
});

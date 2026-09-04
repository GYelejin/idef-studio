/**
 * ТЕСТ №284: Хранилище: Возврат false в setArrowRole при несуществующем ID стрелки
 * 
 * Класс эквивалентности: STORE-38 (Set Arrow Role Ghost ID)
 * Описание: Проверяет возврат false при попытке изменить роль у несуществующей стрелки.
 * Предусловия:
 *   - Пустое хранилище.
 * Действия:
 *   1. Вызвать setArrowRole('ghost', 'control').
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №284: Смена роли несуществующей стрелки STORE-38', () => {
  it('возвращает false при вызове setArrowRole для неизвестного ID', () => {
    const store = new EditorStore();
    const ok = store.setArrowRole('ghost', 'control');
    expect(ok).toBe(false);
  });
});

/**
 * ТЕСТ №323: Хранилище: Защита при восстановлении несуществующего снимка проекта
 * 
 * Класс эквивалентности: STORE-68 (Restore Snapshot Ghost ID Returns False)
 * Описание: Проверяет возврат false при попытке восстановить проект из фантомного снимка.
 * Предусловия:
 *   - Хранилище без снимков.
 * Действия:
 *   1. Вызвать HistoryOps.restoreSnapshot(state, 'ghost-snap').
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false, проект не изменен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { HistoryOps } from '../../src/core/store/historyOps';

describe('ТЕСТ №323: Ошибка восстановления снимка STORE-68', () => {
  it('возвращает false при попытке восстановить несуществующий снимок', () => {
    const store = new EditorStore();
    const ok = HistoryOps.restoreSnapshot(store.state, 'ghost-snap');
    expect(ok).toBe(false);
  });
});

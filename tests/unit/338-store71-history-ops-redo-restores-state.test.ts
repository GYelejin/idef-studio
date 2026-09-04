/**
 * ТЕСТ №338: Хранилище: Повтор отмененного действия через HistoryOps.redo
 * 
 * Класс эквивалентности: STORE-71 (History Ops Redo Restores State)
 * Описание: Проверяет восстановление состояния из стека redoStack при вызове HistoryOps.redo.
 * Предусловия:
 *   - Выполнены действие, undo и последующий redo.
 * Действия:
 *   1. Изменить имя проекта, сделать undo.
 *   2. Вызвать HistoryOps.redo(state).
 * Ожидаемый результат: Состояние восстановлено, redoStack уменьшился.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { HistoryOps } from '../../src/core/store/historyOps';

describe('ТЕСТ №338: Повтор действия redo STORE-71', () => {
  it('успешно повторяет отмененное действие через redo', () => {
    const store = new EditorStore();
    store.pushHistory();
    store.state.project.name = 'Обновленное имя';
    store.undo();
    expect(store.state.project.name).not.toBe('Обновленное имя');

    const ok = HistoryOps.redo(store.state);
    expect(ok).toBe(true);
    expect(store.state.project.name).toBe('Обновленное имя');
  });
});

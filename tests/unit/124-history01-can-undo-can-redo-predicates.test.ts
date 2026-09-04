/**
 * ТЕСТ №124: История: Доступность отмены и повтора действий (undo / redo)
 * 
 * Класс эквивалентности: HIST-01 (Can Undo and Can Redo State)
 * Описание: Проверяет изменение глубины стека history и redoStack при совершении и отмене действий.
 * Предусловия:
 *   - Начальное состояние редактора.
 * Действия:
 *   1. Проверить history.length.
 *   2. Создать блок на новой диаграмме.
 *   3. Вызвать undo, проверить redoStack.length > 0.
 * Ожидаемый результат: Стеки истории точно отражают доступность Undo/Redo.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №124: Стеки Undo/Redo HIST-01', () => {
  it('корректно переключает доступность отмены и возврата', () => {
    const store = new EditorStore();
    const d = store.createDiagram('A1', 'Декомпозиция');
    store.switchDiagram(d.id);
    const initialHist = store.state.history.length;
    store.createBlock(300, 200, 'A1');
    expect(store.state.history.length).toBe(initialHist + 1);
    store.undo();
    expect(store.state.redoStack.length).toBeGreaterThan(0);
    store.redo();
    expect(store.state.redoStack.length).toBe(0);
  });
});

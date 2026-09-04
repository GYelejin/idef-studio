/**
 * ТЕСТ №125: История: Очистка стека Redo при выполнении нового действия после отмены
 * 
 * Класс эквивалентности: HIST-02 (Redo Stack Invalidation)
 * Описание: Проверяет сброс ветки Redo при совершении нового изменения после Undo.
 * Предусловия:
 *   - Выполнена отмена действия (Undo), в стеке redoStack есть записи.
 * Действия:
 *   1. Совершить новое действие (создать блок).
 *   2. Проверить redoStack.length.
 * Ожидаемый результат: Стек redoStack очищен (redoStack.length === 0).
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №125: Инвалидация Redo стека HIST-02", () => {
  it("очищает стек повтора при совершении нового действия", () => {
    const store = new EditorStore();
    const d = store.createDiagram("A1", "Декомпозиция");
    store.switchDiagram(d.id);
    store.createBlock(300, 200, "A1");
    store.undo();
    expect(store.state.redoStack.length).toBeGreaterThan(0);
    store.createBlock(500, 300, "A1");
    expect(store.state.redoStack.length).toBe(0);
  });
});

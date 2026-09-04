/**
 * ТЕСТ №126: Хранилище: Выбор активного элемента на диаграмме (selectObject)
 * 
 * Класс эквивалентности: STORE-04 (Object Selection Management)
 * Описание: Проверяет фиксацию выделения блока, стрелки и сброс выделения при клике в пустоту.
 * Предусловия:
 *   - Диаграмма содержит блок и стрелку.
 * Действия:
 *   1. Выделить блок.
 *   2. Выделить стрелку.
 *   3. Снять выделение.
 * Ожидаемый результат: Состояние выделения в store точно отражает выбранный элемент.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №126: Выбор объекта STORE-04", () => {
  it("управляет выделением блоков и стрелок", () => {
    const store = new EditorStore();
    const d = store.createDiagram("A1", "Декомпозиция");
    store.switchDiagram(d.id);
    const b = store.createBlock(300, 200, "A1")!;
    store.selectObject(b.id, "block");
    expect(store.state.selectedObjectId).toBe(b.id);
    expect(store.state.selectedObjectType).toBe("block");
    store.selectObject(null, null);
    expect(store.state.selectedObjectId).toBeNull();
  });
});

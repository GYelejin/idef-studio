/**
 * ТЕСТ №123: Сериализация: Валидация заголовков и схемы в экспортированном JSON
 * 
 * Класс эквивалентности: EXPORT-02 (JSON Version Metadata)
 * Описание: Проверяет корректность сериализации проекта в JSON со всеми метаданными.
 * Предусловия:
 *   - Проект с диаграммами и метаданными.
 * Действия:
 *   1. Вызвать exportProjectToJson.
 *   2. Распарсить результат JSON.parse.
 * Ожидаемый результат: JSON содержит поля name, author, version и массив diagrams.
 */

import { describe, it, expect } from "bun:test";
import { exportProjectToJson } from "../../src/core/exporter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №123: Схема JSON проекта EXPORT-02", () => {
  it("экспортирует валидный JSON проект с метаданными", () => {
    const store = new EditorStore();
    const jsonStr = exportProjectToJson(store.state.project);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.name).toBeDefined();
    expect(parsed.diagrams).toBeInstanceOf(Array);
    expect(parsed.diagrams.length).toBeGreaterThan(0);
  });
});

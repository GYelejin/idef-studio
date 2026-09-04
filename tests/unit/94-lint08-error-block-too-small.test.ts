/**
 * ТЕСТ №94: Линтер: Ошибка недопустимо малого размера блока (< 100x60px)
 * 
 * Класс эквивалентности: LINT-08 (Minimum Block Size Error)
 * Описание: Проверяет стандарт IDEF0: функциональный блок не может быть меньше 100x60 пикселей.
 * Предусловия:
 *   - Диаграмма содержит блок 80x40px.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить ошибку FR-LINT-01.
 * Ожидаемый результат: Линтер генерирует ошибку о недопустимо малом размере блока.
 */

import { describe, it, expect } from "bun:test";
import { runIDEF0Linter } from "../../src/core/linter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №94: Недопустимо малый блок LINT-08", () => {
  it("выдает ошибку если габариты блока меньше 100x60px", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [{
      id: "tiny",
      nodeNumber: 1,
      name: "Мини",
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      decompDiagramId: null,
    }];
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasErr = res.some(i => i.ruleId === "FR-LINT-01" && i.message.includes("малый размер"));
    expect(hasErr).toBe(true);
  });
});

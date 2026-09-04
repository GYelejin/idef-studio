/**
 * ТЕСТ №116: Линтер: Запрет сквозных стрелок граница-граница на декомпозиции (FR-LINT-06)
 * 
 * Класс эквивалентности: LINT-13 (Decomposition Passthrough Arrow Warning)
 * Описание: Проверяет стандарт IDEF0: на диаграмме декомпозиции стрелка не может идти напрямую от границы к границе без входа в блок.
 * Предусловия:
 *   - Диаграмма A1 содержит 2 блока и сквозную стрелку граница -> граница.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить диагностику FR-LINT-06.
 * Ожидаемый результат: Обнаружено нарушение FR-LINT-06 о недопустимости сквозной стрелки.
 */

import { describe, it, expect } from "bun:test";
import { runIDEF0Linter } from "../../src/core/linter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №116: Сквозная стрелка граница-граница LINT-13", () => {
  it("запрещает транзитную стрелку граница -> граница на декомпозиции", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    store.createBlock(300, 200, "A1");
    store.createBlock(600, 200, "A1");
    diag.arrows.push({
      id: "transit",
      label: "Транзит",
      source: { type: "border", side: "left", point: { x: 30, y: 150 } },
      target: { type: "border", side: "right", point: { x: 1570, y: 150 } },
      role: "input",
      points: [{ x: 30, y: 150 }, { x: 1570, y: 150 }],
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasTransit = res.some(i => i.ruleId === "FR-LINT-06" && i.message.includes("проходит насквозь"));
    expect(hasTransit).toBe(true);
  });
});

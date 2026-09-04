/**
 * ТЕСТ №117: Линтер: Обнаружение разрыва ссылки в узле слияния (FR-LINT-06)
 * 
 * Класс эквивалентности: LINT-14 (Broken Merge Reference Detection)
 * Описание: Проверяет обнаружение стрелки слияния, указывающей на несуществующий узел junction.
 * Предусловия:
 *   - Стрелка слияния ссылается на отсутствующий узел.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить ошибку FR-LINT-06.
 * Ожидаемый результат: Обнаружена ошибка битой ссылки в узле слияния.
 */

import { describe, it, expect } from "bun:test";
import { runIDEF0Linter } from "../../src/core/linter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №117: Битая ссылка слияния LINT-14", () => {
  it("выявляет разрыв ссылки целевого узла слияния", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, "A1")!;
    diag.arrows.push({
      id: "broken-merge",
      label: "Приток",
      source: { type: "block", id: b.id, side: "right", point: { x: 510, y: 265 } },
      target: { type: "junction", id: "missing-merge-id", point: { x: 700, y: 265 } },
      role: "output",
      points: [{ x: 510, y: 265 }, { x: 700, y: 265 }],
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasErr = res.some(i => i.ruleId === "FR-LINT-06" && i.message.includes("ссылается на отсутствующий целевой поток"));
    expect(hasErr).toBe(true);
  });
});

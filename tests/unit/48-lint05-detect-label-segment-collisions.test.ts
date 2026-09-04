/**
 * ТЕСТ №48: Линтер: Обнаружение наложения подписи на стрелку (FR-LINT-07)
 * 
 * Класс эквивалентности: LINT-05 (Label Segment Collision)
 * Описание: Проверяет предупреждение линтера, если текстовая подпись стрелки перекрывается сегментом стрелки.
 * Предусловия:
 *   - Координаты текстовой подписи совпадают с горизонтальным сегментом стрелки.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить наличие сообщения FR-LINT-07.
 * Ожидаемый результат: Предупреждение о перекрытии подписи сегментом стрелки успешно сформировано.
 */

import { describe, it, expect } from "bun:test";
import { runIDEF0Linter } from "../../src/core/linter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №48: Перекрытие подписи LINT-05", () => {
  it("обнаруживает пересечение подписи с линией стрелки", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(500, 200, "A1")!;
    store.createArrow({
      label: "Overlapped-Text",
      source: { type: "border", side: "left", point: { x: 30, y: 265 } },
      target: { type: "block", id: b.id, side: "left", point: { x: 500, y: 265 } },
      role: "input",
      points: [{ x: 30, y: 265 }, { x: 500, y: 265 }],
      labelPos: { x: 250, y: 265 },
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasOverlap = res.some(i => i.ruleId === "FR-LINT-07");
    expect(hasOverlap).toBe(true);
  });
});

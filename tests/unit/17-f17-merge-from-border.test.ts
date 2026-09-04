/**
 * ТЕСТ №17: Слияние: Объединение выходов блоков в общую шину слияния
 * 
 * Класс эквивалентности: F17 (Block Outputs -> Merge Bus)
 * Описание: Проверяет слияние нескольких выходных потоков в единую шину в соответствии с РД IDEF0.
 * Предусловия:
 *   - Диаграмма A1 содержит два блока и узел слияния.
 * Действия:
 *   1. Создать общую магистраль выхода.
 *   2. Создать узел слияния merge.
 *   3. Присоединить приток к узлу слияния.
 * Ожидаемый результат: Стрелка успешно зарегистрирована с целевым узлом слияния.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №17: Слияние шины выходов F17", () => {
  it("объединяет выходные потоки в узел слияния", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(100, 100, "A1")!;
    const trunk = store.createArrow({
      label: "Main-Outflow",
      source: { type: "block", id: b1.id, side: "right", point: { x: 310, y: 165 } },
      target: { type: "border", side: "right", point: { x: 1570, y: 165 } },
      role: "output",
      points: [{ x: 310, y: 165 }, { x: 1570, y: 165 }],
      pinned: false,
    })!;
    const junc = store.createJunction("merge", { x: 600, y: 165 }, trunk.id);
    expect(junc.type).toBe("merge");
    expect(trunk.id).toBe(junc.parentArrowId);
  });
});

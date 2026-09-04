/**
 * ТЕСТ №16: Слияние: Выход блока -> Узел слияния
 * 
 * Класс эквивалентности: F16 (Block Output -> Merge)
 * Описание: Проверяет вливание выходного потока блока в магистральную стрелку через узел слияния (Merge Junction).
 * Предусловия:
 *   - Диаграмма A1 содержит блоки и принимающий магистральный поток выхода.
 * Действия:
 *   1. Создать Блок 1 и стрелку выхода к границе.
 *   2. Поставить узел слияния merge на стволе.
 *   3. Соединить выход Блока 2 с узлом слияния.
 * Ожидаемый результат: Стрелка слияния оканчивается в узле слияния ({ type: "junction", id: junc.id }).
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №16: Слияние потоков F16", () => {
  it("направляет выход блока в узел слияния магистрального потока", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(200, 200, "A1")!;
    const b2 = store.createBlock(200, 450, "A1")!;
    const trunk = store.createArrow({
      label: "Common-Output",
      source: { type: "block", id: b1.id, side: "right", point: { x: 410, y: 265 } },
      target: { type: "border", side: "right", point: { x: 1570, y: 265 } },
      role: "output",
      points: [{ x: 410, y: 265 }, { x: 1570, y: 265 }],
      pinned: false,
    })!;
    const junc = store.createJunction("merge", { x: 800, y: 265 }, trunk.id);
    const tributary = store.createArrow({
      label: "Tributary",
      source: { type: "block", id: b2.id, side: "right", point: { x: 410, y: 515 } },
      target: { type: "junction", id: junc.id, point: { x: 800, y: 265 } },
      role: "output",
      points: [{ x: 410, y: 515 }, { x: 800, y: 515 }, { x: 800, y: 265 }],
      pinned: false,
    })!;
    expect(tributary.target.type).toBe("junction");
    expect(junc.type).toBe("merge");
  });
});

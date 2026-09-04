/**
 * ТЕСТ №15: Ветвление: Узел разветвления -> Правая граница холста
 * 
 * Класс эквивалентности: F15 (Branch -> Border Right)
 * Описание: Проверяет создание ответвления от выходного ствола блока к внешней правой границе холста.
 * Предусловия:
 *   - Диаграмма A1 со стволом стрелки от блока к правой границе.
 * Действия:
 *   1. Создать блок и стрелку выхода к правой границе.
 *   2. Поставить узел ветвления.
 *   3. Протянуть вторую ветвь к правой границе.
 * Ожидаемый результат: Ветвь направлена на правую границу ({ type: "border", side: "right" }).
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №15: Ветвление к границе F15", () => {
  it("создает ответвление от ствола к правой границе", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b = store.createBlock(300, 200, "A1")!;
    const trunk = store.createArrow({
      label: "Main-Flow",
      source: { type: "block", id: b.id, side: "right", point: { x: 510, y: 265 } },
      target: { type: "border", side: "right", point: { x: 1570, y: 265 } },
      role: "output",
      points: [{ x: 510, y: 265 }, { x: 1570, y: 265 }],
      pinned: false,
    })!;
    const junc = store.createJunction("branch", { x: 800, y: 265 }, trunk.id);
    const branch = store.createArrow({
      label: "Border-Branch",
      source: { type: "junction", id: junc.id, point: { x: 800, y: 265 } },
      target: { type: "border", side: "right", point: { x: 1570, y: 400 } },
      role: "output",
      points: [{ x: 800, y: 265 }, { x: 1000, y: 265 }, { x: 1000, y: 400 }, { x: 1570, y: 400 }],
      pinned: false,
    })!;
    expect(branch.target.type).toBe("border");
    expect(branch.target.side).toBe("right");
  });
});

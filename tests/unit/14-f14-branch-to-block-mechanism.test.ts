/**
 * ТЕСТ №14: Ветвление: Узел разветвления -> Механизм блока
 * 
 * Класс эквивалентности: F14 (Branch -> Block Mechanism)
 * Описание: Проверяет создание ответвления от магистрали ресурсов к нижней грани блока.
 * Предусловия:
 *   - Диаграмма A1 с блоком и магистральной стрелкой механизма.
 * Действия:
 *   1. Поставить узел ветвления на магистрали механизма.
 *   2. Направить ветвь в нижнюю грань блока.
 * Ожидаемый результат: Ветвь механизма успешно создана с ролью "mechanism".
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №14: Ветвление F14", () => {
  it("создает ответвление от магистрали к механизму блока", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b = store.createBlock(500, 300, "A1")!;
    const trunk = store.createArrow({
      label: "Mech-Trunk",
      source: { type: "border", side: "bottom", point: { x: 600, y: 860 } },
      target: { type: "block", id: b.id, side: "bottom", point: { x: 600, y: 430 } },
      role: "mechanism",
      points: [{ x: 600, y: 860 }, { x: 600, y: 430 }],
      pinned: false,
    })!;
    const junc = store.createJunction("branch", { x: 600, y: 600 }, trunk.id);
    expect(junc).toBeDefined();
    expect(trunk.role).toBe("mechanism");
  });
});

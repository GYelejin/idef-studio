/**
 * ТЕСТ №12: Ветвление: Узел разветвления -> Вход блока
 * 
 * Класс эквивалентности: F12 (Branch -> Block Input)
 * Описание: Проверяет создание ответвления от ствола магистральной стрелки ко входу функционального блока.
 * Предусловия:
 *   - Диаграмма A1 содержит магистральную стрелку и блоки.
 * Действия:
 *   1. Создать блок и магистральную стрелку от левой границы ко входу блока.
 *   2. Зарегистрировать узел ветвления junction на стволе стрелки.
 *   3. Создать дочернюю стрелку от узла ветвления ко второму блоку.
 * Ожидаемый результат: Стрелка ветвления успешно создана с source.type === "junction".
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №12: Ветвление F12", () => {
  it("создает дочернюю стрелку от узла ветвления ко входу блока", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(400, 200, "A1")!;
    const b2 = store.createBlock(400, 400, "A1")!;
    const trunk = store.createArrow({
      label: "Trunk",
      source: { type: "border", side: "left", point: { x: 30, y: 265 } },
      target: { type: "block", id: b1.id, side: "left", point: { x: 400, y: 265 } },
      role: "input",
      points: [{ x: 30, y: 265 }, { x: 400, y: 265 }],
      pinned: false,
    })!;
    const junc = store.createJunction("branch", { x: 200, y: 265 }, trunk.id);
    const branch = store.createArrow({
      label: "Branch-1",
      source: { type: "junction", id: junc.id, point: { x: 200, y: 265 } },
      target: { type: "block", id: b2.id, side: "left", point: { x: 400, y: 465 } },
      role: "input",
      points: [{ x: 200, y: 265 }, { x: 200, y: 465 }, { x: 400, y: 465 }],
      pinned: false,
    })!;
    expect(branch.source.type).toBe("junction");
    expect(branch.target.side).toBe("left");
  });
});

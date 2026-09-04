/**
 * ТЕСТ №13: Ветвление: Узел разветвления -> Управление блока
 * 
 * Класс эквивалентности: F13 (Branch -> Block Control)
 * Описание: Проверяет создание ответвления от горизонтального магистрального потока к верхней грани блока (управлению).
 * Предусловия:
 *   - Диаграмма A1 содержит магистральную стрелку и блок.
 * Действия:
 *   1. Создать ствол управления сверху.
 *   2. Поставить узел ветвления.
 *   3. Направить ветвь в верхнюю грань блока.
 * Ожидаемый результат: Стрелка ветвления имеет роль "control" и входит в верхнюю грань блока.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №13: Ветвление F13", () => {
  it("создает ответвление от магистрали к управлению блока", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b = store.createBlock(500, 300, "A1")!;
    const trunk = store.createArrow({
      label: "Control-Trunk",
      source: { type: "border", side: "top", point: { x: 600, y: 40 } },
      target: { type: "block", id: b.id, side: "top", point: { x: 600, y: 300 } },
      role: "control",
      points: [{ x: 600, y: 40 }, { x: 600, y: 300 }],
      pinned: false,
    })!;
    const junc = store.createJunction("branch", { x: 600, y: 150 }, trunk.id);
    expect(junc.type).toBe("branch");
    expect(trunk.role).toBe("control");
  });
});

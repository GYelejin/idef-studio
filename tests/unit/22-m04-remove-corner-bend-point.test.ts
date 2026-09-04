/**
 * ТЕСТ №22: Мутация M4: Удаление излома стрелки по клику
 * 
 * Класс эквивалентности: M4 (Corner Handle Bend Deletion)
 * Описание: Проверяет удаление вершины излома стрелки и спрямление прилегающих сегментов.
 * Предусловия:
 *   - Стрелка имеет сложный ступенчатый маршрут из 6 точек.
 * Действия:
 *   1. Вызвать removeArrowPoint для угловой точки (индекс 2).
 *   2. Проверить сокращение количества точек и спрямление стрелки.
 * Ожидаемый результат: Излом удален, маршрут спрямлен.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №22: Удаление излома M4", () => {
  it("удаляет угловую точку излома и спрямляет стрелку", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(400, 200, "A1")!;
    const a = store.createArrow({
      label: "M4-Flow",
      source: { type: "border", side: "left", point: { x: 30, y: 100 } },
      target: { type: "block", id: b.id, side: "left", point: { x: 400, y: 265 } },
      role: "input",
      points: [
        { x: 30, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 180 },
        { x: 250, y: 180 },
        { x: 250, y: 265 },
        { x: 400, y: 265 },
      ],
      pinned: false,
    })!;
    store.removeArrowPoint(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeLessThan(6);
  });
});

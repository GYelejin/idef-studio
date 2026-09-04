/**
 * ТЕСТ №33: Сегменты: Удаление угловой вершины на многоступенчатом маршруте
 * 
 * Класс эквивалентности: SEG-03 (Corner Bend Removal Multi-step)
 * Описание: Проверяет последовательное удаление вершин изломов с автоматическим объединением коллинеарных сегментов.
 * Предусловия:
 *   - Стрелка имеет сложный ступенчатый маршрут из 6 точек с 4 изломами.
 * Действия:
 *   1. Удалить промежуточную угловую вершину (индекс 2).
 *   2. Проверить пересчет маршрута.
 * Ожидаемый результат: Излом удален, количество точек уменьшено.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №33: Удаление вершины SEG-03", () => {
  it("удаляет вершину на многосегментном маршруте", () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = "A1";
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(500, 300, "A1")!;
    const a = store.createArrow({
      label: "Bend-Arrow",
      source: { type: "border", side: "left", point: { x: 30, y: 100 } },
      target: { type: "block", id: b.id, side: "left", point: { x: 500, y: 365 } },
      role: "input",
      points: [
        { x: 30, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 220 },
        { x: 300, y: 220 },
        { x: 300, y: 365 },
        { x: 500, y: 365 },
      ],
      pinned: false,
    })!;
    store.removeArrowPoint(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeLessThan(6);
  });
});

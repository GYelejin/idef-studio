/**
 * ТЕСТ №97: Линтер: Обнаружение дисбаланса граничных стрелок между уровнями
 * 
 * Класс эквивалентности: LINT-11 (Boundary Imbalance Error Detection)
 * Описание: Проверяет балансировку ICOM: стрелка родительского блока отсутствует на дочерней диаграмме.
 * Предусловия:
 *   - Родительский блок A0 имеет входящий поток "Сырье", дочерняя диаграмма A1 не содержит такого граничного входа.
 * Действия:
 *   1. Запустить линтер для дочерней диаграммы A1.
 *   2. Проверить диагностику FR-LINT-04.
 * Ожидаемый результат: Зафиксировано нарушение FR-LINT-04 о пропущенном граничном потоке.
 */

import { describe, it, expect } from "bun:test";
import { runIDEF0Linter } from "../../src/core/linter";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №97: Дисбаланс граничных стрелок LINT-11", () => {
  it("выявляет отсутствие граничного потока родительского блока на декомпозиции", () => {
    const store = new EditorStore();
    const proj = store.state.project;
    const rootDiag = proj.diagrams.find(d => d.code === "A0")!;
    const rootBlock = rootDiag.blocks[0];
    rootDiag.arrows.push({
      id: "arr-feed",
      label: "Сырье",
      source: { type: "border", side: "left", point: { x: 30, y: 400 } },
      target: { type: "block", id: rootBlock.id, side: "left", point: { x: rootBlock.x, y: 400 } },
      role: "input",
      points: [{ x: 30, y: 400 }, { x: rootBlock.x, y: 400 }],
      pinned: false,
    });
    const childId = store.decomposeBlock(rootBlock.id);
    const childDiag = proj.diagrams.find(d => d.id === childId)!;
    childDiag.arrows = []; // Удаляем граничный поток на дочерней диаграмме
    const res = runIDEF0Linter(proj, childId);
    const hasImbalance = res.some(i => i.ruleId === "FR-LINT-04");
    expect(hasImbalance).toBe(true);
  });
});

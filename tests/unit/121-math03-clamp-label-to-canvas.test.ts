/**
 * ТЕСТ №121: Геометрия: Ограничение координат текстовой подписи пределами листа
 * 
 * Класс эквивалентности: MATH-03 (Clamp Label to Canvas)
 * Описание: Проверяет удержание позиции текста стрелки внутри печатного листа A4.
 * Предусловия:
 *   - Точка подписи с отрицательными координатами (-50, -20).
 * Действия:
 *   1. Вызвать clampLabelToCanvas.
 *   2. Проверить скорректированные координаты.
 * Ожидаемый результат: Координаты подписи скорректированы с безопасным отступом от края холста.
 */

import { describe, it, expect } from "bun:test";
import { clampLabelToCanvas } from "../../src/core/geometry";

describe("ТЕСТ №121: Удержание подписи на холсте MATH-03", () => {
  it("ограничивает позицию текста пределами листа", () => {
    const clamped = clampLabelToCanvas({ x: -50, y: -20 });
    expect(clamped.x).toBeGreaterThanOrEqual(20);
    expect(clamped.y).toBeGreaterThanOrEqual(20);
  });
});

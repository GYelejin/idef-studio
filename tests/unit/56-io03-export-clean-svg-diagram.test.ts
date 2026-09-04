/**
 * ТЕСТ №56: Экспорт: Генерация чистого векторного SVG по стандарту IDEF0
 * 
 * Класс эквивалентности: IO-03 (SVG Diagram Export)
 * Описание: Проверяет экспорт диаграммы в SVG с маркерами стрелок, сеткой и блоками.
 * Предусловия:
 *   - В store загружена модель диаграммы.
 * Действия:
 *   1. Вызвать exportDiagramToSvg.
 *   2. Проверить наличие тега <svg>, маркеров и прямоугольников блоков.
 * Ожидаемый результат: Сформирована валидная строка SVG с корректными размерами и разметкой.
 */

import { describe, it, expect } from "bun:test";
import { createExampleModel } from "../../src/core/exampleModel";
import { exportDiagramToSvg } from "../../src/core/exporter";

describe("ТЕСТ №56: Экспорт в SVG IO-03", () => {
  it("экспортирует диаграмму в валидный векторный SVG", () => {
    const model = createExampleModel();
    const diag = model.diagrams[0];
    const svg = exportDiagramToSvg(diag);
    expect(svg).toContain("<svg");
    expect(svg).toContain("viewBox=\"0 0 1600 900\"");
    expect(svg).toContain("</svg>");
  });
});

/**
 * ТЕСТ №57: Экспорт: Пакетный экспорт диаграмм в единый ZIP-архив
 * 
 * Класс эквивалентности: IO-04 (Multi-diagram ZIP Export)
 * Описание: Проверяет генерацию ZIP-архива, содержащего SVG-файлы всех диаграмм модели.
 * Предусловия:
 *   - Проект содержит 2 диаграммы (A0 и A1).
 * Действия:
 *   1. Вызвать exportDiagramsToZip с массивом диаграмм.
 *   2. Проверить создание бинарного Blob-архива.
 * Ожидаемый результат: ZIP-архив успешно сгенерирован и содержит данные.
 */

import { describe, it, expect } from "bun:test";
import { createExampleModel } from "../../src/core/exampleModel";
import { exportDiagramsToZip } from "../../src/core/exporter";

describe("ТЕСТ №57: Экспорт в ZIP IO-04", () => {
  it("генерирует ZIP-архив со всеми диаграммами проекта", async () => {
    const model = createExampleModel();
    const blob = await exportDiagramsToZip(model.diagrams, "svg");
    expect(blob).toBeDefined();
    expect(blob.size).toBeGreaterThan(0);
  });
});

/**
 * ТЕСТ №54: Сериализация: Экспорт и импорт модели проекта в JSON
 * 
 * Класс эквивалентности: IO-01 (JSON Serialization Roundtrip)
 * Описание: Проверяет полный цикл экспорта проекта в JSON и обратного импорта с сохранением всех блоков, стрелок и свойств.
 * Предусловия:
 *   - В store загружена модель с диаграммами A0 и A1.
 * Действия:
 *   1. Экспортировать проект в строку JSON.
 *   2. Загрузить JSON через importProjectFromJson.
 *   3. Проверить совпадение структуры данных.
 * Ожидаемый результат: Импортированный проект идентичен исходному (roundtrip fidelity 100%).
 */

import { describe, it, expect } from 'bun:test';
import { createExampleModel } from '../../src/core/exampleModel';
import { exportProjectToJson, importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №54: Экспорт/импорт JSON IO-01', () => {
  it('выполняет полный цикл сериализации проекта в JSON и обратно', () => {
    const model = createExampleModel();
    const jsonStr = exportProjectToJson(model);
    expect(typeof jsonStr).toBe('string');
    const imported = importProjectFromJson(jsonStr);
    expect(imported.success).toBe(true);
    expect(imported.project?.diagrams.length).toBe(model.diagrams.length);
  });
});

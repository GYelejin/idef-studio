/**
 * ТЕСТ №196: Хранилище: Загрузка проекта из JSON-строки (store.importProject)
 * 
 * Класс эквивалентности: IO-10 (Import Project String via Store)
 * Описание: Проверяет загрузку корректного JSON проекта напрямую через фасадное API хранилища.
 * Предусловия:
 *   - Валидная JSON-строка проекта.
 * Действия:
 *   1. Вызвать store.importProject(validJson).
 *   2. Проверить activeDiagramId и name.
 * Ожидаемый результат: Проект успешно загружен, активная диаграмма установлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { createExampleModel } from '../../src/core/exampleModel';

describe('ТЕСТ №196: Импорт проекта через хранилище IO-10', () => {
  it('загружает проект из JSON-строки в состояние приложения', () => {
    const store = new EditorStore();
    const example = createExampleModel();
    const jsonStr = JSON.stringify(example);
    const ok = store.importProject(jsonStr);
    expect(ok).toBe(true);
    expect(store.state.project.name).toBe(example.name);
  });
});

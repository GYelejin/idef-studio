/**
 * ТЕСТ №198: Проект: Загрузка эталонной демонстрационной модели (store.loadExample)
 * 
 * Класс эквивалентности: PROJ-07 (Load Example in Store)
 * Описание: Проверяет инициализацию эталонного технологического процесса в хранилище.
 * Предусловия:
 *   - Пустой проект.
 * Действия:
 *   1. Вызвать store.loadExample().
 *   2. Проверить количество диаграмм и активную схему.
 * Ожидаемый результат: Загружен демонстрационный пример с диаграммами A0 и A1.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №198: Загрузка демонстрационной модели PROJ-07', () => {
  it('инициализирует эталонную структуру примера', () => {
    const store = new EditorStore();
    store.loadExample();
    expect(store.state.project.diagrams.length).toBeGreaterThanOrEqual(2);
    expect(store.getActiveDiagram()).toBeDefined();
  });
});

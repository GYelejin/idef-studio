/**
 * ТЕСТ №90: Проект: Создание произвольной диаграммы в проекте (createDiagram)
 * 
 * Класс эквивалентности: PROJ-04 (Create Custom Diagram)
 * Описание: Проверяет добавление новой диаграммы с заданным кодом и заголовком.
 * Предусловия:
 *   - Проект инициализирован.
 * Действия:
 *   1. Вызвать store.createDiagram('A3', 'Производство').
 *   2. Проверить наличие диаграммы в project.diagrams.
 * Ожидаемый результат: Диаграмма создана и зарегистрирована в проекте.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №90: Создание диаграммы PROJ-04', () => {
  it('создает новую диаграмму с указанными кодом и именем', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A3', 'Производство');
    expect(diag.code).toBe('A3');
    expect(diag.title).toBe('Производство');
    expect(store.state.project.diagrams.some(d => d.id === diag.id)).toBe(true);
  });
});

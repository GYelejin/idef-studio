/**
 * ТЕСТ №87: Проект: Сброс проекта в начальное состояние (resetProject)
 * 
 * Класс эквивалентности: PROJ-01 (Reset Project State)
 * Описание: Проверяет очистку всех диаграмм и возврат к единой контекстной диаграмме A0.
 * Предусловия:
 *   - В проекте созданы диаграммы и блоки.
 * Действия:
 *   1. Вызвать store.resetProject().
 *   2. Проверить структуру проекта.
 * Ожидаемый результат: Проект сброшен к базовой диаграмме A0 с 1 блоком.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №87: Сброс проекта PROJ-01', () => {
  it('сбрасывает проект к чистой начальной структуре A0', () => {
    const store = new EditorStore();
    store.createDiagram('A2', 'Диаграмма 2');
    expect(store.state.project.diagrams.length).toBeGreaterThan(1);
    store.resetProject();
    expect(store.state.project.diagrams.length).toBe(1);
    expect(store.state.project.diagrams[0].code).toBe('A0');
  });
});

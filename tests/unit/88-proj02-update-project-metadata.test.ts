/**
 * ТЕСТ №88: Проект: Обновление метаданных проекта (updateProjectMeta)
 * 
 * Класс эквивалентности: PROJ-02 (Update Project Metadata)
 * Описание: Проверяет обновление названия и описания проекта в store.
 * Предусловия:
 *   - Проект инициализирован.
 * Действия:
 *   1. Вызвать updateProjectMeta('Логистика', 'Модель снабжения').
 *   2. Проверить обновленные поля.
 * Ожидаемый результат: Метаданные проекта успешно обновлены.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №88: Метаданные проекта PROJ-02', () => {
  it('обновляет название и описание проекта', () => {
    const store = new EditorStore();
    store.updateProjectMeta('Логистика', 'Модель снабжения');
    expect(store.state.project.name).toBe('Логистика');
    expect(store.state.project.description).toBe('Модель снабжения');
  });
});

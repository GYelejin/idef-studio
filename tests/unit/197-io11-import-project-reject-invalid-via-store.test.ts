/**
 * ТЕСТ №197: Хранилище: Защита от повреждения состояния при сбое импорта (store.importProject)
 * 
 * Класс эквивалентности: IO-11 (Import Protect State on Failure)
 * Описание: Проверяет сохранение неизменным исходного состояния при попытке импорта битого JSON.
 * Предусловия:
 *   - Хранилище с рабочим проектом.
 * Действия:
 *   1. Передать невалидную строку в store.importProject('{ broken json').
 *   2. Проверить возвращаемое значение и целостность проекта.
 * Ожидаемый результат: Возвращено false, исходный проект сохранен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №197: Защита состояния при сбое импорта IO-11', () => {
  it('отклоняет битый JSON без повреждения текущего проекта', () => {
    const store = new EditorStore();
    const initialId = store.state.project.id;
    const ok = store.importProject('{ битый json :(');
    expect(ok).toBe(false);
    expect(store.state.project.id).toBe(initialId);
  });
});

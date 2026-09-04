/**
 * ТЕСТ №295: Хранилище: Отклонение импорта проекта без единой диаграммы
 * 
 * Класс эквивалентности: STORE-47 (Import Empty Diagrams Rejected)
 * Описание: Проверяет отклонение проекта с пустым списком диаграмм diagrams: [].
 * Предусловия:
 *   - Проект с diagrams: [].
 * Действия:
 *   1. Вызвать store.importProject.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false, импорт отклонен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №295: Отклонение проекта без диаграмм STORE-47', () => {
  it('отклоняет импорт если массив диаграмм пуст', () => {
    const store = new EditorStore();
    const ok = store.importProject({
      id: 'p1', name: 'Проект', diagrams: [],
    } as any);
    expect(ok).toBe(false);
  });
});

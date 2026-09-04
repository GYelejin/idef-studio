/**
 * ТЕСТ №292: Инициализация: Восстановление проекта из localStorage
 * 
 * Класс эквивалентности: PROJ-10 (Restore Project From LocalStorage)
 * Описание: Проверяет загрузку сохраненного проекта при старте приложения через createInitialProject.
 * Предусловия:
 *   - В localStorage сохранен валидный проект.
 * Действия:
 *   1. Вызвать createInitialProject.
 *   2. Проверить загруженный проект.
 * Ожидаемый результат: Проект загружен из хранилища браузера.
 */

import { describe, it, expect } from 'bun:test';
import { createInitialProject } from '../../src/core/store/projectFactory';
import { STORAGE_KEY } from '../../src/core/store/types';

describe('ТЕСТ №292: Загрузка из localStorage PROJ-10', () => {
  it('восстанавливает проект из localStorage если данные валидны', () => {
    const origLocal = globalThis.localStorage;
    const testProject = {
      id: 'saved-proj', name: 'Сохраненная модель', description: 'desc',
      diagrams: [{ id: 'd0', code: 'A0', title: 'Главная', blocks: [], arrows: [], junctions: [] }],
      activeDiagramId: 'd0',
    };
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k === STORAGE_KEY ? JSON.stringify(testProject) : null),
    };
    try {
      const proj = createInitialProject();
      expect(proj.id).toBe('saved-proj');
    } finally {
      (globalThis as any).localStorage = origLocal;
    }
  });
});

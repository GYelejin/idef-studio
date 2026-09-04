/**
 * ТЕСТ №293: Инициализация: Безопасный откат к чистому проекту при поврежденном localStorage
 * 
 * Класс эквивалентности: PROJ-11 (Corrupt LocalStorage Fallback Clean Project)
 * Описание: Проверяет защиту от падения приложения и откат к эталонной чистой модели при обнаружении битого JSON в localStorage.
 * Предусловия:
 *   - В localStorage записана битая строка 'corrupt{json'.
 * Действия:
 *   1. Вызвать createInitialProject.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен чистый новый проект с контекстной диаграммой A0.
 */

import { describe, it, expect } from 'bun:test';
import { createInitialProject } from '../../src/core/store/projectFactory';
import { STORAGE_KEY } from '../../src/core/store/types';

describe('ТЕСТ №293: Откат при битом localStorage PROJ-11', () => {
  it('создает чистый проект при повреждении сохраненного JSON', () => {
    const origLocal = globalThis.localStorage;
    (globalThis as any).localStorage = {
      getItem: (k: string) => (k === STORAGE_KEY ? '{not-a-valid-json' : null),
    };
    try {
      const proj = createInitialProject();
      expect(proj.diagrams.length).toBeGreaterThan(0);
      expect(proj.diagrams[0].code).toBe('A0');
    } finally {
      (globalThis as any).localStorage = origLocal;
    }
  });
});

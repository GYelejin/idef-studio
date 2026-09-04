/**
 * ТЕСТ №190: Линтер: Отсутствие замечаний на эталонной корректной диаграмме
 * 
 * Класс эквивалентности: LINT-22 (Clean Diagram Zero Issues)
 * Описание: Проверяет работу линтера на чистой, полностью связной диаграмме без коллизий и нарушений стандарта.
 * Предусловия:
 *   - Корректная диаграмма декомпозиции с 3 блоками.
 * Действия:
 *   1. Запустить runIDEF0Linter на диаграмме.
 *   2. Проверить массив issues.
 * Ожидаемый результат: issues.filter(i => i.severity === 'error').length === 0.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { createExampleModel } from '../../src/core/exampleModel';

describe('ТЕСТ №190: Чистая диаграмма без ошибок LINT-22', () => {
  it('не содержит критических ошибок валидации на эталонной модели', () => {
    const project = createExampleModel();
    const diag = project.diagrams.find(d => d.code === 'A0')!;
    const issues = runIDEF0Linter(project, diag.id);
    const errors = issues.filter(i => i.severity === 'error');
    expect(errors.length).toBe(0);
  });
});

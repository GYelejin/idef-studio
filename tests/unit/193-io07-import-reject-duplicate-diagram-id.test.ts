/**
 * ТЕСТ №193: Импорт/Экспорт: Отклонение проекта с дубликатами ID диаграмм
 * 
 * Класс эквивалентности: IO-07 (Import Reject Duplicate Diagram ID)
 * Описание: Проверяет целостность идентификаторов при импорте.
 * Предусловия:
 *   - Проект с двумя диаграммами с одинаковым id 'diag-duplicate'.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить success.
 * Ожидаемый результат: success === false, ошибка дубликата идентификатора диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №193: Дубликат ID диаграммы IO-07', () => {
  it('отклоняет импорт при дублировании идентификаторов диаграмм', () => {
    const proj = {
      id: 'p1',
      name: 'Проект',
      diagrams: [
        { id: 'd-dup', code: 'A0', blocks: [], arrows: [] },
        { id: 'd-dup', code: 'A1', blocks: [], arrows: [] }
      ]
    };
    const res = importProjectFromJson(JSON.stringify(proj));
    expect(res.success).toBe(false);
    expect(res.error).toContain('Обнаружен дубликат');
  });
});

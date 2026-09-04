/**
 * ТЕСТ №192: Импорт/Экспорт: Отклонение проекта без обязательных полей (id, name, diagrams)
 * 
 * Класс эквивалентности: IO-06 (Import Reject Missing System Fields)
 * Описание: Проверяет отклонение импорта структуры, в которой отсутствует список diagrams или name.
 * Предусловия:
 *   - JSON-объект без массива diagrams.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить success.
 * Ожидаемый результат: success === false, зафиксирована ошибка структуры.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №192: Отсутствие обязательных полей IO-06', () => {
  it('отклоняет проект без списка диаграмм', () => {
    const res = importProjectFromJson(JSON.stringify({ id: 'p1', name: 'Проект' }));
    expect(res.success).toBe(false);
    expect(res.error).toContain('Отсутствуют обязательные системные поля');
  });
});

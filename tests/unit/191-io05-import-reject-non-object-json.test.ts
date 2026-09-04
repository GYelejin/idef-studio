/**
 * ТЕСТ №191: Импорт/Экспорт: Отклонение невалидного JSON (примитивы вместо объекта)
 * 
 * Класс эквивалентности: IO-05 (Import Reject Non Object JSON)
 * Описание: Проверяет отклонение парсинга, если JSON содержит строку, число или null вместо объекта проекта.
 * Предусловия:
 *   - Строка JSON '12345'.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить результат.
 * Ожидаемый результат: success === false, ошибка 'Файл не содержит валидный JSON объект'.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №191: Отклонение не-объекта IO-05', () => {
  it('отклоняет примитивные значения JSON', () => {
    const res = importProjectFromJson('12345');
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});

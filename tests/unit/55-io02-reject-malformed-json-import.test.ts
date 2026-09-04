/**
 * ТЕСТ №55: Сериализация: Отклонение некорректного JSON при импорте
 * 
 * Класс эквивалентности: IO-02 (Malformed JSON Rejection)
 * Описание: Проверяет безопасную обработку поврежденных JSON файлов без сбоя приложения.
 * Предусловия:
 *   - Подается битая строка JSON.
 * Действия:
 *   1. Вызвать importProjectFromJson с некорректной строкой '{ bad: json }'.
 *   2. Проверить возврат false.
 * Ожидаемый результат: Импорт безопасно отклонен, возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №55: Защита от битого JSON IO-02', () => {
  it('безопасно отклоняет поврежденный JSON', () => {
    const res = importProjectFromJson('{ invalid: json');
    expect(res.success).toBe(false);
  });
});

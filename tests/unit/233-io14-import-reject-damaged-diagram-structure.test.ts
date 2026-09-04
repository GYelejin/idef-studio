/**
 * ТЕСТ №233: Импорт: Отклонение диаграммы с поврежденной внутренней структурой
 * 
 * Класс эквивалентности: IO-14 (Import Reject Damaged Diagram Structure)
 * Описание: Проверяет отклонение файла, если у диаграммы отсутствует code или blocks не является массивом.
 * Предусловия:
 *   - JSON-строка с поврежденной диаграммой.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить res.success === false.
 * Ожидаемый результат: Импорт отклонен с понятным сообщением об ошибке.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №233: Поврежденная диаграмма IO-14', () => {
  it('отклоняет импорт проекта при поврежденной структуре диаграммы', () => {
    const invalidJson = JSON.stringify({
      id: 'p1',
      name: 'Проект',
      diagrams: [{ id: 'd1' /* нет code, blocks, arrows */ }],
    });
    const res = importProjectFromJson(invalidJson);
    expect(res.success).toBe(false);
    expect(res.error).toContain('поврежденную структуру');
  });
});

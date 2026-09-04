/**
 * ТЕСТ №195: Импорт/Экспорт: Отклонение нечисловых координат блоков
 * 
 * Класс эквивалентности: IO-09 (Import Reject Invalid Block Coordinates)
 * Описание: Проверяет валидацию числового формата координат и размеров блоков при десериализации.
 * Предусловия:
 *   - Блок содержит x: 'не число'.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить результат.
 * Ожидаемый результат: success === false, ошибка некорректных координат.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №195: Некорректные координаты блока IO-09', () => {
  it('отклоняет импорт блоков с нечисловыми координатами', () => {
    const proj = {
      id: 'p1',
      name: 'Проект',
      diagrams: [
        {
          id: 'd1',
          code: 'A1',
          blocks: [{ id: 'b1', x: 'invalid', y: 100, width: 200, height: 100 }],
          arrows: []
        }
      ]
    };
    const res = importProjectFromJson(JSON.stringify(proj));
    expect(res.success).toBe(false);
    expect(res.error).toContain('некорректные координаты');
  });
});

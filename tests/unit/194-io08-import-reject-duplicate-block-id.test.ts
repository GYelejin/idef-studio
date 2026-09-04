/**
 * ТЕСТ №194: Импорт/Экспорт: Отклонение диаграммы с дубликатами ID блоков
 * 
 * Класс эквивалентности: IO-08 (Import Reject Duplicate Block ID)
 * Описание: Проверяет отклонение проекта с одинаковыми идентификаторами функциональных блоков.
 * Предусловия:
 *   - Диаграмма содержит два блока с id 'block-dup'.
 * Действия:
 *   1. Вызвать importProjectFromJson.
 *   2. Проверить success.
 * Ожидаемый результат: success === false, ошибка дубликата блока.
 */

import { describe, it, expect } from 'bun:test';
import { importProjectFromJson } from '../../src/core/exporter';

describe('ТЕСТ №194: Дубликат ID блока IO-08', () => {
  it('отклоняет импорт при дублировании идентификаторов блоков на схеме', () => {
    const proj = {
      id: 'p1',
      name: 'Проект',
      diagrams: [
        {
          id: 'd1',
          code: 'A1',
          blocks: [
            { id: 'blk-dup', x: 100, y: 100, width: 200, height: 100 },
            { id: 'blk-dup', x: 400, y: 100, width: 200, height: 100 }
          ],
          arrows: []
        }
      ]
    };
    const res = importProjectFromJson(JSON.stringify(proj));
    expect(res.success).toBe(false);
    expect(res.error).toContain('Обнаружен дубликат блока');
  });
});

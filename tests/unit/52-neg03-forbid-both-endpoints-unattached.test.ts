/**
 * ТЕСТ №52: Негативный: Запрет стрелки с двумя неприсоединенными концами
 * 
 * Класс эквивалентности: NEG-03 (Both Endpoints Unattached Prohibition)
 * Описание: Проверяет запрет создания висящей в воздухе стрелки, у которой и начало, и конец являются неприсоединенными.
 * Предусловия:
 *   - Стрелка имеет source.type === 'unattached' и target.type === 'unattached'.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат валидации.
 * Ожидаемый результат: Стрелка с двумя неприсоединенными концами строго запрещена.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №52: Запрет двух свободных концов NEG-03', () => {
  it('запрещает стрелку со свободными обоими концами', () => {
    const res = validateArrowConnection(
      { type: 'unattached', point: { x: 100, y: 100 } },
      { type: 'unattached', point: { x: 300, y: 100 } },
      [],
      []
    );
    expect(res.valid).toBe(false);
  });
});

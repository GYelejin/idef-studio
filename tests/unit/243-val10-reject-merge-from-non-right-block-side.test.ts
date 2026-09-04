/**
 * ТЕСТ №243: Валидация: Запрет слияния из верхней грани блока
 * 
 * Класс эквивалентности: VAL-10 (Reject Merge From Non-Right Block Side)
 * Описание: Проверяет отклонение попытки слияния стрелки в существующий поток из грани Управления (top).
 * Предусловия:
 *   - Источник: block top, цель: junction.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат.
 * Ожидаемый результат: valid === false, запрет выхода из грани Управления.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №243: Слияние из грани управления VAL-10', () => {
  it('запрещает слияние стрелки в поток из верхней грани блока', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'top', point: { x: 300, y: 200 } },
      { type: 'junction', id: 'j1', point: { x: 300, y: 150 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('входящих стрелок');
  });
});

/**
 * ТЕСТ №240: Валидация: Запрет ввода с нижней границы в боковую грань
 * 
 * Класс эквивалентности: VAL-07 (Reject Bottom Border to Non-Bottom Side)
 * Описание: Проверяет отклонение стрелки с нижней границы (Механизм), направленной не в нижнюю сторону блока (например, во Вход).
 * Предусловия:
 *   - Источник: border bottom, цель: block left.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат.
 * Ожидаемый результат: valid === false, причина указывает на Механизм.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №240: Механизм не в нижнюю грань VAL-07', () => {
  it('запрещает подключение Механизма в левую сторону блока', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'bottom', point: { x: 200, y: 865 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 300, y: 250 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('Механизм');
  });
});

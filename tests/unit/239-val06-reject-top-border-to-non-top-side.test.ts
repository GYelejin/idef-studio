/**
 * ТЕСТ №239: Валидация: Запрет ввода с верхней границы в боковую грань блока
 * 
 * Класс эквивалентности: VAL-06 (Reject Top Border to Non-Top Side)
 * Описание: Проверяет отклонение стрелки, идущей от верхней границы листа в левую грань блока.
 * Предусловия:
 *   - Источник: border top, цель: block left.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат.
 * Ожидаемый результат: valid === false, причина указывает на недопустимость входа управления не в верхнюю грань.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №239: Управление не в верхнюю грань VAL-06', () => {
  it('запрещает подключение стрелки с верхней границы в боковые стороны блока', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 200, y: 250 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('Управление');
  });
});

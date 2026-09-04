/**
 * ТЕСТ №242: Валидация: Запрет ветвления на верхнюю границу холста
 * 
 * Класс эквивалентности: VAL-09 (Reject Branch to Non-Right Border)
 * Описание: Проверяет отклонение ответвления от сегмента стрелки на верхнюю границу листа.
 * Предусловия:
 *   - Источник: junction, цель: border top.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат.
 * Ожидаемый результат: valid === false, выход на границу разрешен только из блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №242: Ветвление на верхнюю границу VAL-09', () => {
  it('запрещает ответвление стрелки на верхнюю границу холста', () => {
    const res = validateArrowConnection(
      { type: 'junction', id: 'j1', point: { x: 300, y: 200 } },
      { type: 'border', side: 'top', point: { x: 300, y: 40 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('Выход на границу холста');
  });
});

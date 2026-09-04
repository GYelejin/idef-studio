/**
 * ТЕСТ №333: Примагничивание: Отклонение верхней границы при невалидной цели
 * 
 * Класс эквивалентности: SNAP-17 (Reject Top Border When Draft Target Invalid)
 * Описание: Проверяет отклонение верхней границы листа (Управление), если целевой порт несовместим (например, выход на правую границу напрямую).
 * Предусловия:
 *   - draftTarget: border right.
 * Действия:
 *   1. Вызвать getBorderSnapPoint у верхней границы (Y=35).
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null, захват отклонен.
 */

import { describe, it, expect } from 'bun:test';
import { getBorderSnapPoint } from '../../src/core/geometry/snapping';

describe('ТЕСТ №333: Отклонение верхней границы SNAP-17', () => {
  it('отклоняет привязку к верхней границе если цель несовместима', () => {
    const invalidTarget = {
      type: 'border' as const, side: 'right' as const, point: { x: 1570, y: 300 }, role: 'output' as const,
    };
    const snap = getBorderSnapPoint({ x: 300, y: 35 }, 20, 'all', undefined, invalidTarget);
    expect(snap).toBeNull();
  });
});

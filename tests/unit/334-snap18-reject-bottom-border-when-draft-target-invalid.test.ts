/**
 * ТЕСТ №334: Примагничивание: Отклонение нижней границы при невалидной цели
 * 
 * Класс эквивалентности: SNAP-18 (Reject Bottom Border When Draft Target Invalid)
 * Описание: Проверяет отказ в захвате нижней границы листа (Механизм), если цель несовместима со входом Механизма.
 * Предусловия:
 *   - draftTarget: border right.
 * Действия:
 *   1. Вызвать getBorderSnapPoint у нижней границы (Y=870).
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null, захват отклонен.
 */

import { describe, it, expect } from 'bun:test';
import { getBorderSnapPoint } from '../../src/core/geometry/snapping';

describe('ТЕСТ №334: Отклонение нижней границы SNAP-18', () => {
  it('отклоняет привязку к нижней границе если цель несовместима', () => {
    const invalidTarget = {
      type: 'border' as const, side: 'right' as const, point: { x: 1570, y: 300 }, role: 'output' as const,
    };
    const snap = getBorderSnapPoint({ x: 300, y: 870 }, 20, 'all', undefined, invalidTarget);
    expect(snap).toBeNull();
  });
});

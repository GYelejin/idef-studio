/**
 * ТЕСТ №327: Примагничивание: Отклонение захвата левой границы при невалидной цели
 * 
 * Класс эквивалентности: SNAP-15 (Reject Left Border When Draft Target Invalid)
 * Описание: Проверяет отказ в захвате левой границы листа, если драфт-цель представляет собой несовместимый порт (например, левую границу холста).
 * Предусловия:
 *   - draftTarget: border left.
 * Действия:
 *   1. Вызвать getBorderSnapPoint у координаты X=25.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null, захват отклонен валидатором.
 */

import { describe, it, expect } from 'bun:test';
import { getBorderSnapPoint } from '../../src/core/geometry/snapping';

describe('ТЕСТ №327: Отклонение захвата левой границы SNAP-15', () => {
  it('отклоняет привязку к левой границе если цель несовместима', () => {
    const invalidTarget = {
      type: 'border' as const, side: 'left' as const, point: { x: 30, y: 500 }, role: 'input' as const,
    };
    const snap = getBorderSnapPoint({ x: 25, y: 300 }, 20, 'all', undefined, invalidTarget);
    expect(snap).toBeNull();
  });
});

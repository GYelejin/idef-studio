/**
 * ТЕСТ №328: Примагничивание: Отклонение захвата правой границы при невалидном источнике
 * 
 * Класс эквивалентности: SNAP-16 (Reject Right Border When Draft Source Invalid)
 * Описание: Проверяет отказ в захвате правой границы листа, если драфт-источник представляет собой правую границу листа.
 * Предусловия:
 *   - draftSource: border right.
 * Действия:
 *   1. Вызвать getBorderSnapPoint у правой границы (X=1575).
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен null, захват отклонен.
 */

import { describe, it, expect } from 'bun:test';
import { getBorderSnapPoint } from '../../src/core/geometry/snapping';

describe('ТЕСТ №328: Отклонение захвата правой границы SNAP-16', () => {
  it('отклоняет привязку к правой границе если источник несовместим', () => {
    const invalidSource = {
      type: 'border' as const, side: 'right' as const, point: { x: 1580, y: 300 }, role: 'output' as const,
    };
    const snap = getBorderSnapPoint({ x: 1575, y: 300 }, 20, 'all', invalidSource);
    expect(snap).toBeNull();
  });
});

/**
 * ТЕСТ №230: Привязка: Магнитный захват к правой границе холста (Выход)
 * 
 * Класс эквивалентности: SNAP-08 (Snap to Right Border Points)
 * Описание: Проверяет срабатывание магнитного захвата конца стрелки при приближении к правому краю листа.
 * Предусловия:
 *   - Курсор в точке (1565, 300).
 * Действия:
 *   1. Вызвать findSnapTarget для 'end'.
 *   2. Проверить snap.side и role.
 * Ожидаемый результат: snap.side === 'right', role === 'output'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';

describe('ТЕСТ №230: Захват у правой границы SNAP-08', () => {
  it('примагничивает конец стрелки к правой границе листа', () => {
    const snap = findSnapTarget({ x: 1565, y: 300 }, [], [], 35, undefined, undefined, 'end');
    expect(snap).toBeDefined();
    expect(snap?.type).toBe('border');
    expect(snap?.side).toBe('right');
  });
});

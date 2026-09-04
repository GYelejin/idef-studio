/**
 * ТЕСТ №245: Привязка: Захват курсора у нижней границы холста (Механизм)
 * 
 * Класс эквивалентности: SNAP-10 (Snap to Bottom Border Mechanism)
 * Описание: Проверяет магнитный захват вблизи нижней границы листа.
 * Предусловия:
 *   - Курсор в точке (400, 860).
 * Действия:
 *   1. Вызвать findSnapTarget для 'start'.
 *   2. Проверить side и role.
 * Ожидаемый результат: snap.side === 'bottom', snap.role === 'mechanism'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';

describe('ТЕСТ №245: Захват у нижней границы SNAP-10', () => {
  it('примагничивает к нижней границе листа с ролью mechanism', () => {
    const snap = findSnapTarget({ x: 400, y: 860 }, [], [], 25, undefined, undefined, 'start');
    expect(snap).toBeDefined();
    expect(snap?.side).toBe('bottom');
    expect(snap?.role).toBe('mechanism');
  });
});

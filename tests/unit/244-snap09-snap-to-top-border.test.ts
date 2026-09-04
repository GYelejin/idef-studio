/**
 * ТЕСТ №244: Привязка: Захват курсора у верхней границы холста (Управление)
 * 
 * Класс эквивалентности: SNAP-09 (Snap to Top Border Control)
 * Описание: Проверяет магнитный захват вблизи верхней границы листа при создании входящей стрелки.
 * Предусловия:
 *   - Курсор в точке (300, 45).
 * Действия:
 *   1. Вызвать findSnapTarget для 'start'.
 *   2. Проверить side и role.
 * Ожидаемый результат: snap.side === 'top', snap.role === 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';

describe('ТЕСТ №244: Захват у верхней границы SNAP-09', () => {
  it('примагничивает к верхней границе листа с ролью control', () => {
    const snap = findSnapTarget({ x: 300, y: 45 }, [], [], 25, undefined, undefined, 'start');
    expect(snap).toBeDefined();
    expect(snap?.side).toBe('top');
    expect(snap?.role).toBe('control');
  });
});

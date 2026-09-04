/**
 * ТЕСТ №229: Привязка: Магнитный захват к левой границе холста (Вход)
 * 
 * Класс эквивалентности: SNAP-07 (Snap to Left Border Points)
 * Описание: Проверяет срабатывание магнитного захвата при приближении курсора к левому краю листа.
 * Предусловия:
 *   - Курсор в точке (35, 300).
 * Действия:
 *   1. Вызвать findSnapTarget для 'start'.
 *   2. Проверить snap.type и snap.side.
 * Ожидаемый результат: snap.type === 'border', snap.side === 'left', role === 'input'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';

describe('ТЕСТ №229: Захват у левой границы SNAP-07', () => {
  it('примагничивает начало стрелки к левой границе листа', () => {
    const snap = findSnapTarget({ x: 35, y: 300 }, [], [], 35, undefined, undefined, 'start');
    expect(snap).toBeDefined();
    expect(snap?.type).toBe('border');
    expect(snap?.side).toBe('left');
  });
});

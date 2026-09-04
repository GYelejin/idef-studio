/**
 * ТЕСТ №73: Прилипание: Захват границ холста через getBorderSnapPoint
 * 
 * Класс эквивалентности: SNAP-04 (Border Snap Target Selection)
 * Описание: Проверяет притяжение курсора к границам холста (Left -> input, Top -> control, Right -> output, Bottom -> mechanism).
 * Предусловия:
 *   - Курсор расположен вблизи границ холста.
 * Действия:
 *   1. Проверить прилипание к левой границе (x=35).
 *   2. Проверить прилипание к верхней границе (y=45).
 * Ожидаемый результат: Определены цели прилипания с ролями 'input' и 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { getBorderSnapPoint } from '../../src/core/geometry';

describe('ТЕСТ №73: Прилипание к границам SNAP-04', () => {
  it('находит точки прилипания на границах холста', () => {
    const leftSnap = getBorderSnapPoint({ x: 35, y: 200 }, 25);
    expect(leftSnap).toBeDefined();
    expect(leftSnap!.side).toBe('left');
    expect(leftSnap!.role).toBe('input');

    const topSnap = getBorderSnapPoint({ x: 300, y: 45 }, 25);
    expect(topSnap).toBeDefined();
    expect(topSnap!.side).toBe('top');
    expect(topSnap!.role).toBe('control');
  });
});

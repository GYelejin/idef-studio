/**
 * ТЕСТ №72: Прилипание: Магнитный захват правой грани блока (роль output)
 * 
 * Класс эквивалентности: SNAP-03 (Snap to Block Output)
 * Описание: Проверяет захват курсора правой гранью блока с автоматическим назначением роли 'output'.
 * Предусловия:
 *   - Блок расположен на (400, 200, 210, 130).
 * Действия:
 *   1. Задать точку около правой грани блока (605, 265).
 *   2. Вызвать getBlockSnapPoint.
 * Ожидаемый результат: Точка примагничена к правой грани (side: 'right', role: 'output', x: 610).
 */

import { describe, it, expect } from 'bun:test';
import { getBlockSnapPoint } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №72: Прилипание к Output SNAP-03', () => {
  it('притягивает точку к правой грани блока с ролью output', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 210, height: 130, decompDiagramId: null };
    const snap = getBlockSnapPoint(b, { x: 605, y: 265 }, 25);
    expect(snap).toBeDefined();
    expect(snap!.side).toBe('right');
    expect(snap!.role).toBe('output');
    expect(snap!.point.x).toBe(610);
  });
});

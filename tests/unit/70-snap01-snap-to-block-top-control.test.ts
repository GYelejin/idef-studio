/**
 * ТЕСТ №70: Прилипание: Магнитный захват верхней грани блока (роль control)
 * 
 * Класс эквивалентности: SNAP-01 (Snap to Block Control)
 * Описание: Проверяет захват курсора верхней гранью блока с автоматическим назначением роли 'control'.
 * Предусловия:
 *   - Блок расположен на (400, 200, 210, 130).
 * Действия:
 *   1. Задать точку около верхней грани блока (450, 205).
 *   2. Вызвать getBlockSnapPoint.
 *   3. Проверить параметры захваченной цели.
 * Ожидаемый результат: Точка примагничена к верхней грани (side: 'top', role: 'control', y: 200).
 */

import { describe, it, expect } from 'bun:test';
import { getBlockSnapPoint } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №70: Прилипание к Control SNAP-01', () => {
  it('притягивает точку к верхней грани блока с ролью control', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 210, height: 130, decompDiagramId: null };
    const snap = getBlockSnapPoint(b, { x: 450, y: 205 }, 25);
    expect(snap).toBeDefined();
    expect(snap!.side).toBe('top');
    expect(snap!.role).toBe('control');
    expect(snap!.point.y).toBe(200);
  });
});

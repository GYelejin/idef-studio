/**
 * ТЕСТ №71: Прилипание: Магнитный захват нижней грани блока (роль mechanism)
 * 
 * Класс эквивалентности: SNAP-02 (Snap to Block Mechanism)
 * Описание: Проверяет захват курсора нижней гранью блока с автоматическим назначением роли 'mechanism'.
 * Предусловия:
 *   - Блок расположен на (400, 200, 210, 130).
 * Действия:
 *   1. Задать точку около нижней грани блока (450, 325).
 *   2. Вызвать getBlockSnapPoint.
 *   3. Проверить параметры захваченной цели.
 * Ожидаемый результат: Точка примагничена к нижней грани (side: 'bottom', role: 'mechanism', y: 330).
 */

import { describe, it, expect } from 'bun:test';
import { getBlockSnapPoint } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №71: Прилипание к Mechanism SNAP-02', () => {
  it('притягивает точку к нижней грани блока с ролью mechanism', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 210, height: 130, decompDiagramId: null };
    const snap = getBlockSnapPoint(b, { x: 450, y: 325 }, 25);
    expect(snap).toBeDefined();
    expect(snap!.side).toBe('bottom');
    expect(snap!.role).toBe('mechanism');
    expect(snap!.point.y).toBe(330);
  });
});

/**
 * ТЕСТ №132: Адаптация: Смещение блока со входом с левой границы
 * 
 * Класс эквивалентности: MOVE-02 (Block Move Inflow Adjustment)
 * Описание: Проверяет адаптацию входящей стрелки с левой границы при перемещении целевого блока.
 * Предусловия:
 *   - Блок с входящей стрелкой от левой границы.
 * Действия:
 *   1. Сместить блок на (50, 40).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Точка входа смещается синхронно с левой гранью блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №132: Смещение стрелки от левой границы MOVE-02', () => {
  it('адаптирует входящую стрелку с левой границы при сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Сырье',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 400, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 50, 40, [], [b]);
    expect(a.target.point.x).toBe(450);
    expect(a.target.point.y).toBe(290);
    expect(a.source.point.x).toBe(30);
  });
});

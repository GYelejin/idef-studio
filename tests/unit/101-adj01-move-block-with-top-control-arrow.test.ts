/**
 * ТЕСТ №101: Адаптация: Смещение блока с подключенной стрелкой Управления
 * 
 * Класс эквивалентности: ADJ-01 (Block Move Control Adjustment)
 * Описание: Проверяет смещение функционального блока с автоматической адаптацией стрелки Управления, входящей в верхнюю грань.
 * Предусловия:
 *   - Блок со стрелкой Управления сверху.
 * Действия:
 *   1. Сместить блок на (50, 50).
 *   2. Вызвать adjustArrowOnBlockMove.
 *   3. Проверить конечное смещение стрелки.
 * Ожидаемый результат: Стрелка Управления сохраняет ортогональность и смещает точку входа в блок.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №101: Смещение стрелки Управления ADJ-01', () => {
  it('адаптирует стрелку Управления при перемещении целевого блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Стандарт',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 200 } },
      role: 'control',
      points: [{ x: 500, y: 40 }, { x: 500, y: 200 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 50, 40, [], [b]);
    expect(a.target.point.x).toBe(550);
    expect(a.target.point.y).toBe(240);
  });
});

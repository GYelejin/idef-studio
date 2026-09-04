/**
 * ТЕСТ №131: Адаптация: Смещение блока с выходом на правую границу
 * 
 * Класс эквивалентности: MOVE-01 (Block Move Outflow Adjustment)
 * Описание: Проверяет адаптацию стрелки, идущей от правой грани перемещаемого блока к правой границе холста.
 * Предусловия:
 *   - Блок со стрелкой Выхода на правую границу.
 * Действия:
 *   1. Сместить блок на (80, 50).
 *   2. Вызвать adjustArrowOnBlockMove.
 *   3. Проверить координаты начала и конца стрелки.
 * Ожидаемый результат: Начало стрелки следует за блоком, конец удерживается на правой границе.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №131: Смещение стрелки к границе MOVE-01', () => {
  it('адаптирует стрелку Выхода к правой границе при сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Продукция',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 600, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 600, y: 250 }, { x: 1570, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 80, 50, [], [b]);
    expect(a.source.point.x).toBe(680);
    expect(a.source.point.y).toBe(300);
    expect(a.target.point.x).toBe(1570);
  });
});

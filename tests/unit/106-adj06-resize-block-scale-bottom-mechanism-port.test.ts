/**
 * ТЕСТ №106: Адаптация: Масштабирование блока с пересчетом нижнего порта Механизма
 * 
 * Класс эквивалентности: ADJ-06 (Block Resize Mechanism Port Adjustment)
 * Описание: Проверяет пересчет положения порта Механизма при изменении высоты и ширины блока.
 * Предусловия:
 *   - Блок увеличен по высоте с 100 до 200px.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить координату Y нижнего порта.
 * Ожидаемый результат: Точка подключения Механизма перемещается на новую нижнюю грань (y: 400).
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №106: Масштабирование порта Механизма ADJ-06', () => {
  it('смещает порт Механизма на новую нижнюю грань блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 200, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Оборудование',
      source: { type: 'border', side: 'bottom', point: { x: 300, y: 865 } },
      target: { type: 'block', id: b.id, side: 'bottom', point: { x: 300, y: 300 } },
      role: 'mechanism',
      points: [{ x: 300, y: 865 }, { x: 300, y: 300 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, b, { x: 200, y: 200, width: 200, height: 100 }, { x: 200, y: 200, width: 200, height: 200 }, [], [b]);
    expect(a.target.point.y).toBe(400);
  });
});

/**
 * ТЕСТ №107: Адаптация: Масштабирование блока с пересчетом правого порта Выхода
 * 
 * Класс эквивалентности: ADJ-07 (Block Resize Output Port Adjustment)
 * Описание: Проверяет смещение точки Выхода на новую правую грань блока.
 * Предусловия:
 *   - Блок расширен по ширине со 150 до 300px.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить координату X правого порта.
 * Ожидаемый результат: Точка Выхода смещена на координату новой правой грани (x: 500).
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №107: Масштабирование порта Выхода ADJ-07', () => {
  it('смещает порт Выхода на новую правую грань блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 300, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 350, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 350, y: 250 }, { x: 1570, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, b, { x: 200, y: 200, width: 150, height: 100 }, { x: 200, y: 200, width: 300, height: 100 }, [], [b]);
    expect(a.source.point.x).toBe(500);
  });
});

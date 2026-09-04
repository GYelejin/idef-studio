/**
 * ТЕСТ №105: Адаптация: Масштабирование блока с пересчетом верхнего порта Управления
 * 
 * Класс эквивалентности: ADJ-05 (Block Resize Control Port Adjustment)
 * Описание: Проверяет пропорциональное масштабирование X-координаты верхнего порта при изменении ширины блока.
 * Предусловия:
 *   - Блок расширен с ширины 200 до 400px.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить пропорциональное смещение точки входа.
 * Ожидаемый результат: Порт Управления смещен пропорционально коэффициенту расширения грани блока.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №105: Масштабирование порта Управления ADJ-05', () => {
  it('пропорционально смещает порт Управления при изменении ширины блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 400, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Регламент',
      source: { type: 'border', side: 'top', point: { x: 300, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 300, y: 200 } },
      role: 'control',
      points: [{ x: 300, y: 40 }, { x: 300, y: 200 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, b, { x: 200, y: 200, width: 200, height: 100 }, { x: 200, y: 200, width: 400, height: 100 }, [], [b]);
    expect(a.target.point.x).toBeGreaterThan(300);
  });
});

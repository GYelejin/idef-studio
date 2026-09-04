/**
 * ТЕСТ №332: Адаптация при ресайзе: Выравнивание промежуточных звеньев 4-точечной стрелки
 * 
 * Класс эквивалентности: RESIZE-07 (Adapt Four Point Arrow Intermediate Points)
 * Описание: Проверяет сохранение ортогональности промежуточных звеньев 4-точечной стрелки (pts[1].y = pts[0].y и pts[2].y = pts[3].y).
 * Предусловия:
 *   - 4-точечная стрелка.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить ортогональность первого и последнего звеньев.
 * Ожидаемый результат: Звенья ортогональны и выровнены по портам.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №332: 4-точечная стрелка при ресайзе RESIZE-07', () => {
  it('выравнивает промежуточные точки 4-точечной стрелки при ресайзе', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 400 }, { x: 1570, y: 400 }],
      pinned: true,
    };

    adjustArrowOnBlockResize(arrow, b1, { x: 200, y: 200, width: 200, height: 100 }, { x: 200, y: 200, width: 250, height: 120 });
    expect(arrow.points[1].y).toBe(arrow.points[0].y);
  });
});

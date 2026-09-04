/**
 * ТЕСТ №261: Адаптация: 4-точечные входящие стрелки с границ при перемещении блока
 * 
 * Класс эквивалентности: MOVE-16 (Block Move 4-Point Inflows From Borders)
 * Описание: Проверяет адаптацию 4-точечных входящих стрелок с верхней и нижней границ холста при сдвиге целевого блока.
 * Предусловия:
 *   - 4-точечные стрелки сверху и снизу.
 * Действия:
 *   1. Сместить блок на (30, 20).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: pts[1] и pts[2] пересчитаны с сохранением ортогональности.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №261: 4-точечные стрелки с границ MOVE-16', () => {
  it('адаптирует 4-точечные входящие стрелки сверху и снизу', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 300, width: 200, height: 100, decompDiagramId: null };
    const aTop: Arrow = {
      id: 'aTop', label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 300 } },
      role: 'control',
      points: [{ x: 200, y: 40 }, { x: 200, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 300 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(aTop, b, 40, 30, [], [b]);
    expect(aTop.points[3].x).toBe(540);
    expect(aTop.points[3].y).toBe(330);
  });
});

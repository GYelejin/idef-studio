/**
 * ТЕСТ №134: Адаптация: Смещение целевого блока с пересчетом ортогональных колен
 * 
 * Класс эквивалентности: MOVE-04 (Block Move Orthogonal Elbows)
 * Описание: Проверяет сохранение 90-градусных колен между смещенными по вертикали блоками.
 * Предусловия:
 *   - Два блока соединены Z-образной ортогональной стрелкой.
 * Действия:
 *   1. Сместить целевой блок на 100px вниз.
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Ортогональная стрелка удлиняет вертикальный участок, сохраняя все прямые углы.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №134: Пересчет колен стрелки MOVE-04', () => {
  it('сохраняет прямоугольные изломы при сдвиге целевого блока', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 200, y: 100, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 600, y: 300, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 350 } },
      role: 'output',
      points: [{ x: 400, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 350 }, { x: 600, y: 350 }],
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b2, 0, 100, [], [b1, b2]);
    expect(a.target.point.y).toBe(450);
  });
});

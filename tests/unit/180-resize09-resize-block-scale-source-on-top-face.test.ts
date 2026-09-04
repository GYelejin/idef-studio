/**
 * ТЕСТ №180: Масштабирование: Пропорциональное смещение источника на верхней грани
 * 
 * Класс эквивалентности: RESIZE-09 (Scale Source on Top Face)
 * Описание: Проверяет пропорциональное масштабирование координаты X порта на верхней грани блока.
 * Предусловия:
 *   - Блок шириной 200px растянут до 300px.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить source.point.x.
 * Ожидаемый результат: source.point.x смещен пропорционально увеличению ширины.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №180: Порт на верхней грани RESIZE-09', () => {
  it('масштабирует порт источника на верхней грани блока', () => {
    const oldB: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, width: 300 };
    const a: Arrow = {
      id: 'a1',
      label: 'Связь',
      source: { type: 'block', id: oldB.id, side: 'top', point: { x: 300, y: 200 } },
      target: { type: 'border', side: 'top', point: { x: 300, y: 40 } },
      role: 'control',
      points: [{ x: 300, y: 200 }, { x: 300, y: 40 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, newB, oldB, newB);
    expect(a.source.point.x).toBe(350);
  });
});

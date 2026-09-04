/**
 * ТЕСТ №179: Масштабирование: Пропорциональное смещение источника на левой грани
 * 
 * Класс эквивалентности: RESIZE-08 (Scale Source on Left Face)
 * Описание: Проверяет пропорциональное масштабирование координаты Y порта на левой контактной грани.
 * Предусловия:
 *   - Блок со стрелкой, начинающейся на левой грани.
 * Действия:
 *   1. Изменить высоту блока с 100 до 200px.
 *   2. Вызвать adjustArrowOnBlockResize.
 * Ожидаемый результат: Порт смещен пропорционально новой высоте.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №179: Порт на левой грани RESIZE-08', () => {
  it('масштабирует порт источника на левой грани', () => {
    const oldB: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, height: 200 };
    const a: Arrow = {
      id: 'a1',
      label: 'Связь',
      source: { type: 'block', id: oldB.id, side: 'left', point: { x: 200, y: 250 } },
      target: { type: 'border', side: 'bottom', point: { x: 200, y: 865 } },
      role: 'mechanism',
      points: [{ x: 200, y: 250 }, { x: 200, y: 865 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, newB, oldB, newB);
    expect(a.source.point.y).toBe(300);
  });
});

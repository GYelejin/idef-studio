/**
 * ТЕСТ №176: Масштабирование: Адаптация прямой стрелки к границе листа (2 точки)
 * 
 * Класс эквивалентности: RESIZE-05 (Scale 2-Point Arrow to Border)
 * Описание: Проверяет синхронное смещение граничной точки стрелки при изменении размера блока по высоте.
 * Предусловия:
 *   - Блок со стрелкой Выхода на правую границу.
 * Действия:
 *   1. Изменить размер блока по высоте на +60px.
 *   2. Вызвать adjustArrowOnBlockResize.
 * Ожидаемый результат: Оба конца 2-точечной стрелки выравниваются на одной высоте Y.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №176: Прямая стрелка к границе RESIZE-05', () => {
  it('выравнивает граничную точку 2-точечной стрелки при ресайзе блока', () => {
    const oldB: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, height: 160 };
    const a: Arrow = {
      id: 'a1',
      label: 'Выход',
      source: { type: 'block', id: oldB.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 1570, y: 250 }],
      pinned: false,
    };
    adjustArrowOnBlockResize(a, 'b1', newB, oldB);
    expect(a.source.point.y).toBe(a.target.point.y);
  });
});

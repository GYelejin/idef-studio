/**
 * ТЕСТ №205: Адаптация: 4-точечный ступенчатый вывод на правую границу (Case D n=4)
 * 
 * Класс эквивалентности: MOVE-09 (Block Move Stepped Outflow to Border)
 * Описание: Проверяет пересчет промежуточных звеньев ступенчатой стрелки на правую границу при сдвиге блока.
 * Предусловия:
 *   - Стрелка из 4 точек идет от блока на правую границу.
 * Действия:
 *   1. Сместить блок на (50, 40).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Начало смещено, промежуточный вертикальный коридор адаптирован.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №205: Ступенчатый выход на границу MOVE-09', () => {
  it('адаптирует 4-точечную стрелку к правой границе при сдвиге блока', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 400, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 600, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output',
      points: [{ x: 600, y: 250 }, { x: 800, y: 250 }, { x: 800, y: 400 }, { x: 1570, y: 400 }],
      pinned: true,
    };
    adjustArrowOnBlockMove(a, b, 50, 40, [], [b]);
    expect(a.points[0].x).toBe(650);
    expect(a.points[0].y).toBe(290);
  });
});

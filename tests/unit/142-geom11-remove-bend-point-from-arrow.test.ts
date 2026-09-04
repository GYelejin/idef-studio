/**
 * ТЕСТ №142: Геометрия: Удаление промежуточной вершины излома стрелки (removeArrowPoint)
 * 
 * Класс эквивалентности: GEOM-11 (Remove Arrow Bend Point)
 * Описание: Проверяет удаление точки излома по индексу с пересчетом ортогональной связи между соседними вершинами.
 * Предусловия:
 *   - Стрелка состоит из 6 точек между блоками.
 * Действия:
 *   1. Вызвать removeArrowPoint.
 *   2. Проверить длину массива points.
 * Ожидаемый результат: Количество точек уменьшено, излом удален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowGeometryOps } from '../../src/core/store/arrowGeometryOps';

describe('ТЕСТ №142: Удаление вершины излома GEOM-11', () => {
  it('удаляет точку излома стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(800, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 800, y: 250 } },
      role: 'output',
      points: [
        { x: 310, y: 250 },
        { x: 450, y: 250 },
        { x: 450, y: 350 },
        { x: 650, y: 350 },
        { x: 650, y: 250 },
        { x: 800, y: 250 }
      ],
      pinned: true,
    })!;
    const initialLen = a.points.length;
    ArrowGeometryOps.removeArrowPoint(store.state, a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeLessThan(initialLen);
  });
});

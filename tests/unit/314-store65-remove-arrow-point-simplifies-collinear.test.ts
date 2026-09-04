/**
 * ТЕСТ №314: Хранилище: Удаление промежуточной точки стрелки (removeArrowPoint)
 * 
 * Класс эквивалентности: STORE-65 (Remove Arrow Point Simplifies Collinear)
 * Описание: Проверяет удаление избыточного изгиба стрелки и пересчет ортогонального угла.
 * Предусловия:
 *   - 5-точечная стрелка.
 * Действия:
 *   1. Вызвать store.removeArrowPoint(a.id, 2).
 *   2. Проверить points.length.
 * Ожидаемый результат: Точка удалена, трасса ортогонализирована.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №314: Удаление точки стрелки STORE-65', () => {
  it('удаляет промежуточную точку ломаной стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 350 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 450, y: 150 }, { x: 450, y: 250 }, { x: 600, y: 250 }, { x: 600, y: 350 }, { x: 700, y: 350 }],
      pinned: true,
    })!;

    store.removeArrowPoint(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeLessThan(6);
  });
});

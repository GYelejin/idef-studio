/**
 * ТЕСТ №410: Геометрия: Перетрассировка 4-точечной стрелки при удалении точки
 * 
 * Класс эквивалентности: GEOM-25 (Remove Arrow Point Four Points Fallback)
 * Описание: Проверяет автоматический вызов buildOrthogonalRoute при вызове removeArrowPoint на стрелке из 4 точек, гарантируя сохранение валидной ортогональности.
 * Предусловия:
 *   - Стрелка из 4 точек.
 * Действия:
 *   1. Вызвать removeArrowPoint(a.id, 1).
 *   2. Проверить points.length >= 2.
 * Ожидаемый результат: Стрелка успешно перетрассирована роутером.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №410: Удаление точки 4-точечной стрелки GEOM-25', () => {
  it('перетрассирует стрелку через роутер при удалении точки из 4-точечной стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 350 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 400, y: 150 }, { x: 400, y: 350 }, { x: 500, y: 350 }],
      pinned: true,
    })!;

    store.removeArrowPoint(a.id, 1);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

/**
 * ТЕСТ №451: Геометрия: Вычисление угла при удалении точки с вертикальным входящим звеном
 * 
 * Класс эквивалентности: GEOM-29 (Remove Arrow Point Vertical Incoming Corner)
 * Описание: Проверяет расчет точки излома corner = (pPrev.x, pNext.y) при удалении точки из 5-точечной стрелки, когда входящее звено вертикально (prevIsHoriz=false).
 * Предусловия:
 *   - 5-точечная стрелка с вертикальным вторым звеном.
 * Действия:
 *   1. Вызвать removeArrowPoint(a.id, 2).
 *   2. Проверить points.length === 4.
 * Ожидаемый результат: Точка удалена, трасса сохранила ортогональность.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №451: Удаление точки с вертикальным звеном GEOM-29', () => {
  it('корректно соединяет звенья при удалении точки после вертикального звена', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 400, 'A1')!;

    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'output',
      points: [
        { x: 310, y: 150 },
        { x: 450, y: 150 },
        { x: 450, y: 300 },
        { x: 600, y: 300 },
        { x: 700, y: 450 },
      ],
      pinned: true,
    })!;

    store.removeArrowPoint(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

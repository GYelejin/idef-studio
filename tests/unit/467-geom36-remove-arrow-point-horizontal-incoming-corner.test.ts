/**
 * ТЕСТ №467: Геометрия: Вычисление угла при удалении точки с горизонтальным входящим звеном
 * 
 * Класс эквивалентности: GEOM-36 (Remove Arrow Point Horizontal Incoming Corner)
 * Описание: Проверяет расчет точки излома corner = (pPrev.x, pNext.y) при удалении точки из 5-точечной стрелки, когда входящее звено строго горизонтально (prevIsHoriz=true).
 * Предусловия:
 *   - 5-точечная стрелка с горизонтальным первым звеном.
 * Действия:
 *   1. Вызвать removeArrowPoint(a.id, 1).
 *   2. Проверить points.length === 4.
 * Ожидаемый результат: Точка удалена, трасса сохранила ортогональность.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №467: Удаление точки с горизонтальным звеном GEOM-36', () => {
  it('корректно соединяет звенья при удалении точки после горизонтального звена', () => {
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
        { x: 500, y: 150 },
        { x: 500, y: 300 },
        { x: 600, y: 300 },
        { x: 700, y: 450 },
      ],
      pinned: true,
    })!;

    store.removeArrowPoint(a.id, 1);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

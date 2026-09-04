/**
 * ТЕСТ №141: Геометрия: Смещение вертикального сегмента стрелки
 * 
 * Класс эквивалентности: GEOM-10 (Shift Vertical Segment)
 * Описание: Проверяет смещение промежуточного вертикального сегмента стрелки по оси X.
 * Предусловия:
 *   - Стрелка с вертикальным сегментом между блоками.
 * Действия:
 *   1. Сместить вертикальный сегмент на новую координату X.
 *   2. Проверить X-координаты отрезка.
 * Ожидаемый результат: Вертикальный сегмент сместился, сохраняя 90-градусные углы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowGeometryOps } from '../../src/core/store/arrowGeometryOps';

describe('ТЕСТ №141: Смещение вертикального сегмента GEOM-10', () => {
  it('смещает вертикальный сегмент стрелки по горизонтали', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 400, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 450 }, { x: 700, y: 450 }],
      pinned: true,
    })!;
    ArrowGeometryOps.shiftArrowSegment(store.state, a.id, 1, 560);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[1].x).toBe(560);
    expect(updated.points[2].x).toBe(560);
  });
});

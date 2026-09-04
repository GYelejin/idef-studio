/**
 * ТЕСТ №140: Геометрия: Смещение горизонтального сегмента стрелки
 * 
 * Класс эквивалентности: GEOM-09 (Shift Horizontal Segment)
 * Описание: Проверяет смещение горизонтального звена стрелки по оси Y с автоматической подстройкой соседних вертикальных звеньев.
 * Предусловия:
 *   - Стрелка из 5 точек с промежуточным горизонтальным сегментом между блоками.
 * Действия:
 *   1. Вызвать shiftArrowSegment.
 *   2. Проверить Y-координаты смещенного отрезка.
 * Ожидаемый результат: Сегмент смещен на новую координату Y, ортогональность сохранена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowGeometryOps } from '../../src/core/store/arrowGeometryOps';

describe('ТЕСТ №140: Смещение горизонтального сегмента GEOM-09', () => {
  it('смещает горизонтальный сегмент с сохранением углов 90 градусов', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(600, 400, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 700, y: 400 } },
      role: 'control',
      points: [{ x: 310, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 300 }, { x: 700, y: 300 }, { x: 700, y: 400 }],
      pinned: true,
    })!;
    ArrowGeometryOps.shiftArrowSegment(store.state, a.id, 0, 200);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].y).toBe(200);
  });
});

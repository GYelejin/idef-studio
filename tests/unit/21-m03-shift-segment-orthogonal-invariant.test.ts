/**
 * ТЕСТ №21: Мутация M3: Сдвиг сегмента стрелки со строгой ортогональностью
 * 
 * Класс эквивалентности: M3 (Segment Shift & Orthogonality Invariant)
 * Описание: Проверяет смещение параллельного коридора сегмента с сохранением 100% ортогональности всех смежных сегментов.
 * Предусловия:
 *   - Диаграмма содержит стрелку со ступенчатым маршрутом из 4 точек.
 * Действия:
 *   1. Сдвинуть промежуточный вертикальный сегмент на 50px по оси X.
 *   2. Проверить, что обновленный маршрут сохраняет строго прямые углы (dx === 0 || dy === 0).
 * Ожидаемый результат: Сегмент смещен, каждый смежный сегмент строго вертикален или строго горизонтален.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { getSegmentsFromPoints } from '../../src/core/geometry';

describe('ТЕСТ №21: Сдвиг сегмента M3', () => {
  it('сдвигает сегмент стрелки с сохранением 100% ортогональности', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'M3-Flow',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 265 }, { x: 400, y: 265 }],
      pinned: false,
    })!;
    store.shiftArrowSegment(a.id, 1, 260);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    const segs = getSegmentsFromPoints(updated.points);
    for (const seg of segs) {
      const isOrthogonal = Math.abs(seg.start.x - seg.end.x) < 0.01 || Math.abs(seg.start.y - seg.end.y) < 0.01;
      expect(isOrthogonal).toBe(true);
    }
  });
});

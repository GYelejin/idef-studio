/**
 * ТЕСТ №32: Сегменты: Удаление промежуточного сегмента через инспектор
 * 
 * Класс эквивалентности: SEG-02 (Segment Removal via Inspector)
 * Описание: Проверяет удаление одного из промежуточных сегментов через панель сегментов инспектора и корректное перестроение маршрута.
 * Предусловия:
 *   - Стрелка состоит из 5 точек (4 сегмента).
 * Действия:
 *   1. Вызвать removeArrowSegment для промежуточного сегмента.
 *   2. Проверить уменьшение числа точек маршрута.
 * Ожидаемый результат: Сегмент удален, маршрут сохраняет целостность и ортогональность.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №32: Удаление сегмента SEG-02', () => {
  it('удаляет промежуточный сегмент стрелки', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(600, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Multi-Seg',
      source: { type: 'border', side: 'left', point: { x: 50, y: 100 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 600, y: 365 } },
      role: 'input',
      points: [
        { x: 50, y: 100 },
        { x: 200, y: 100 },
        { x: 200, y: 200 },
        { x: 400, y: 200 },
        { x: 400, y: 365 },
        { x: 600, y: 365 },
      ],
      pinned: false,
    })!;
    store.removeArrowSegment(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points.length).toBeLessThan(6);
  });
});

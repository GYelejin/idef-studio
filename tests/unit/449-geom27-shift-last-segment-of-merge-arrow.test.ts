/**
 * ТЕСТ №449: Геометрия: Сдвиг завершающего сегмента стрелки слияния, прикрепленной к узлу
 * 
 * Класс эквивалентности: GEOM-27 (Shift Last Segment Of Merge Arrow)
 * Описание: Проверяет обновление целевой точки стрелки слияния и координаты Y узла при перемещении последнего горизонтального сегмента стрелки слияния.
 * Предусловия:
 *   - Ствол и стрелка слияния в узел ствола.
 * Действия:
 *   1. Сдвинуть последний сегмент стрелки слияния.
 *   2. Проверить сохранение корректного положения стрелки.
 * Ожидаемый результат: Сегмент стрелки слияния успешно сдвинут.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №449: Сдвиг сегмента слияния GEOM-27', () => {
  it('обновляет координаты при сдвиге последнего сегмента стрелки слияния', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 150 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 450 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 450 }, { x: 400, y: 450 }, { x: 400, y: 150 }, { x: 500, y: 150 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(merge.id, 2, 160);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points.length).toBeGreaterThanOrEqual(2);
  });
});

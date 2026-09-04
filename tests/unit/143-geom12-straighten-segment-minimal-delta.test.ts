/**
 * ТЕСТ №143: Геометрия: Спрямление геометрии стрелки к прямой линии (straightenArrow)
 * 
 * Класс эквивалентности: GEOM-12 (Straighten Arrow Minimal Delta)
 * Описание: Проверяет вызов straightenArrow для сброса сложного маршрута к прямой ортогональной связи.
 * Предусловия:
 *   - Стрелка с изломами между блоками на одном уровне Y.
 * Действия:
 *   1. Вызвать straightenArrow.
 *   2. Проверить результат.
 * Ожидаемый результат: Стрелка спрямлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowGeometryOps } from '../../src/core/store/arrowGeometryOps';

describe('ТЕСТ №143: Спрямление стрелки GEOM-12', () => {
  it('спрямляет геометрию стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(700, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Стрелка',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 250 } },
      role: 'output',
      points: [{ x: 310, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 250 }, { x: 700, y: 250 }],
      pinned: true,
    })!;
    ArrowGeometryOps.straightenArrow(store.state, a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated).toBeDefined();
    expect(updated.points.length).toBe(2);
  });
});

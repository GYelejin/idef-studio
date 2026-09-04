/**
 * ТЕСТ №77: Узлы: Ограничение перемещения узла с отступом от концов сегмента (>= 15px)
 * 
 * Класс эквивалентности: JUNC-02 (Junction Endpoint Clamping)
 * Описание: Проверяет ограничение движения узла ветвления, предотвращающее наложение на концы стрелки.
 * Предусловия:
 *   - Стрелка от (30, 265) до (500, 265) с узлом.
 * Действия:
 *   1. Попытаться переместить узел вплотную к началу стрелки (x: 35).
 *   2. Проверить отступ не менее 15px.
 * Ожидаемый результат: Координата X узла ограничена отступом (x >= 45).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №77: Ограничение перемещения узла JUNC-02', () => {
  it('ограничивает позицию узла с отступом не менее 15px от конца сегмента', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b = store.createBlock(500, 200, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 500, y: 265 }],
      pinned: false,
    })!;
    const junc = store.createJunction('branch', { x: 200, y: 265 }, trunk.id);
    store.moveJunction(junc.id, { x: 32, y: 265 });
    const updated = store.getActiveDiagram()!.junctions.find(j => j.id === junc.id)!;
    expect(updated.point.x).toBeGreaterThanOrEqual(45);
  });
});

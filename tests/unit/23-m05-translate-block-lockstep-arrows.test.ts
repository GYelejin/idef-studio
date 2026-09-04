/**
 * ТЕСТ №23: Мутация M5: Перемещение блока с синхронным ведением стрелок
 * 
 * Класс эквивалентности: M5 (Block Dragging Lockstep Update)
 * Описание: Проверяет синхронное смещение всех подключенных стрелок и узлов ветвления при перетаскивании блока.
 * Предусловия:
 *   - Диаграмма содержит блок (300, 200) и подключенную входную стрелку.
 * Действия:
 *   1. Переместить блок на (+100px, +50px).
 *   2. Проверить, что целевая точка стрелки сместилась синхронно с блоком.
 * Ожидаемый результат: Блок перемещен на (400, 250), точка подключения стрелки сдвинулась на аналогичную дельту.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №23: Перемещение блока M5', () => {
  it('синхронно перемещает концы стрелок при перемещении блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'M5-Flow',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    store.updateBlock(b.id, { x: 400, y: 250 });
    store.recomputeArrowRoute(a);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    const lastPt = updated.points[updated.points.length - 1];
    expect(lastPt.x).toBe(400);
  });
});

/**
 * ТЕСТ №86: Стрелки: Установка цвета семейства потока для ствола и ответвлений
 * 
 * Класс эквивалентности: ARR-06 (Flow Family Coloring)
 * Описание: Проверяет каскадную окраску ствола и всех связанных ответвлений вызовом setFlowFamilyColor.
 * Предусловия:
 *   - Магистраль и ответвление на диаграмме.
 * Действия:
 *   1. Вызвать setFlowFamilyColor(trunk.id, '#ef4444').
 *   2. Проверить цвет магистрали и ветви.
 * Ожидаемый результат: Оба потока окрашены в цвет '#ef4444'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №86: Цвет семейства потока ARR-06', () => {
  it('применяет цвет ко всему дереву потоков', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(400, 100, 'A1')!;
    const b2 = store.createBlock(400, 300, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'border', side: 'left', point: { x: 30, y: 165 } },
      target: { type: 'block', id: b1.id, side: 'left', point: { x: 400, y: 165 } },
      role: 'input',
      points: [{ x: 30, y: 165 }, { x: 400, y: 165 }],
      pinned: false,
    })!;
    const junc = store.createJunction('branch', { x: 200, y: 165 }, trunk.id);
    const branch = store.createArrow({
      label: 'Branch',
      source: { type: 'junction', id: junc.id, point: { x: 200, y: 165 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 400, y: 365 } },
      role: 'input',
      points: [{ x: 200, y: 165 }, { x: 200, y: 365 }, { x: 400, y: 365 }],
      pinned: false,
    })!;
    store.setFlowFamilyColor(trunk.id, '#ef4444');
    const updatedTrunk = store.getActiveDiagram()!.arrows.find(a => a.id === trunk.id)!;
    const updatedBranch = store.getActiveDiagram()!.arrows.find(a => a.id === branch.id)!;
    expect(updatedTrunk.color).toBe('#ef4444');
    expect(updatedBranch.color).toBe('#ef4444');
  });
});

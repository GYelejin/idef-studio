/**
 * ТЕСТ №307: Хранилище: Каскадное окрашивание семейства потоков (setFlowFamilyColor)
 * 
 * Класс эквивалентности: STORE-58 (Set Flow Family Color Propagation)
 * Описание: Проверяет распространение выбранного цвета на весь ствол и все дочерние ответвления через узел.
 * Предусловия:
 *   - Ствол и ответвление через узел.
 * Действия:
 *   1. Вызвать store.setFlowFamilyColor(trunk.id, '#10b981').
 *   2. Проверить цвет ствола и дочерней ветви.
 * Ожидаемый результат: И ствол, и ветвь окрашены в '#10b981'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №307: Окрашивание семейства потоков STORE-58', () => {
  it('распространяет цвет на родительскую стрелку и ее ветви', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 500, y: 150 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'junction', id: junc.id, point: { x: 500, y: 150 } },
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 500, y: 450 }, { x: 700, y: 450 }], pinned: false,
    })!;

    store.setFlowFamilyColor(trunk.id, '#10b981');
    const d = store.getActiveDiagram()!;
    const updatedTrunk = d.arrows.find(a => a.id === trunk.id)!;
    const updatedBranch = d.arrows.find(a => a.id === branch.id)!;
    expect(updatedTrunk.color).toBe('#10b981');
    expect(updatedBranch.color).toBe('#10b981');
  });
});

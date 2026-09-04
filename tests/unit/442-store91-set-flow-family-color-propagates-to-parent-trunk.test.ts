/**
 * ТЕСТ №442: Хранилище: Каскадная передача цвета семейству потока от дочерней ветви к родительскому стволу
 * 
 * Класс эквивалентности: STORE-91 (Set Flow Family Color Propagates To Parent Trunk)
 * Описание: Проверяет распространение цвета на родительский ствол при вызове setFlowFamilyColor на дочерней стрелке ветвления.
 * Предусловия:
 *   - Ствол и дочерняя ветвь.
 * Действия:
 *   1. Вызвать setFlowFamilyColor(branch.id, '#ef4444').
 *   2. Проверить цвет родительского ствола trunk.color === '#ef4444'.
 * Ожидаемый результат: Цвет родительского ствола каскадно обновлен.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №442: Каскадный цвет к родителю STORE-91', () => {
  it('окрашивает родительский ствол при смене цвета дочерней ветви', () => {
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
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 450 }], pinned: false,
    })!;

    store.setFlowFamilyColor(branch.id, '#ef4444');
    const updatedTrunk = store.getActiveDiagram()!.arrows.find(ar => ar.id === trunk.id)!;
    expect(updatedTrunk.color).toBe('#ef4444');
  });
});

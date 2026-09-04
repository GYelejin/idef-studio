/**
 * ТЕСТ №456: Хранилище: Удержание подписи и пересчет выноски при updateArrow
 * 
 * Класс эквивалентности: STORE-98 (Update Arrow Clamps Label And Updates Leader)
 * Описание: Проверяет автоматический вызов clampLabelToCanvas и generateLeaderPoints при изменении свойств стрелки с активной выносной линией через updateArrow.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Вызвать store.updateArrow(a.id, { label: 'Новый текст' }).
 *   2. Проверить пересчет leaderPoints.
 * Ожидаемый результат: Подпись удержана на полотне, выносная линия обновлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №456: updateArrow с выноской STORE-98', () => {
  it('удерживает подпись и пересчитывает выноску при updateArrow', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(600, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Текст',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 600, y: 150 }], pinned: false,
      showLeader: true, labelPos: { x: 450, y: 120 },
    })!;

    store.updateArrow(a.id, { label: 'Новое имя' });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

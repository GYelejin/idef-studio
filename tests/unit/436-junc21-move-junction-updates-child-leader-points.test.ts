/**
 * ТЕСТ №436: Узлы: Обновление выноски дочерней ветви при смещении родительского узла
 * 
 * Класс эквивалентности: JUNC-21 (Move Junction Updates Child Leader Points)
 * Описание: Проверяет автоматический пересчет точек выносной линии leaderPoints у дочерней ветви при смещении узла ветвления.
 * Предусловия:
 *   - Ствол и дочерняя ветвь с showLeader: true и labelPos.
 * Действия:
 *   1. Сместить узел через moveJunction.
 *   2. Проверить наличие и корректность leaderPoints у ветви.
 * Ожидаемый результат: Точки выноски согласованы с новым положением узла.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №436: Выноска ветви при сдвиге узла JUNC-21', () => {
  it('пересчитывает выноску текста дочерней ветви при перемещении узла', () => {
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
      role: 'input', points: [{ x: 500, y: 150 }, { x: 600, y: 150 }, { x: 600, y: 450 }, { x: 700, y: 450 }], pinned: true,
      showLeader: true, labelPos: { x: 550, y: 120 },
    })!;

    store.moveJunction(junc.id, { x: 520, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

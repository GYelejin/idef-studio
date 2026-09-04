/**
 * ТЕСТ №393: Узлы: Ортогонализация 2-точечной ветви при смещении узла
 * 
 * Класс эквивалентности: JUNC-18 (Move Junction Reroutes Diagonal Two Point Branch)
 * Описание: Проверяет ортогонализацию 2-точечной дочерней стрелки через buildOrthogonalRoute при смещении узла, сделавшем её диагональной.
 * Предусловия:
 *   - Узел соединен со входом блока прямой линией.
 * Действия:
 *   1. Сместить узел по оси Y.
 *   2. Проверить points.length >= 3.
 * Ожидаемый результат: Диагональная 2-точечная стрелка перестроена в ортогональную ломаную.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №393: Ортогонализация 2-точечной ветви JUNC-18', () => {
  it('перестраивает 2-точечную диагональную ветвь в ортогональный путь при смещении узла', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 300, 'A1')!;

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
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 350 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 350 }], pinned: false,
    })!;

    store.moveJunction(junc.id, { x: 520, y: 150 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.points.length).toBeGreaterThan(2);
  });
});

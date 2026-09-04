/**
 * ТЕСТ №406: Геометрия: Синхронизация сегмента у узла при попытке сдвига
 * 
 * Класс эквивалентности: GEOM-21 (Shift Segment Attached To Junction Synchronizes With Trunk)
 * Описание: Проверяет сохранение целостности и синхронизацию узла ветвления и первого сегмента дочерней стрелки с родительской магистралью через synchronizeJunctions.
 * Предусловия:
 *   - Стрелка ветви с source.type: 'junction'.
 * Действия:
 *   1. Вызвать shiftArrowSegment для первого сегмента ветви.
 *   2. Проверить согласованность координат узла и точки привязки ветви.
 * Ожидаемый результат: Координаты узла и начала ветви согласованы и привязаны к стволу.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №406: Синхронизация сегмента у узла GEOM-21', () => {
  it('согласует координату ветви и узла со стволом при сдвиге прикрепленного сегмента', () => {
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
    })!;

    store.shiftArrowSegment(branch.id, 0, 190);
    const updatedJunc = store.getActiveDiagram()!.junctions.find(j => j.id === junc.id)!;
    const updatedBranch = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updatedJunc.point.y).toBe(trunk.points[0].y);
    expect(updatedBranch.source.point.y).toBe(trunk.points[0].y);
  });
});

/**
 * ТЕСТ №458: Геометрия: Синхронизация вертикальной ветви и выноски при сдвиге вертикального ствола
 * 
 * Класс эквивалентности: GEOM-31 (Shift Vertical Trunk Updates Child Branch And Leader)
 * Описание: Проверяет обновление координаты child.points[1].x и пересчет leaderPoints дочерней ветви при сдвиге вертикального сегмента родительского ствола.
 * Предусловия:
 *   - Трасса со стволом, имеющим вертикальный сегмент 1.
 * Действия:
 *   1. Сдвинуть вертикальный сегмент ствола через shiftArrowSegment.
 *   2. Проверить child.points[0].x и leaderPoints.
 * Ожидаемый результат: Дочерняя ветвь и выноска согласованы с новым положением ствола.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №458: Сдвиг вертикального ствола GEOM-31', () => {
  it('обновляет прикрепленную ветвь и её выноску при сдвиге ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 150, 'A1')!;
    const b2 = store.createBlock(600, 550, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол вертикальный',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 200 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 600 } },
      role: 'output',
      points: [{ x: 310, y: 200 }, { x: 400, y: 200 }, { x: 400, y: 600 }, { x: 600, y: 600 }],
      pinned: true,
    })!;

    const junc = store.createJunction('branch', { x: 400, y: 350 }, trunk.id);
    const branch = store.createArrow({
      label: 'Ветвь с выноской',
      source: { type: 'junction', id: junc.id, point: { x: 400, y: 350 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 500 } },
      role: 'output',
      points: [{ x: 400, y: 350 }, { x: 400, y: 500 }, { x: 1570, y: 500 }],
      pinned: true, showLeader: true, labelPos: { x: 450, y: 250 },
    })!;

    store.shiftArrowSegment(trunk.id, 1, 430);
    const updatedBranch = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updatedBranch.points[0].x).toBe(430);
    expect(updatedBranch.points[1].x).toBe(430);
    expect(updatedBranch.leaderPoints).toBeDefined();
  });
});

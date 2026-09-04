/**
 * ТЕСТ №460: Геометрия: Обновление выносной линии перемещаемой стрелки
 * 
 * Класс эквивалентности: GEOM-33 (Shift Segment Updates Own Leader Points)
 * Описание: Проверяет вызов generateLeaderPoints для самой перемещаемой стрелки при выполнении shiftArrowSegment.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Сдвинуть сегмент стрелки через shiftArrowSegment.
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Выносная линия перемещаемой стрелки обновлена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №460: Выноска при сдвиге сегмента GEOM-33', () => {
  it('обновляет собственную выноску при сдвиге сегмента', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(100, 150, 'A1')!;

    const a = store.createArrow({
      label: 'Стрелка с выноской',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 310, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output',
      points: [{ x: 310, y: 200 }, { x: 500, y: 200 }, { x: 500, y: 400 }, { x: 1570, y: 400 }],
      pinned: true, showLeader: true, labelPos: { x: 450, y: 150 },
    })!;

    store.shiftArrowSegment(a.id, 1, 550);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

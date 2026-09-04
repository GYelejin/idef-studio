/**
 * ТЕСТ №461: Геометрия: Обновление выносной линии при straightenArrow
 * 
 * Класс эквивалентности: GEOM-34 (Straighten Arrow Updates Leader Points)
 * Описание: Проверяет обновление leaderPoints стрелки при спрямлении её маршрута через ArrowGeometryOps.straightenArrow.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Вызвать ArrowGeometryOps.straightenArrow(state, a.id).
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Выносная линия обновлена после спрямления маршрута.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowGeometryOps } from '../../src/core/store/arrowGeometryOps';

describe('ТЕСТ №461: straightenArrow с выноской GEOM-34', () => {
  it('обновляет выноску при спрямлении маршрута', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(100, 150, 'A1')!;

    const a = store.createArrow({
      label: 'Спрямление маршрута',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 310, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'output', points: [{ x: 310, y: 200 }, { x: 1570, y: 200 }],
      pinned: true, labelPos: { x: 400, y: 150 },
    })!;
    a.showLeader = true;

    ArrowGeometryOps.straightenArrow(store.state, a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

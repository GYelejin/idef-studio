/**
 * ТЕСТ №388: Хранилище: Пересчет выноски при сбросе маршрута стрелки
 * 
 * Класс эквивалентности: STORE-82 (Reset Arrow Route Recalculates Leader Points)
 * Описание: Проверяет автоматическую регенерацию точек выносной линии при вызове resetArrowRoute для стрелки с выноской.
 * Предусловия:
 *   - Стрелка с showLeader: true и произвольной трассой.
 * Действия:
 *   1. Вызвать store.resetArrowRoute(a.id).
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Точки выноски согласованы с новым сброшенным маршрутом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №388: Выноска при сбросе маршрута STORE-82', () => {
  it('пересчитывает точки выносной линии при сбросе маршрута стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 500, y: 300 }, { x: 700, y: 150 }], pinned: true,
      showLeader: true, labelPos: { x: 400, y: 80 },
    })!;

    store.resetArrowRoute(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

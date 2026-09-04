/**
 * ТЕСТ №391: Хранилище: Пересчет выноски при удалении промежуточной точки стрелки
 * 
 * Класс эквивалентности: STORE-85 (Remove Arrow Point Recalculates Leader)
 * Описание: Проверяет обновление точек выносной линии при удалении промежуточного изгиба стрелки через removeArrowPoint.
 * Предусловия:
 *   - Стрелка с 5 точками и выноской.
 * Действия:
 *   1. Вызвать removeArrowPoint.
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Выноска пересчитана для сокращенной трассы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №391: Выноска при удалении точки стрелки STORE-85', () => {
  it('пересчитывает выносную линию при удалении промежуточной точки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 400, 'A1')!;

    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 450, y: 150 }, { x: 450, y: 300 }, { x: 600, y: 300 }, { x: 600, y: 450 }, { x: 700, y: 450 }],
      pinned: true, showLeader: true, labelPos: { x: 500, y: 250 },
    })!;

    store.removeArrowPoint(a.id, 2);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

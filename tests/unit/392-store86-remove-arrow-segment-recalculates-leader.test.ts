/**
 * ТЕСТ №392: Хранилище: Пересчет выноски при удалении сегмента стрелки
 * 
 * Класс эквивалентности: STORE-86 (Remove Arrow Segment Recalculates Leader)
 * Описание: Проверяет обновление точек выносной линии при удалении сегмента стрелки через removeArrowSegment.
 * Предусловия:
 *   - Стрелка с несколькими сегментами и выноской.
 * Действия:
 *   1. Вызвать removeArrowSegment.
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Выноска пересчитана.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №392: Выноска при удалении сегмента стрелки STORE-86', () => {
  it('пересчитывает выносную линию при удалении сегмента стрелки', () => {
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

    store.removeArrowSegment(a.id, 1);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

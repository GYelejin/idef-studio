/**
 * ТЕСТ №211: Адаптация: Синхронное перемещение подписи на последнем сегменте
 * 
 * Класс эквивалентности: MOVE-15 (Synchronize Last Segment Label)
 * Описание: Проверяет следование текста подписи за целевым блоком.
 * Предусловия:
 *   - Подпись привязана к последнему сегменту стрелки.
 * Действия:
 *   1. Сместить целевой блок на (50, 40).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: Подпись перемещается синхронно с целевым портом.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №211: Подпись на конечном сегменте MOVE-15', () => {
  it('перемещает подпись конечного сегмента синхронно с блоком-приемником', () => {
    const b: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 600, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 600, y: 250 }],
      labelPos: { x: 550, y: 235 },
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 50, 40, [], [b]);
    expect(a.labelPos?.x).toBe(600);
    expect(a.labelPos?.y).toBe(275);
  });
});

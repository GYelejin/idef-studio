/**
 * ТЕСТ №210: Адаптация: Синхронное перемещение подписи на первом сегменте
 * 
 * Класс эквивалентности: MOVE-14 (Synchronize First Segment Label)
 * Описание: Проверяет следование текста подписи за блоком-источником при его перемещении.
 * Предусловия:
 *   - Подпись привязана к начальному горизонтальному сегменту.
 * Действия:
 *   1. Сместить блок-источник на (40, 60).
 *   2. Вызвать adjustArrowOnBlockMove.
 * Ожидаемый результат: labelPos.x и labelPos.y смещены на (40, 60).
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №210: Подпись на первом сегменте MOVE-14', () => {
  it('перемещает подпись начального сегмента синхронно с блоком-источником', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const a: Arrow = {
      id: 'a1',
      label: 'Поток',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 1570, y: 250 }],
      labelPos: { x: 460, y: 235 },
      pinned: false,
    };
    adjustArrowOnBlockMove(a, b, 40, 60, [], [b]);
    expect(a.labelPos?.x).toBe(500);
    expect(a.labelPos?.y).toBe(295);
  });
});

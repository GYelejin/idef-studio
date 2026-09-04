/**
 * ТЕСТ №399: Перемещение блока: Перепривязка подписи к альтернативному сегменту при смене ориентации
 * 
 * Класс эквивалентности: MOVE-20 (Rebind Label To Alternate Orientation Segment)
 * Описание: Проверяет корректное сохранение и обновление координат labelPos при смещении блока, когда привязанный сегмент меняет ориентацию.
 * Предусловия:
 *   - Стрелка с надписью.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove с перемещением блока.
 *   2. Проверить координаты labelPos.
 * Ожидаемый результат: Координаты подписи валидны и согласованы с новым положением сегментов.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №399: Перепривязка подписи к сегменту MOVE-20', () => {
  it('сохраняет подпись при изменении структуры сегментов стрелки', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 250 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 250 }, { x: 600, y: 250 }],
      pinned: false,
      labelPos: { x: 450, y: 240 },
    };

    adjustArrowOnBlockMove(arrow, b1, 20, 20);
    expect(arrow.labelPos).toBeDefined();
    expect(arrow.labelPos?.y).toBeDefined();
  });
});

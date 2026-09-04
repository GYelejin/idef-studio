/**
 * ТЕСТ №248: Привязка: Конкуренция расстояний между границей и сегментом стрелки
 * 
 * Класс эквивалентности: SNAP-13 (Snap Competition Border vs Segment)
 * Описание: Проверяет выбор более близкой цели захвата при одновременном нахождении рядом границы и стрелки.
 * Предусловия:
 *   - Курсор в точке (32, 200) ближе к левой границе (X=30), чем к началу сегмента.
 * Действия:
 *   1. Вызвать findSnapTarget.
 *   2. Проверить результат.
 * Ожидаемый результат: Выбрана более близкая граница (border).
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №248: Конкуренция границы и сегмента SNAP-13', () => {
  it('выбирает более близкую цель при наложении радиусов захвата', () => {
    const existingArr: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 50, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input', points: [{ x: 50, y: 200 }, { x: 1570, y: 200 }], pinned: false,
    };
    const snap = findSnapTarget({ x: 32, y: 200 }, [], [existingArr], 40, undefined, undefined, 'start');
    expect(snap).toBeDefined();
    expect(snap?.type).toBe('border');
  });
});

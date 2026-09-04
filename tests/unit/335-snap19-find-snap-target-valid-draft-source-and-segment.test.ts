/**
 * ТЕСТ №335: Примагничивание: Успешный захват сегмента стрелки с валидным draftSource
 * 
 * Класс эквивалентности: SNAP-19 (Find Snap Target Valid Source And Segment)
 * Описание: Проверяет успешный захват сегмента ствола при начале стрелки из правой грани блока (валидное слияние).
 * Предусловия:
 *   - Ствол стрелки и блок-источник.
 * Действия:
 *   1. Вызвать findSnapTarget около ствола с draftSource от правой грани блока.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен объект SnapTarget типа segment.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №335: Захват сегмента с источником SNAP-19', () => {
  it('успешно примагничивает к сегменту при валидном источнике', () => {
    const trunk: Arrow = {
      id: 'trunk-1', label: 'Ствол',
      source: { type: 'border', side: 'left', point: { x: 30, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false,
    };
    const draftSource = {
      type: 'block' as const, id: 'b1', side: 'right' as const, point: { x: 300, y: 400 }, role: 'output' as const,
    };

    const target = findSnapTarget({ x: 500, y: 305 }, [], [trunk], 15, undefined, undefined, 'target', draftSource);
    expect(target).toBeDefined();
    expect(target?.type).toBe('arrow_segment');
  });
});

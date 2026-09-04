/**
 * ТЕСТ №336: Примагничивание: Успешный захват сегмента стрелки с валидной draftTarget
 * 
 * Класс эквивалентности: SNAP-20 (Find Snap Target Valid Target And Segment)
 * Описание: Проверяет захват сегмента ствола как источника при ответвлении в верхнюю грань блока (Управление).
 * Предусловия:
 *   - Ствол стрелки и блок-цель.
 * Действия:
 *   1. Вызвать findSnapTarget около ствола с draftTarget к грани top блока.
 *   2. Проверить результат.
 * Ожидаемый результат: Сегмент захвачен в качестве источника ответвления.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №336: Захват сегмента с целью SNAP-20', () => {
  it('успешно примагничивает к сегменту как источнику ветвления', () => {
    const trunk: Arrow = {
      id: 'trunk-1', label: 'Ствол',
      source: { type: 'border', side: 'left', point: { x: 30, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false,
    };
    const draftTarget = {
      type: 'block' as const, id: 'b2', side: 'top' as const, point: { x: 600, y: 450 }, role: 'control' as const,
    };

    const target = findSnapTarget({ x: 500, y: 305 }, [], [trunk], 15, undefined, undefined, 'start', undefined, draftTarget);
    expect(target).toBeDefined();
    expect(target?.type).toBe('arrow_segment');
  });
});

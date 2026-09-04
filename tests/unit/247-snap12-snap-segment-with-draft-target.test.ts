/**
 * ТЕСТ №247: Привязка: Захват сегмента стрелки как источника ответвления для драфт-цели
 * 
 * Класс эквивалентности: SNAP-12 (Snap Segment With Draft Target)
 * Описание: Проверяет захват сегмента стрелки для создания ответвления в сторону драфт-цели (блок top).
 * Предусловия:
 *   - Драфт-цель: block top, курсор у сегмента.
 * Действия:
 *   1. Вызвать findSnapTarget.
 *   2. Проверить результат.
 * Ожидаемый результат: snap.type === 'arrow_segment'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';
import { Arrow, SnapTarget } from '../../src/types/idef0';

describe('ТЕСТ №247: Захват сегмента с драфт-целью SNAP-12', () => {
  it('валидирует и захватывает сегмент при ответвлении в верхнюю грань блока', () => {
    const draftTgt: SnapTarget = { type: 'block', id: 'b2', side: 'top', point: { x: 500, y: 400 } };
    const existingArr: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false,
    };
    const snap = findSnapTarget({ x: 500, y: 202 }, [], [existingArr], 25, undefined, draftTgt, 'start');
    expect(snap).toBeDefined();
    expect(snap?.type).toBe('arrow_segment');
  });
});

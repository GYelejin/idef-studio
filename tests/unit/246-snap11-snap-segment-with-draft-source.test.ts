/**
 * ТЕСТ №246: Привязка: Захват сегмента стрелки с учетом валидации драфт-источника
 * 
 * Класс эквивалентности: SNAP-11 (Snap Segment With Draft Source)
 * Описание: Проверяет захват сегмента стрелки как цели слияния при наличии корректного драфт-источника (блок right).
 * Предусловия:
 *   - Драфт-источник: block right, курсор рядом со стрелкой.
 * Действия:
 *   1. Вызвать findSnapTarget.
 *   2. Проверить результат.
 * Ожидаемый результат: snap.type === 'arrow_segment'.
 */

import { describe, it, expect } from 'bun:test';
import { findSnapTarget } from '../../src/core/geometry/snapping';
import { Arrow, SnapTarget } from '../../src/types/idef0';

describe('ТЕСТ №246: Захват сегмента с драфт-источником SNAP-11', () => {
  it('валидирует и захватывает сегмент при выходе из правой грани блока', () => {
    const draftSrc: SnapTarget = { type: 'block', id: 'b1', side: 'right', point: { x: 300, y: 200 } };
    const existingArr: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false,
    };
    const snap = findSnapTarget({ x: 500, y: 302 }, [], [existingArr], 25, draftSrc, undefined, 'target');
    expect(snap).toBeDefined();
    expect(snap?.type).toBe('arrow_segment');
  });
});

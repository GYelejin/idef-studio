/**
 * ТЕСТ №164: Математика: Примагничивание подписи слева от вертикального сегмента
 * 
 * Класс эквивалентности: MATH-07 (Snap Label Vertical Left)
 * Описание: Проверяет привязку подписи стрелки на 8px левее вертикального сегмента.
 * Предусловия:
 *   - Вертикальная стрелка, курсор на 6px левее.
 * Действия:
 *   1. Вызвать snapLabelToArrow.
 *   2. Проверить labelPos.x.
 * Ожидаемый результат: labelPos.x === seg.x - 8.
 */

import { describe, it, expect } from 'bun:test';
import { snapLabelToArrow } from '../../src/core/geometry/math';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №164: Магнит подписи слева от вертикали MATH-07', () => {
  it('примагничивает подпись на 8px левее вертикального сегмента', () => {
    const a: Arrow = {
      id: 'a1',
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 300, y: 50 } },
      target: { type: 'border', side: 'bottom', point: { x: 300, y: 500 } },
      role: 'control',
      points: [{ x: 300, y: 50 }, { x: 300, y: 500 }],
      pinned: false,
    };
    const res = snapLabelToArrow({ x: 294, y: 200 }, a, 25);
    expect(res.showLeader).toBe(false);
    expect(res.labelPos.x).toBe(292);
  });
});

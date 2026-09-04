/**
 * ТЕСТ №163: Математика: Примагничивание подписи справа от вертикального сегмента
 * 
 * Класс эквивалентности: MATH-06 (Snap Label Vertical Right)
 * Описание: Проверяет привязку подписи стрелки на 8px правее вертикального сегмента.
 * Предусловия:
 *   - Вертикальная стрелка, курсор на 5px правее.
 * Действия:
 *   1. Вызвать snapLabelToArrow.
 *   2. Проверить labelPos.x.
 * Ожидаемый результат: labelPos.x === seg.x + 8.
 */

import { describe, it, expect } from 'bun:test';
import { snapLabelToArrow } from '../../src/core/geometry/math';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №163: Магнит подписи справа от вертикали MATH-06', () => {
  it('примагничивает подпись на 8px правее вертикального сегмента', () => {
    const a: Arrow = {
      id: 'a1',
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 300, y: 50 } },
      target: { type: 'border', side: 'bottom', point: { x: 300, y: 500 } },
      role: 'control',
      points: [{ x: 300, y: 50 }, { x: 300, y: 500 }],
      pinned: false,
    };
    const res = snapLabelToArrow({ x: 306, y: 200 }, a, 25);
    expect(res.showLeader).toBe(false);
    expect(res.labelPos.x).toBe(308);
  });
});

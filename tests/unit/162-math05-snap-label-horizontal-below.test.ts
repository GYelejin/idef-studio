/**
 * ТЕСТ №162: Математика: Примагничивание подписи ниже горизонтального сегмента
 * 
 * Класс эквивалентности: MATH-05 (Snap Label Horizontal Below)
 * Описание: Проверяет привязку подписи стрелки на 18px ниже горизонтального отрезка.
 * Предусловия:
 *   - Горизонтальная стрелка, курсор подписи на 8px ниже линии.
 * Действия:
 *   1. Вызвать snapLabelToArrow.
 *   2. Проверить labelPos.y.
 * Ожидаемый результат: labelPos.y === seg.y + 18, showLeader === false.
 */

import { describe, it, expect } from 'bun:test';
import { snapLabelToArrow } from '../../src/core/geometry/math';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №162: Магнит подписи под отрезком MATH-05', () => {
  it('примагничивает подпись на 18px ниже горизонтального сегмента', () => {
    const a: Arrow = {
      id: 'a1',
      label: 'Материалы',
      source: { type: 'border', side: 'left', point: { x: 100, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 500, y: 200 } },
      role: 'input',
      points: [{ x: 100, y: 200 }, { x: 500, y: 200 }],
      pinned: false,
    };
    const res = snapLabelToArrow({ x: 300, y: 208 }, a, 25);
    expect(res.showLeader).toBe(false);
    expect(res.labelPos.y).toBe(218);
  });
});

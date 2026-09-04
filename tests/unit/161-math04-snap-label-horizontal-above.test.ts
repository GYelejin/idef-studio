/**
 * ТЕСТ №161: Математика: Примагничивание подписи выше горизонтального сегмента
 * 
 * Класс эквивалентности: MATH-04 (Snap Label Horizontal Above)
 * Описание: Проверяет привязку подписи стрелки на 12px выше горизонтального отрезка без линии-выноски.
 * Предусловия:
 *   - Горизонтальная стрелка, курсор подписи на 10px выше линии.
 * Действия:
 *   1. Вызвать snapLabelToArrow.
 *   2. Проверить showLeader и labelPos.y.
 * Ожидаемый результат: showLeader === false, labelPos.y === seg.y - 12.
 */

import { describe, it, expect } from 'bun:test';
import { snapLabelToArrow } from '../../src/core/geometry/math';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №161: Магнит подписи над отрезком MATH-04', () => {
  it('примагничивает подпись на 12px выше горизонтального сегмента', () => {
    const a: Arrow = {
      id: 'a1',
      label: 'Материалы',
      source: { type: 'border', side: 'left', point: { x: 100, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 500, y: 200 } },
      role: 'input',
      points: [{ x: 100, y: 200 }, { x: 500, y: 200 }],
      pinned: false,
    };
    const res = snapLabelToArrow({ x: 300, y: 192 }, a, 25);
    expect(res.showLeader).toBe(false);
    expect(res.labelPos.y).toBe(188);
  });
});

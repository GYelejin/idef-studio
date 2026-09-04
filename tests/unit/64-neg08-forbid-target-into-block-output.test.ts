/**
 * ТЕСТ №64: Негативный: Запрет входящей стрелки в правую грань блока (Выход)
 * 
 * Класс эквивалентности: NEG-08 (Block Output Target Prohibited)
 * Описание: Проверяет запрет направления стрелки в правую грань блока (Выход — только источник).
 * Предусловия:
 *   - Инициализированы блоки на холсте.
 * Действия:
 *   1. Направить стрелку в правую грань целевого блока (side: 'right').
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: стрелка не может входить в правую сторону блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №64: Запрет входа в Output NEG-08', () => {
  it('запрещает входящую стрелку в правую грань функционального блока', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'right', point: { x: 310, y: 150 } },
      { type: 'block', id: 'b2', side: 'right', point: { x: 500, y: 150 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('правую');
  });
});

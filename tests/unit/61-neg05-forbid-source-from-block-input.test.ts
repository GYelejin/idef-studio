/**
 * ТЕСТ №61: Негативный: Запрет исходящей стрелки из левой грани блока (Вход)
 * 
 * Класс эквивалентности: NEG-05 (Block Input Source Prohibited)
 * Описание: Проверяет запрет создания исходящей стрелки из левой грани функционального блока (Вход — только приёмник).
 * Предусловия:
 *   - Инициализированы 2 блока на холсте.
 * Действия:
 *   1. Задать стрелку с началом на левой грани Блока 1 (side: 'left').
 *   2. Вызвать validateArrowConnection.
 *   3. Проверить результат валидации valid === false.
 * Ожидаемый результат: Связь отклонена: стрелка не может выходить из левой стороны блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №61: Запрет выхода из Input NEG-05', () => {
  it('запрещает стрелку с источником на левой грани блока', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'left', point: { x: 100, y: 150 } },
      { type: 'block', id: 'b2', side: 'left', point: { x: 400, y: 150 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('левой');
  });
});

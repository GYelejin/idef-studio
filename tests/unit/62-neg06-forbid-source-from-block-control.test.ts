/**
 * ТЕСТ №62: Негативный: Запрет исходящей стрелки из верхней грани блока (Управление)
 * 
 * Класс эквивалентности: NEG-06 (Block Control Source Prohibited)
 * Описание: Проверяет запрет создания исходящей стрелки из верхней грани блока (Управление — только приёмник).
 * Предусловия:
 *   - Инициализированы блоки на холсте.
 * Действия:
 *   1. Задать стрелку с началом на верхней грани блока (side: 'top').
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: стрелка не может выходить из верхней стороны блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №62: Запрет выхода из Control NEG-06', () => {
  it('запрещает стрелку с источником на верхней грани блока', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'top', point: { x: 200, y: 100 } },
      { type: 'block', id: 'b2', side: 'left', point: { x: 400, y: 150 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('верхней');
  });
});

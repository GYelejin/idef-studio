/**
 * ТЕСТ №63: Негативный: Запрет исходящей стрелки из нижней грани блока (Механизм)
 * 
 * Класс эквивалентности: NEG-07 (Block Mechanism Source Prohibited)
 * Описание: Проверяет запрет создания исходящей стрелки из нижней грани блока (Механизм — только приёмник).
 * Предусловия:
 *   - Инициализированы блоки на холсте.
 * Действия:
 *   1. Задать стрелку с началом на нижней грани блока (side: 'bottom').
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: стрелка не может выходить из нижней стороны блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №63: Запрет выхода из Mechanism NEG-07', () => {
  it('запрещает стрелку с источником на нижней грани блока', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 200, y: 230 } },
      { type: 'block', id: 'b2', side: 'left', point: { x: 400, y: 150 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('нижней');
  });
});

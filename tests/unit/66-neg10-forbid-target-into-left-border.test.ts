/**
 * ТЕСТ №66: Негативный: Запрет окончания стрелки на левой границе холста
 * 
 * Класс эквивалентности: NEG-10 (Left Border Target Prohibited)
 * Описание: Проверяет стандарт IDEF0: левая граница холста служит только источником внешних входов.
 * Предусловия:
 *   - Попытка направить стрелку в левую границу холста.
 * Действия:
 *   1. Задать цель стрелки на левой границе (type: 'border', side: 'left').
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: левая граница только источник входов.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №66: Запрет выхода на левую границу NEG-10', () => {
  it('запрещает проведение стрелки в левую границу холста', () => {
    const res = validateArrowConnection(
      { type: 'block', id: 'b1', side: 'right', point: { x: 300, y: 200 } },
      { type: 'border', side: 'left', point: { x: 30, y: 200 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('левую границу');
  });
});

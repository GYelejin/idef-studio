/**
 * ТЕСТ №65: Негативный: Запрет начала стрелки с правой границы холста
 * 
 * Класс эквивалентности: NEG-09 (Right Border Source Prohibited)
 * Описание: Проверяет стандарт IDEF0: правая граница холста служит только стоком для выходов системы.
 * Предусловия:
 *   - Попытка начать стрелку от правой границы холста.
 * Действия:
 *   1. Задать начало стрелки на правой границе (type: 'border', side: 'right').
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: правая граница только для выходов.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №65: Запрет начала с правой границы NEG-09', () => {
  it('запрещает проведение стрелки с правой границы холста', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 400, y: 200 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('правой границы');
  });
});

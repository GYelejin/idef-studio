/**
 * ТЕСТ №67: Негативный: Запрет несоответствия семантики границы и грани блока
 * 
 * Класс эквивалентности: NEG-11 (Mismatched Border Face Prohibited)
 * Описание: Проверяет запрет входа стрелки с левой границы (Вход) в верхнюю грань блока (Управление).
 * Предусловия:
 *   - Блок на холсте.
 * Действия:
 *   1. Соединить левую границу с верхней гранью блока.
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: стрелка с левой границы может входить только в левую сторону блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №67: Несоответствие стороны границы NEG-11', () => {
  it('запрещает вход с левой границы в верхнюю грань блока', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 400, y: 200 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('левой границы');
  });
});

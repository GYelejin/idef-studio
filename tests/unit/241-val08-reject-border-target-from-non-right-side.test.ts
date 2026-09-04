/**
 * ТЕСТ №241: Валидация: Запрет выхода на границу не из блока
 * 
 * Класс эквивалентности: VAL-08 (Reject Border Target From Non-Right Side)
 * Описание: Проверяет отклонение вывода на границу холста, если источник не является правой гранью блока.
 * Предусловия:
 *   - Источник: unattached, цель: border top.
 * Действия:
 *   1. Вызвать validateArrowConnection.
 *   2. Проверить результат.
 * Ожидаемый результат: valid === false, требование выхода только из правой стороны блока.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №241: Выход на границу не справа VAL-08', () => {
  it('запрещает вывод на границу из незакрепленного источника', () => {
    const res = validateArrowConnection(
      { type: 'unattached', point: { x: 300, y: 200 } },
      { type: 'border', side: 'top', point: { x: 300, y: 40 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('правой стороны');
  });
});

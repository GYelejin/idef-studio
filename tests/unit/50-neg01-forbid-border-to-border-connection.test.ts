/**
 * ТЕСТ №50: Негативный: Запрет соединения граница-граница
 * 
 * Класс эквивалентности: NEG-01 (Border-to-Border Prohibition)
 * Описание: Проверяет запрет создания сквозных стрелок от границы диаграммы к границе диаграммы без прохождения через блок.
 * Предусловия:
 *   - Попытка создания стрелки от левой границы к правой границе холста.
 * Действия:
 *   1. Вызвать validateArrowConnection для источника border и цели border.
 *   2. Проверить результат валидации.
 * Ожидаемый результат: Валидатор возвращает valid === false с запретом прямого транзита граница-граница.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №50: Запрет граница-граница NEG-01', () => {
  it('запрещает проведение стрелки напрямую от границы к границе', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      [],
      []
    );
    expect(res.valid).toBe(false);
  });
});

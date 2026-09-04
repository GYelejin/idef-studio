/**
 * ТЕСТ №136: Именование: Резервное наименование безымянной стрелки
 * 
 * Класс эквивалентности: NAME-04 (Fallback Display Name Formatting)
 * Описание: Проверяет возврат читаемого плейсхолдера при отсутствии подписи и родителя.
 * Предусловия:
 *   - Стрелка без текста и без узла ветвления.
 * Действия:
 *   1. Вызвать getArrowDisplayName.
 *   2. Проверить возвращенную строку.
 * Ожидаемый результат: Возвращается строка 'Без названия' или 'Поток'.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowDisplayName } from '../../src/core/geometry';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №136: Имя безымянной стрелки NAME-04', () => {
  it('возвращает стандартное резервное имя для неподписанной стрелки', () => {
    const a: Arrow = {
      id: 'a1',
      label: '',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input',
      points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }],
      pinned: false,
    };
    const name = getArrowDisplayName(a, null);
    expect(name).toBe('Без названия');
  });
});

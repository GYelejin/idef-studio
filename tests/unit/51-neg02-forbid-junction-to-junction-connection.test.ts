/**
 * ТЕСТ №51: Негативный: Запрет соединения узел-узел (Junction-to-Junction)
 * 
 * Класс эквивалентности: NEG-02 (Junction-to-Junction Prohibition)
 * Описание: Проверяет запрет прямого соединения узла ветвления/слияния с другим узлом ветвления/слияния.
 * Предусловия:
 *   - Попытка провести стрелку между двумя узлами junction.
 * Действия:
 *   1. Вызвать validateArrowConnection со связкой junction -> junction.
 *   2. Проверить отклонение связи.
 * Ожидаемый результат: Связь узел-узел отклоняется валидатором (valid === false).
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №51: Запрет узел-узел NEG-02', () => {
  it('запрещает непосредственное соединение двух узлов ветвлений/слияний', () => {
    const res = validateArrowConnection(
      { type: 'junction', id: 'j1', point: { x: 300, y: 200 } },
      { type: 'junction', id: 'j2', point: { x: 500, y: 200 } },
      [],
      []
    );
    expect(res.valid).toBe(false);
  });
});

/**
 * ТЕСТ №100: Именование: Формирование автоматического отображаемого имени стрелки
 * 
 * Класс эквивалентности: NAME-02 (Arrow Display Name Formatting)
 * Описание: Проверяет генерацию названия безымянной ветви как 'Ответвление от «<Родитель>»'.
 * Предусловия:
 *   - Безымянная стрелка ответвляется от магистрали 'Нефтепродукт'.
 * Действия:
 *   1. Вызвать getArrowDisplayName(branch, diag).
 *   2. Проверить сгенерированную строку.
 * Ожидаемый результат: Сформировано наименование 'Ответвление от «Нефтепродукт»'.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowDisplayName } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №100: Форматирование имени стрелки NAME-02', () => {
  it('генерирует имя ветви с указанием родительского потока', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [
        {
          id: 'trunk',
          label: 'Нефтепродукт',
          source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
          target: { type: 'block', id: 'b1', side: 'left', point: { x: 500, y: 200 } },
          role: 'input',
          points: [{ x: 30, y: 200 }, { x: 500, y: 200 }],
          pinned: false,
        },
        {
          id: 'branch',
          label: '',
          source: { type: 'junction', id: 'j1', point: { x: 250, y: 200 } },
          target: { type: 'block', id: 'b2', side: 'top', point: { x: 400, y: 300 } },
          role: 'control',
          points: [{ x: 250, y: 200 }, { x: 400, y: 200 }, { x: 400, y: 300 }],
          pinned: false,
        }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 250, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };
    const name = getArrowDisplayName(diag.arrows[1], diag);
    expect(name).toBe('Ответвление от «Нефтепродукт»');
  });
});

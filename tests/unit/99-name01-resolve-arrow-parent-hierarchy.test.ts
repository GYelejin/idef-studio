/**
 * ТЕСТ №99: Именование: Определение родительской стрелки через getArrowParent
 * 
 * Класс эквивалентности: NAME-01 (Arrow Parent Resolution)
 * Описание: Проверяет автоматическое нахождение родительского ствола для дочерней ветви.
 * Предусловия:
 *   - Магистральная стрелка и подключенная к ее узлу ветвь.
 * Действия:
 *   1. Вызвать getArrowParent(branch, diag).
 *   2. Проверить совпадение найденной родительской стрелки.
 * Ожидаемый результат: Родительская стрелка успешно идентифицирована.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №99: Поиск родительской стрелки NAME-01', () => {
  it('находит родительский ствол для стрелки ветвления', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [
        {
          id: 'trunk',
          label: 'Магистраль',
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
    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent).toBeDefined();
    expect(parent?.id).toBe('trunk');
  });
});

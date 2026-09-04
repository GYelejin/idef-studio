/**
 * ТЕСТ №112: Пересечения: Обнаружение коллизии стрелки с телом блока через validateAllIntersections
 * 
 * Класс эквивалентности: VAL-01 (All Intersections Block Collision)
 * Описание: Проверяет детекцию пересечения отрезка стрелки с внутренней областью функционального блока.
 * Предусловия:
 *   - Стрелка пробивает функциональный блок насквозь.
 * Действия:
 *   1. Вызвать validateAllIntersections.
 *   2. Проверить ошибки коллизии.
 * Ожидаемый результат: Обнаружена недопустимая коллизия type: 'block_collision'.
 */

import { describe, it, expect } from 'bun:test';
import { validateAllIntersections } from '../../src/core/intersections';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №112: Коллизия с блоком VAL-01', () => {
  it('выявляет пересечение стрелки с телом блока', () => {
    const block: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrowThrough: Arrow = {
      id: 'a1',
      label: 'Сквозная',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 1570, y: 250 }],
      pinned: false,
    };
    const issues = validateAllIntersections([arrowThrough], [block], []);
    const hasCollision = issues.some(i => i.type === 'block_collision' && !i.isAllowed);
    expect(hasCollision).toBe(true);
  });
});

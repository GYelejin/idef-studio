/**
 * ТЕСТ №113: Пересечения: Валидация чистой корректной диаграммы
 * 
 * Класс эквивалентности: VAL-02 (All Intersections Clean Pass)
 * Описание: Проверяет отсутствие ложных срабатываний в validateAllIntersections для диаграммы без наложений.
 * Предусловия:
 *   - Корректный поток, входящий в грань блока.
 * Действия:
 *   1. Вызвать validateAllIntersections.
 *   2. Проверить массив замечаний.
 * Ожидаемый результат: Массив замечаний пуст (issues.length === 0).
 */

import { describe, it, expect } from 'bun:test';
import { validateAllIntersections } from '../../src/core/intersections';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №113: Чистая диаграмма без коллизий VAL-02', () => {
  it('подтверждает отсутствие нарушений на корректной диаграмме', () => {
    const block: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null };
    const cleanArrow: Arrow = {
      id: 'a1',
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: block.id, side: 'left', point: { x: 300, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 300, y: 250 }],
      pinned: false,
    };
    const issues = validateAllIntersections([cleanArrow], [block], []);
    expect(issues.length).toBe(0);
  });
});

/**
 * ТЕСТ №213: Именование: Поиск родителя по совпадению точки на горизонтальном отрезке
 * 
 * Класс эквивалентности: NAME-06 (Arrow Parent Waypoint on Horizontal)
 * Описание: Проверяет геометрический поиск ствола, когда точка начала ветви лежит на горизонтальной линии.
 * Предусловия:
 *   - Ствол на Y=200, ветвь начинается в (400, 200).
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить результат.
 * Ожидаемый результат: Родительская стрелка успешно обнаружена.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №213: Точка на горизонтальном сегменте NAME-06', () => {
  it('определяет родительскую стрелку по попаданию точки на отрезок', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Магистраль', source: { type: 'border', side: 'left', point: { x: 100, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 800, y: 200 } }, role: 'input', points: [{ x: 100, y: 200 }, { x: 800, y: 200 }], pinned: false },
        { id: 'branch', label: '', source: { type: 'junction', point: { x: 450, y: 200 } }, target: { type: 'border', side: 'bottom', point: { x: 450, y: 865 } }, role: 'mechanism', points: [{ x: 450, y: 200 }, { x: 450, y: 865 }], pinned: false }
      ],
      junctions: [],
    };
    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('trunk');
  });
});

/**
 * ТЕСТ №214: Именование: Поиск родителя по совпадению точки на вертикальном отрезке
 * 
 * Класс эквивалентности: NAME-07 (Arrow Parent Waypoint on Vertical)
 * Описание: Проверяет геометрический поиск ствола, когда начало ветви лежит на вертикальном звене.
 * Предусловия:
 *   - Ствол проходит вертикально по X=350, ветвь отходит вбок.
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить результат.
 * Ожидаемый результат: Ствол определен в качестве родителя.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №214: Точка на вертикальном сегменте NAME-07', () => {
  it('определяет родительскую стрелку по попаданию на вертикальное звено', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Вертикальный поток', source: { type: 'border', side: 'top', point: { x: 350, y: 50 } }, target: { type: 'border', side: 'bottom', point: { x: 350, y: 800 } }, role: 'control', points: [{ x: 350, y: 50 }, { x: 350, y: 800 }], pinned: false },
        { id: 'branch', label: '', source: { type: 'junction', point: { x: 350, y: 400 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } }, role: 'output', points: [{ x: 350, y: 400 }, { x: 1570, y: 400 }], pinned: false }
      ],
      junctions: [],
    };
    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('trunk');
  });
});

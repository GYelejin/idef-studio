/**
 * ТЕСТ №212: Именование: Определение родителя стрелки по прямой ссылке ID
 * 
 * Класс эквивалентности: NAME-05 (Arrow Parent Direct ID Reference)
 * Описание: Проверяет нахождение родительского потока, если эндпоинт явно ссылается на ID стрелки.
 * Предусловия:
 *   - Стрелка ответвления с source.id === 'trunk-id'.
 * Действия:
 *   1. Вызвать getArrowParent.
 *   2. Проверить parent.id.
 * Ожидаемый результат: parent?.id === 'trunk-id'.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowParent } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №212: Прямая ссылка на родителя NAME-05', () => {
  it('находит родительскую стрелку по прямому ID в эндпоинте', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk-id', label: 'Основной', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false },
        { id: 'branch-id', label: '', source: { type: 'arrow_segment', id: 'trunk-id', point: { x: 400, y: 200 } }, target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } }, role: 'mechanism', points: [{ x: 400, y: 200 }, { x: 400, y: 865 }], pinned: false }
      ],
      junctions: [],
    };
    const parent = getArrowParent(diag.arrows[1], diag);
    expect(parent?.id).toBe('trunk-id');
  });
});

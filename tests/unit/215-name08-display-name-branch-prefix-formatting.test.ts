/**
 * ТЕСТ №215: Именование: Форматирование префикса ответвления 'Ответвление от <Родитель>'
 * 
 * Класс эквивалентности: NAME-08 (Branch Prefix Formatting)
 * Описание: Проверяет формирование автоматического читаемого имени безымянного ответвления от подписанного ствола.
 * Предусловия:
 *   - Ствол с именем 'Основное сырье', дочерняя ветвь без имени.
 * Действия:
 *   1. Вызвать getArrowDisplayName.
 *   2. Проверить строку.
 * Ожидаемый результат: Возвращается 'Ответвление от «Основное сырье»'.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowDisplayName } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №215: Префикс ответвления NAME-08', () => {
  it('формирует читаемое имя ответвления от родительского ствола', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Основное сырье', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false },
        { id: 'branch', label: '', source: { type: 'junction', id: 'j1', point: { x: 400, y: 200 } }, target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } }, role: 'mechanism', points: [{ x: 400, y: 200 }, { x: 400, y: 865 }], pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 400, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };
    const name = getArrowDisplayName(diag.arrows[1], diag);
    expect(name).toContain('Основное сырье');
  });
});

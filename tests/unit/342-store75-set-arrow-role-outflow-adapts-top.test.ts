/**
 * ТЕСТ №342: Хранилище: Адаптация исходящей стрелки к верхней границе листа
 * 
 * Класс эквивалентности: STORE-75 (Set Arrow Role Outflow Adapts Top)
 * Описание: Проверяет перенос целевой границы на верхнюю сторону листа (Y=40) при вызове setArrowRole(id, 'control').
 * Предусловия:
 *   - Исходящая стрелка.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'control').
 *   2. Проверить target.side === 'top'.
 * Ожидаемый результат: Целевая граница установлена сверху.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №342: Выходная граница сверху STORE-75', () => {
  it('адаптирует целевую границу к верхней стороне при роли control', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output', points: [{ x: 510, y: 250 }, { x: 1570, y: 250 }], pinned: false,
    })!;

    store.setArrowRole(a.id, 'control');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('top');
  });
});

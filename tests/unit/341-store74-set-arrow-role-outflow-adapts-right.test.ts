/**
 * ТЕСТ №341: Хранилище: Адаптация исходящей стрелки к правой границе листа
 * 
 * Класс эквивалентности: STORE-74 (Set Arrow Role Outflow Adapts Right)
 * Описание: Проверяет перенос целевой границы на правую сторону листа (X=1580) при вызове setArrowRole(id, 'output').
 * Предусловия:
 *   - Исходящая стрелка из блока.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'output').
 *   2. Проверить target.side === 'right'.
 * Ожидаемый результат: Целевая граница установлена на правую сторону.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №341: Выходная граница STORE-74', () => {
  it('адаптирует целевую границу к правой стороне при роли output', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'top', point: { x: 510, y: 40 } },
      role: 'control', points: [{ x: 510, y: 250 }, { x: 510, y: 40 }], pinned: false,
    })!;

    store.setArrowRole(a.id, 'output');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('right');
  });
});

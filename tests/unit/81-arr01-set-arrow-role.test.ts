/**
 * ТЕСТ №81: Стрелки: Смена ICOM-роли стрелки через инспектор
 * 
 * Класс эквивалентности: ARR-01 (Change Arrow Role)
 * Описание: Проверяет изменение роли стрелки вызовом setArrowRole.
 * Предусловия:
 *   - Стрелка создана с ролью 'input'.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'control').
 *   2. Проверить обновленную роль.
 * Ожидаемый результат: Роль стрелки изменена на 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №81: Смена роли стрелки ARR-01', () => {
  it('изменяет семантическую ICOM-роль стрелки', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    store.setArrowRole(a.id, 'control');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.role).toBe('control');
  });
});

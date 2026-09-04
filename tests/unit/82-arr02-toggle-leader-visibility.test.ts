/**
 * ТЕСТ №82: Стрелки: Переключение режима выноски подписи стрелки (toggleLeader)
 * 
 * Класс эквивалентности: ARR-02 (Toggle Leader Line)
 * Описание: Проверяет включение и выключение флага showLeader у стрелки.
 * Предусловия:
 *   - Стрелка имеет выключенный showLeader.
 * Действия:
 *   1. Вызвать toggleLeader.
 *   2. Проверить showLeader === true.
 *   3. Вызвать toggleLeader повторно.
 * Ожидаемый результат: Флаг выноски успешно переключается true <-> false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №82: Переключение выноски ARR-02', () => {
  it('переключает флаг выносной линии подписи стрелки', () => {
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
      showLeader: false,
      pinned: false,
    })!;
    store.toggleLeader(a.id);
    let updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.showLeader).toBe(true);

    store.toggleLeader(a.id);
    updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.showLeader).toBe(false);
  });
});

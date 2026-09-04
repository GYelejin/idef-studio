/**
 * ТЕСТ №339: Хранилище: Адаптация портов к нижней грани при смене роли на Механизм
 * 
 * Класс эквивалентности: STORE-72 (Set Arrow Role Mechanism Adapts Bottom)
 * Описание: Проверяет перенос граничной точки на нижнюю границу (Y=865) и контактного порта на нижнюю сторону блока при вызове setArrowRole(id, 'mechanism').
 * Предусловия:
 *   - Входящая стрелка.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'mechanism').
 *   2. Проверить source.side === 'bottom' и target.side === 'bottom'.
 * Ожидаемый результат: Стрелка адаптирована как Механизм снизу.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №339: Роль Механизм STORE-72', () => {
  it('адаптирует граничную точку и целевой порт к нижней грани блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 250 } },
      role: 'input', points: [{ x: 30, y: 250 }, { x: 300, y: 250 }], pinned: false,
    })!;

    store.setArrowRole(a.id, 'mechanism');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('bottom');
    expect(updated.target.side).toBe('bottom');
  });
});

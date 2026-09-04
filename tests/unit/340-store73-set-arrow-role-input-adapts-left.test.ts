/**
 * ТЕСТ №340: Хранилище: Адаптация портов к левой грани при смене роли на Вход
 * 
 * Класс эквивалентности: STORE-73 (Set Arrow Role Input Adapts Left)
 * Описание: Проверяет адаптацию граничной точки к левой границе (X=30) и контактного порта к левой стороне блока при вызове setArrowRole(id, 'input').
 * Предусловия:
 *   - Стрелка Управления сверху.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'input').
 *   2. Проверить source.side === 'left' и target.side === 'left'.
 * Ожидаемый результат: Стрелка адаптирована как Вход слева.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №340: Роль Вход STORE-73', () => {
  it('адаптирует граничную точку и целевой порт к левой грани блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 200 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 200 }], pinned: false,
    })!;

    store.setArrowRole(a.id, 'input');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('left');
    expect(updated.target.side).toBe('left');
  });
});

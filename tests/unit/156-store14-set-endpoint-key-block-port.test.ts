/**
 * ТЕСТ №156: Хранилище: Переключение конца на грань другого блока (block:id:side)
 * 
 * Класс эквивалентности: STORE-14 (Set Endpoint Key Block Port)
 * Описание: Проверяет перепривязку конца стрелки к порту другого блока через составной ключ.
 * Предусловия:
 *   - Стрелка между блоками b1 и b2, существует третий блок b3.
 * Действия:
 *   1. Вызвать store.setArrowEndpointKey(a.id, 'target', `block:${b3.id}:left`).
 *   2. Проверить arrow.target.id.
 * Ожидаемый результат: arrow.target.id === b3.id, arrow.target.side === 'left'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №156: Привязка к порту блока STORE-14', () => {
  it('переключает цель стрелки на контактную грань другого блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(450, 200, 'A1')!;
    const b3 = store.createBlock(750, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 450, y: 265 } },
      role: 'output',
      points: [{ x: 310, y: 265 }, { x: 450, y: 265 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'target', `block:${b3.id}:left`);
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.id).toBe(b3.id);
  });
});

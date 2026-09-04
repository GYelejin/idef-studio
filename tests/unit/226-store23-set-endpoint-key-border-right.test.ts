/**
 * ТЕСТ №226: Хранилище: Привязка стрелки к правой границе (border:right)
 * 
 * Класс эквивалентности: STORE-23 (Set Endpoint Key Border Right)
 * Описание: Проверяет переключение цели стрелки на правую границу листа.
 * Предусловия:
 *   - Стрелка выходит из правой грани блока.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(a.id, 'target', 'border:right').
 *   2. Проверить target.side.
 * Ожидаемый результат: target.side === 'right', role === 'output'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №226: Привязка к правой границе STORE-23', () => {
  it('переключает цель стрелки на правую границу холста', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'bottom', point: { x: 510, y: 865 } },
      role: 'output',
      points: [{ x: 510, y: 250 }, { x: 510, y: 865 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'target', 'border:right');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('right');
  });
});

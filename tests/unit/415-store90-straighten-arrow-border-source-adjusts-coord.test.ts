/**
 * ТЕСТ №415: Хранилище: Спрямление граничной стрелки выравнивает координату границы
 * 
 * Класс эквивалентности: STORE-90 (Straighten Arrow Border Source Adjusts Coord)
 * Описание: Проверяет адаптацию координаты граничного источника (source.point.y) при спрямлении стрелки через straightenArrow.
 * Предусловия:
 *   - Стрелка с левой границы листа.
 * Действия:
 *   1. Вызвать straightenArrow(a.id).
 *   2. Проверить выравнивание source.point.y по target.point.y.
 * Ожидаемый результат: Координата границы листа выровнена по цели.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №415: Спрямление граничного входа STORE-90', () => {
  it('выравнивает координату граничного источника по цели при спрямлении', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(500, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 350 } },
      role: 'input', points: [{ x: 30, y: 200 }, { x: 200, y: 200 }, { x: 200, y: 350 }, { x: 500, y: 350 }],
      pinned: true,
    })!;

    store.straightenArrow(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.point.y).toBe(updated.target.point.y);
  });
});

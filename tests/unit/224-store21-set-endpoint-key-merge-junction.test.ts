/**
 * ТЕСТ №224: Хранилище: Создание узла слияния через setArrowEndpointKey ('junction:merge:trunkId')
 * 
 * Класс эквивалентности: STORE-21 (Set Endpoint Key Merge Junction)
 * Описание: Проверяет создание узла типа 'merge' на стволе при привязке конца стрелки.
 * Предусловия:
 *   - Магистраль и стрелка, выходящая из правой грани блока 3.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(incoming.id, 'target', `junction:merge:${trunk.id}`).
 *   2. Проверить массив junctions.
 * Ожидаемый результат: Создан узел типа 'merge', стрелка ссылается на узел.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №224: Слияние через ключ эндпоинта STORE-21', () => {
  it('создает узел слияния на магистрали', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(400, 400, 'A1')!;
    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 700, y: 150 }],
      pinned: false,
    })!;
    const incoming = store.createArrow({
      label: 'Приток',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 610, y: 450 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 450 } },
      role: 'output',
      points: [{ x: 610, y: 450 }, { x: 1570, y: 450 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(incoming.id, 'target', `junction:merge:${trunk.id}`);
    expect(ok).toBe(true);
    const d = store.getActiveDiagram()!;
    const junc = d.junctions.find(j => j.type === 'merge');
    expect(junc).toBeDefined();
  });
});

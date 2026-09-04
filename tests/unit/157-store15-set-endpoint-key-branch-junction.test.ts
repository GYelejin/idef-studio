/**
 * ТЕСТ №157: Хранилище: Создание ветвления через setArrowEndpointKey ('junction:branch:trunkId')
 * 
 * Класс эквивалентности: STORE-15 (Set Endpoint Key Branch Junction)
 * Описание: Проверяет автоматическое создание узла ветвления на стволе при привязке источника дочерней стрелки.
 * Предусловия:
 *   - Магистральная стрелка и изолированная стрелка.
 * Действия:
 *   1. Вызвать setArrowEndpointKey('source', `junction:branch:${trunk.id}`).
 *   2. Проверить массив diag.junctions.
 * Ожидаемый результат: Создан узел типа 'branch', дочерняя стрелка ссылается на junction.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №157: Ветвление через ключ эндпоинта STORE-15', () => {
  it('создает узел ветвления на магистрали', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(700, 200, 'A1')!;
    const b3 = store.createBlock(400, 500, 'A1')!;
    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 265 } },
      role: 'output',
      points: [{ x: 310, y: 265 }, { x: 700, y: 265 }],
      pinned: false,
    })!;
    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 500, y: 500 } },
      role: 'control',
      points: [{ x: 310, y: 265 }, { x: 500, y: 500 }],
      pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(branch.id, 'source', `junction:branch:${trunk.id}`);
    expect(ok).toBe(true);
    const d = store.getActiveDiagram()!;
    expect(d.junctions.length).toBeGreaterThan(0);
    const junc = d.junctions.find(j => j.parentArrowId === trunk.id);
    expect(junc).toBeDefined();
    expect(junc?.type).toBe('branch');
  });
});

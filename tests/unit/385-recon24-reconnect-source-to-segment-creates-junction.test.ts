/**
 * ТЕСТ №385: Перепривязка стрелки: Создание узла ветвления при перепривязке источника к сегменту
 * 
 * Класс эквивалентности: RECON-24 (Reconnect Source To Segment Creates Junction)
 * Описание: Проверяет генерацию нового узла типа 'branch' в диаграмме при перепривязке источника к сегменту другой стрелки.
 * Предусловия:
 *   - Стрелка ствола и независимая стрелка.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с newEndpoint типа 'arrow_segment'.
 *   2. Проверить появление нового узла ветвления.
 * Ожидаемый результат: Создан узел типа 'branch', стрелка подключена к узлу.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №385: Ветвление от сегмента при перепривязке RECON-24', () => {
  it('создает узел ветвления при привязке источника к сегменту', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const branch = store.createArrow({
      label: 'Ветвь',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'block', id: b3.id, side: 'top', point: { x: 800, y: 400 } },
      role: 'control', points: [{ x: 500, y: 40 }, { x: 800, y: 400 }], pinned: false,
    })!;

    const snapTarget = {
      type: 'arrow_segment' as const,
      id: trunk.id,
      point: { x: 500, y: 150 },
      role: 'output' as const,
    };

    ArrowEndpointOps.reconnectArrowEndpoint(store.state, branch.id, 'source', snapTarget);
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.type === 'branch')).toBe(true);
  });
});

/**
 * ТЕСТ №386: Перепривязка стрелки: Пересчет выносной линии при перепривязке стрелки
 * 
 * Класс эквивалентности: RECON-25 (Reconnect Arrow With Leader Updates Points)
 * Описание: Проверяет автоматический пересчет массива точек выноски leaderPoints при перепривязке стрелки с активной выноской текста.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для целевого блока.
 *   2. Проверить наличие и валидность leaderPoints.
 * Ожидаемый результат: Точки выносной линии пересчитаны.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №386: Выноска при перепривязке RECON-25', () => {
  it('пересчитывает выносную линию текста при перепривязке', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Поток с выноской',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: false,
      showLeader: true, labelPos: { x: 500, y: 100 },
    })!;

    ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', {
      type: 'block', id: b2.id, side: 'top', point: { x: 800, y: 100 },
    });

    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

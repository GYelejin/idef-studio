/**
 * ТЕСТ №111: Переподключение: Удаление узла при отключении единственной ветви
 * 
 * Класс эквивалентности: RECONN-04 (Orphan Junction Clean on Disconnect)
 * Описание: Проверяет автоматическую очистку узла junction, если от него отключили единственную дочернюю стрелку.
 * Предусловия:
 *   - Узел ветвления с одной дочерней стрелкой.
 * Действия:
 *   1. Отключить стрелку от узла, переподключив к блоку.
 *   2. Проверить список узлов.
 * Ожидаемый результат: Осиротевший узел автоматически удален из диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №111: Очистка узла при отключении RECONN-04', () => {
  it('удаляет узел если ветвь переподключена в другое место', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 300, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 165 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 165 } },
      role: 'output',
      points: [{ x: 310, y: 165 }, { x: 1570, y: 165 }],
      pinned: false,
    })!;
    const junc = store.createJunction('branch', { x: 400, y: 165 }, trunk.id);
    const branch = store.createArrow({
      label: 'Branch',
      source: { type: 'junction', id: junc.id, point: junc.point },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [{ x: 400, y: 165 }, { x: 600, y: 300 }],
      pinned: false,
    })!;
    expect(diag.junctions.length).toBe(1);
    store.reconnectArrowEndpoint(branch.id, 'source', { type: 'border', side: 'top', point: { x: 500, y: 40 } }, { x: 500, y: 40 });
    expect(diag.junctions.length).toBe(0);
  });
});

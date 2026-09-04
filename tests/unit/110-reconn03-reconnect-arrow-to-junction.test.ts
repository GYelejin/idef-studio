/**
 * ТЕСТ №110: Переподключение: Подключение начала стрелки к узлу ветвления
 * 
 * Класс эквивалентности: RECONN-03 (Reconnect Arrow to Junction Source)
 * Описание: Проверяет превращение стрелки в дочернюю ветвь путем переподключения начала к узлу junction.
 * Предусловия:
 *   - Магистраль с узлом ветвления и отдельная стрелка.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с целью junction.
 *   2. Проверить источник стрелки.
 * Ожидаемый результат: Стрелка успешно переподключена к узлу ветвления.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №110: Переподключение к узлу RECONN-03', () => {
  it('подключает эндпоинт к узлу ветвления', () => {
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
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b2.id, side: 'top', point: { x: 600, y: 300 } },
      role: 'control',
      points: [{ x: 400, y: 40 }, { x: 600, y: 300 }],
      pinned: false,
    })!;
    store.reconnectArrowEndpoint(branch.id, 'source', { type: 'junction', id: junc.id, point: junc.point }, junc.point);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === branch.id)!;
    expect(updated.source.type).toBe('junction');
    expect(updated.source.id).toBe(junc.id);
  });
});

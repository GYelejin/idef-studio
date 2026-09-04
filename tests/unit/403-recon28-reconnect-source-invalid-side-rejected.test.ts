/**
 * ТЕСТ №403: Перепривязка стрелки: Запрет привязки источника стрелки к невалидной грани
 * 
 * Класс эквивалентности: RECON-28 (Reconnect Source Invalid Side Rejected)
 * Описание: Проверяет отклонение перепривязки источника стрелки к левой грани блока (источник в IDEF0 может быть только с правой грани).
 * Предусловия:
 *   - Стрелка между блоками.
 * Действия:
 *   1. Попытаться перепривязать источник к side: 'left'.
 *   2. Проверить возврат false.
 * Ожидаемый результат: Операция отклонена (false).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №403: Запрет источника на левой грани RECON-28', () => {
  it('отклоняет перепривязку источника стрелки к левой грани блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 150 } },
      role: 'input', points: [{ x: 310, y: 150 }, { x: 500, y: 150 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', {
      type: 'block', id: b1.id, side: 'left', point: { x: 100, y: 150 },
    });
    expect(ok).toBe(false);
  });
});

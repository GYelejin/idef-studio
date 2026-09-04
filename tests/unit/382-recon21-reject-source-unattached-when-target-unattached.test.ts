/**
 * ТЕСТ №382: Перепривязка стрелки: Запрет отвязывания источника при непривязанной цели
 * 
 * Класс эквивалентности: RECON-21 (Reject Source Unattached When Target Unattached)
 * Описание: Проверяет отклонение отвязывания источника стрелки, если её цель уже является непривязанной.
 * Предусловия:
 *   - Стрелка с target.type === 'unattached'.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для источника в свободное поле холста.
 *   2. Проверить возврат false.
 * Ожидаемый результат: Операция отклонена (false).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №382: Защита от двойного отвязывания источника RECON-21', () => {
  it('отклоняет отвязывание источника если цель уже не привязана', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'unattached', point: { x: 600, y: 250 } },
      role: 'output', points: [{ x: 400, y: 250 }, { x: 600, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', null, { x: 100, y: 500 });
    expect(ok).toBe(false);
  });
});

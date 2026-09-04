/**
 * ТЕСТ №381: Перепривязка стрелки: Запрет отвязывания цели при непривязанном источнике
 * 
 * Класс эквивалентности: RECON-20 (Reject Target Unattached When Source Unattached)
 * Описание: Проверяет отклонение отвязывания цели стрелки в пустоту, если её источник уже является непривязанным (unattached), предотвращая появление стрелок, полностью висящих в воздухе.
 * Предусловия:
 *   - Стрелка с source.type === 'unattached'.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для цели в свободное поле холста.
 *   2. Проверить возврат false и предупреждение.
 * Ожидаемый результат: Операция отклонена (false), оба конца не могут быть одновременно отвязаны.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №381: Защита от двойного отвязывания цели RECON-20', () => {
  it('отклоняет отвязывание цели если источник уже не привязан', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'unattached', point: { x: 100, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input', points: [{ x: 100, y: 250 }, { x: 400, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 500, y: 500 });
    expect(ok).toBe(false);
  });
});

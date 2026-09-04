/**
 * ТЕСТ №262: Хранилище: Автоматическая смена стороны границы при перепривязке целевого порта
 * 
 * Класс эквивалентности: STORE-24 (Reconnect Target Adapts Source Border)
 * Описание: Проверяет переключение источника граничной стрелки на 'top'/'control' при переподключении цели к верхней грани блока.
 * Предусловия:
 *   - Стрелка от левой границы холста.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint с target на block top.
 *   2. Проверить arrow.source.side и role.
 * Ожидаемый результат: source.side === 'top', role === 'control'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №262: Адаптация границы при перепривязке цели STORE-24', () => {
  it('адаптирует исходную границу к верхней грани блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input',
      points: [{ x: 30, y: 250 }, { x: 400, y: 250 }],
      pinned: false,
    })!;
    const ok = store.reconnectArrowEndpoint(a.id, 'target', {
      type: 'block', id: b.id, side: 'top', point: { x: 500, y: 200 }
    });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.side).toBe('top');
    expect(updated.role).toBe('control');
  });
});

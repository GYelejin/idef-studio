/**
 * ТЕСТ №153: Хранилище: Запрет одновременного открепления обоих концов стрелки
 * 
 * Класс эквивалентности: STORE-11 (Forbid Both Unattached Endpoints via Key)
 * Описание: Проверяет отклонение операции открепления, если противоположный конец уже не привязан.
 * Предусловия:
 *   - Стрелка с одним уже неподключенным концом.
 * Действия:
 *   1. Попытаться вызвать setArrowEndpointKey('unattached') на втором конце.
 *   2. Проверить возвращенное значение.
 * Ожидаемый результат: Операция отклонена (возвращает false).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №153: Запрет открепления обоих концов STORE-11', () => {
  it('отклоняет открепление второго конца стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 310, y: 265 }, { x: 600, y: 265 }],
      pinned: false,
    })!;
    store.setArrowEndpointKey(a.id, 'source', 'unattached');
    const ok = store.setArrowEndpointKey(a.id, 'target', 'unattached');
    expect(ok).toBe(false);
  });
});

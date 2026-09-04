/**
 * ТЕСТ №109: Переподключение: Переключение начала стрелки на левую границу холста
 * 
 * Класс эквивалентности: RECONN-02 (Reconnect Arrow to Border Source)
 * Описание: Проверяет смену источника стрелки на внешнюю левую границу.
 * Предусловия:
 *   - Стрелка соединяет блок 1 и блок 2.
 * Действия:
 *   1. Переподключить начало стрелки к левой границе.
 *   2. Проверить источник.
 * Ожидаемый результат: Источник стрелки успешно переключен на левую границу.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №109: Переподключение к источнику RECONN-02', () => {
  it('переподключает начало стрелки на левую границу холста', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(300, 200, 'A1')!;
    const b2 = store.createBlock(700, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 510, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 265 } },
      role: 'output',
      points: [{ x: 510, y: 265 }, { x: 700, y: 265 }],
      pinned: false,
    })!;
    store.reconnectArrowEndpoint(a.id, 'source', { type: 'border', side: 'left', point: { x: 30, y: 265 } }, { x: 30, y: 265 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('border');
    expect(updated.source.side).toBe('left');
  });
});

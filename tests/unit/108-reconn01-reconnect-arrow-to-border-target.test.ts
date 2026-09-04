/**
 * ТЕСТ №108: Переподключение: Переключение конца стрелки на правую границу холста
 * 
 * Класс эквивалентности: RECONN-01 (Reconnect Arrow to Border Target)
 * Описание: Проверяет операцию reconnectArrowEndpoint со сменой целевого приемника на правую границу.
 * Предусловия:
 *   - Стрелка между двумя блоками.
 * Действия:
 *   1. Переподключить конец стрелки на правую границу холста.
 *   2. Проверить целевой эндпоинт.
 * Ожидаемый результат: Конец стрелки успешно подключен к правой границе (side: 'right', role: 'output').
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №108: Переподключение к границе RECONN-01', () => {
  it('переподключает конец стрелки на правую границу холста', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(200, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 410, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 410, y: 265 }, { x: 600, y: 265 }],
      pinned: false,
    })!;
    store.reconnectArrowEndpoint(a.id, 'target', { type: 'border', side: 'right', point: { x: 1570, y: 265 } }, { x: 1570, y: 265 });
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.type).toBe('border');
    expect(updated.target.side).toBe('right');
  });
});

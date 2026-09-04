/**
 * ТЕСТ №20: Мутация M2: Переподключение исходного конца стрелки
 * 
 * Класс эквивалентности: M2 (Dynamic Source Reconnection)
 * Описание: Проверяет динамическое переподключение исходного конца стрелки с границы на функциональный блок.
 * Предусловия:
 *   - Стрелка соединяет левую границу холста с Блоком 2.
 * Действия:
 *   1. Переподключить источник стрелки с границы на правый выход Блока 1.
 *   2. Проверить тип источника source.type === 'block'.
 * Ожидаемый результат: Источник стрелки успешно изменен на Блок 1.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №20: Переподключение источника M2', () => {
  it('переподключает исходный конец стрелки с границы на блок', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(400, 100, 'A1')!;
    const a = store.createArrow({
      label: 'M2-Flow',
      source: { type: 'border', side: 'left', point: { x: 30, y: 165 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 400, y: 165 } },
      role: 'input',
      points: [{ x: 30, y: 165 }, { x: 400, y: 165 }],
      pinned: false,
    })!;
    const ok = store.reconnectArrowEndpoint(
      a.id,
      'source',
      { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 165 } },
      { x: 310, y: 165 }
    );
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('block');
    expect(updated.source.id).toBe(b1.id);
  });
});

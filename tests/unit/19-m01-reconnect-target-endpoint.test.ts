/**
 * ТЕСТ №19: Мутация M1: Переподключение целевого конца стрелки
 * 
 * Класс эквивалентности: M1 (Dynamic Target Reconnection)
 * Описание: Проверяет динамическое переподключение целевого конца стрелки от одного блока к другому.
 * Предусловия:
 *   - Диаграмма содержит Блок 1, Блок 2, Блок 3 и стрелку от Блока 1 к Блоку 2.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для изменения цели стрелки на Блок 3.
 *   2. Проверить обновление target.id.
 * Ожидаемый результат: Цель стрелки обновлена на Блок 3.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №19: Переподключение цели M1', () => {
  it('динамически переподключает целевой конец стрелки к новому блоку', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(400, 100, 'A1')!;
    const b3 = store.createBlock(400, 300, 'A1')!;
    const a = store.createArrow({
      label: 'M1-Flow',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 165 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 400, y: 165 } },
      role: 'input',
      points: [{ x: 310, y: 165 }, { x: 400, y: 165 }],
      pinned: false,
    })!;
    const ok = store.reconnectArrowEndpoint(
      a.id,
      'target',
      { type: 'block', id: b3.id, side: 'left', point: { x: 400, y: 365 } },
      { x: 400, y: 365 }
    );
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.id).toBe(b3.id);
  });
});

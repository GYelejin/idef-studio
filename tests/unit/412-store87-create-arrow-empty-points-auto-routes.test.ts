/**
 * ТЕСТ №412: Хранилище: Автотрассировка при создании стрелки с пустым массивом points
 * 
 * Класс эквивалентности: STORE-87 (Create Arrow Empty Points Auto Routes)
 * Описание: Проверяет автоматическое построение маршрута через buildOrthogonalRoute при вызове createArrow с points: [].
 * Предусловия:
 *   - Блоки источника и цели.
 * Действия:
 *   1. Вызвать store.createArrow с points: [].
 *   2. Проверить points.length >= 2.
 * Ожидаемый результат: Маршрут автоматически проложен роутером.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №412: Автотрассировка при создании STORE-87', () => {
  it('автоматически прокладывает маршрут если points передан пустым', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 150 } },
      role: 'output', points: [], pinned: false,
    })!;

    expect(a.points.length).toBeGreaterThanOrEqual(2);
  });
});

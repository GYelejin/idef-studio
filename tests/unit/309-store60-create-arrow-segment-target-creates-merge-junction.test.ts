/**
 * ТЕСТ №309: Хранилище: Автоматическое создание узла слияния при клике в сегмент стрелки
 * 
 * Класс эквивалентности: STORE-60 (Create Arrow Segment Target Creates Junction)
 * Описание: Проверяет создание узла типа 'merge' при создании стрелки с target.type === 'arrow_segment'.
 * Предусловия:
 *   - Ствол стрелки.
 * Действия:
 *   1. Создать стрелку с target.type: 'arrow_segment'.
 *   2. Проверить появление узла слияния.
 * Ожидаемый результат: Создан узел слияния, стрелка зарегистрирована как входящая.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №309: Слияние в сегмент стрелки STORE-60', () => {
  it('создает узел слияния при завершении стрелки в сегменте', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(100, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const merge = store.createArrow({
      label: 'Слияние',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 450 } },
      target: { type: 'arrow_segment', id: trunk.id, point: { x: 500, y: 150 } } as any,
      role: 'output', points: [{ x: 310, y: 450 }, { x: 500, y: 150 }], pinned: false,
    })!;

    expect(merge).toBeDefined();
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.type === 'merge')).toBe(true);
  });
});

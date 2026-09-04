/**
 * ТЕСТ №305: Хранилище: Спрямление стрелки при соосных горизонтальных портах
 * 
 * Класс эквивалентности: STORE-56 (Straighten Arrow Both Horizontal)
 * Описание: Проверяет спрямление стрелки между правой гранью и левой гранью блоков в строго горизонтальный отрезок.
 * Предусловия:
 *   - Стрелка из block1 right в block2 left.
 * Действия:
 *   1. Вызвать store.straightenArrow(a.id).
 *   2. Проверить соосность Y точек.
 * Ожидаемый результат: Стрелка выровнена в прямую горизонтальную линию.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №305: Спрямление горизонталей STORE-56', () => {
  it('выравнивает горизонтальную стрелку между блоками', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 270 } },
      role: 'output', points: [{ x: 310, y: 250 }, { x: 400, y: 250 }, { x: 400, y: 270 }, { x: 500, y: 270 }],
      pinned: true,
    })!;

    store.straightenArrow(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].y).toBe(updated.points[updated.points.length - 1].y);
  });
});

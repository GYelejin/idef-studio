/**
 * ТЕСТ №306: Хранилище: Спрямление стрелки при вертикальной связи
 * 
 * Класс эквивалентности: STORE-57 (Straighten Arrow Both Vertical)
 * Описание: Проверяет спрямление стрелки между верхней границей и верхней гранью блока по вертикали.
 * Предусловия:
 *   - Стрелка из border top в block top.
 * Действия:
 *   1. Вызвать store.straightenArrow(a.id).
 *   2. Проверить соосность X точек.
 * Ожидаемый результат: Стрелка выровнена в строго вертикальную линию.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №306: Спрямление вертикалей STORE-57', () => {
  it('выравнивает вертикальную стрелку по оси X', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 450, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 200 } },
      role: 'control', points: [{ x: 450, y: 40 }, { x: 450, y: 120 }, { x: 500, y: 120 }, { x: 500, y: 200 }],
      pinned: true,
    })!;

    store.straightenArrow(a.id);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].x).toBe(updated.points[updated.points.length - 1].x);
  });
});

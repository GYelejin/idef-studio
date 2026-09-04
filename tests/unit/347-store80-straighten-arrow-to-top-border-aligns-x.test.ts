/**
 * ТЕСТ №347: Хранилище: Спрямление стрелки к верхней границе холста
 * 
 * Класс эквивалентности: STORE-80 (Straighten Arrow Top Border Aligns X)
 * Описание: Проверяет выравнивание координаты X границы холста при вызове straightenArrow для стрелки между узлом и верхней границей.
 * Предусловия:
 *   - Стрелка с вертикальными эндпоинтами.
 * Действия:
 *   1. Вызвать store.straightenArrow(a.id).
 *   2. Проверить соосность X.
 * Ожидаемый результат: Координата X границы выровнена с источником.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №347: Спрямление к верхней границе STORE-80', () => {
  it('выравнивает X верхней границы по источнику стрелки', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    const a: Arrow = {
      id: 'vert-arrow',
      label: 'Выход',
      source: { type: 'junction', id: 'j1', point: { x: 400, y: 200 } },
      target: { type: 'border', side: 'top', point: { x: 450, y: 40 } },
      role: 'control', points: [{ x: 400, y: 200 }, { x: 450, y: 40 }], pinned: true,
    };
    diag.arrows.push(a);

    store.straightenArrow(a.id);
    const updated = diag.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.x).toBe(updated.source.point.x);
  });
});

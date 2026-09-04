/**
 * ТЕСТ №457: Хранилище: Выравнивание X при _legacySetArrowPathMode со стрелкой сверху
 * 
 * Класс эквивалентности: STORE-99 (Legacy Set Arrow Path Mode Source Top Aligns X)
 * Описание: Проверяет выравнивание source.point.x по target.point.x при переключении стрелки с верхней границы в 'auto' через _legacySetArrowPathMode.
 * Предусловия:
 *   - Стрелка Управления с верхней границы листа.
 * Действия:
 *   1. Вызвать store._legacySetArrowPathMode(a.id, 'auto').
 *   2. Проверить source.point.x === target.point.x.
 * Ожидаемый результат: Граничный порт X выровнен по блоку назначения.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №457: Legacy auto сверху STORE-99', () => {
  it('выравнивает X верхней границы в _legacySetArrowPathMode', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 200, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 500, y: 300 } },
      role: 'control', points: [{ x: 200, y: 40 }, { x: 200, y: 150 }, { x: 500, y: 150 }, { x: 500, y: 300 }],
      pinned: true,
    })!;

    store._legacySetArrowPathMode(a.id, 'auto');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.point.x).toBe(updated.target.point.x);
  });
});

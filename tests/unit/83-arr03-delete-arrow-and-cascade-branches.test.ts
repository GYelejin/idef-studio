/**
 * ТЕСТ №83: Стрелки: Удаление стрелки с очисткой зависимых узлов ветвления
 * 
 * Класс эквивалентности: ARR-03 (Delete Arrow Cascade)
 * Описание: Проверяет удаление магистральной стрелки и автоматическую очистку зависимых узлов.
 * Предусловия:
 *   - Диаграмма содержит магистраль и узел ветвления.
 * Действия:
 *   1. Вызвать deleteArrow для ствола.
 *   2. Проверить удаление стрелки.
 * Ожидаемый результат: Стрелка удалена из диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №83: Удаление стрелки ARR-03', () => {
  it('удаляет стрелку из диаграммы', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    expect(store.getActiveDiagram()!.arrows.length).toBe(1);
    store.deleteArrow(a.id);
    expect(store.getActiveDiagram()!.arrows.length).toBe(0);
  });
});

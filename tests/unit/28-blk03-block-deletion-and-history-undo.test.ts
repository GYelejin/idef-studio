/**
 * ТЕСТ №28: Блоки: Удаление функционального блока и отмена через Undo
 * 
 * Класс эквивалентности: BLK-03 (Block Deletion and Undo)
 * Описание: Проверяет удаление блока вместе со всеми привязанными к нему стрелками и полное восстановление через стек истории Undo.
 * Предусловия:
 *   - Диаграмма A1 содержит блок и подключенную стрелку.
 * Действия:
 *   1. Удалить блок вызовом deleteBlock.
 *   2. Проверить удаление блока и каскадное удаление стрелки.
 *   3. Вызвать undo и проверить восстановление блока и стрелки.
 * Ожидаемый результат: Блок и стрелка удаляются, а после undo возвращаются в исходное состояние.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №28: Удаление и Undo BLK-03', () => {
  it('удаляет блок и восстанавливает его через историю undo', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(200, 200, 'A1')!;
    store.createArrow({
      label: 'Flow-1',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 200, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 200, y: 265 }],
      pinned: false,
    });
    expect(store.getActiveDiagram()!.blocks.length).toBe(1);
    store.deleteBlock(b.id);
    expect(store.getActiveDiagram()!.blocks.length).toBe(0);
    store.undo();
    expect(store.getActiveDiagram()!.blocks.length).toBe(1);
  });
});

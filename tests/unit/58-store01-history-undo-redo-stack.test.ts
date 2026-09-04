/**
 * ТЕСТ №58: Хранилище: Управление стеком истории Undo / Redo
 * 
 * Класс эквивалентности: STORE-01 (History Undo/Redo Stack)
 * Описание: Проверяет многократную отмену и повторение действий в стеке истории EditorStore.
 * Предусловия:
 *   - Диаграмма A1 активна.
 * Действия:
 *   1. Создать Блок 1.
 *   2. Создать Блок 2.
 *   3. Выполнить undo дважды и redo один раз.
 * Ожидаемый результат: Количество блоков последовательно меняется 2 -> 1 -> 0 -> 1.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №58: Стек Undo/Redo STORE-01', () => {
  it('корректно управляет многократным undo и redo', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    store.createBlock(100, 100, 'A1');
    store.createBlock(400, 100, 'A1');
    expect(store.getActiveDiagram()!.blocks.length).toBe(2);
    store.undo();
    expect(store.getActiveDiagram()!.blocks.length).toBe(1);
    store.undo();
    expect(store.getActiveDiagram()!.blocks.length).toBe(0);
    store.redo();
    expect(store.getActiveDiagram()!.blocks.length).toBe(1);
  });
});

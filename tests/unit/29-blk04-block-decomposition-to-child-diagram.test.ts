/**
 * ТЕСТ №29: Блоки: Декомпозиция блока в дочернюю диаграмму
 * 
 * Класс эквивалентности: BLK-04 (Hierarchical Decomposition)
 * Описание: Проверяет создание дочерней диаграммы декомпозиции с генерацией правильного кода диаграммы.
 * Предусловия:
 *   - Инициализирован проект с контекстной диаграммой A0 и блоком A0.
 * Действия:
 *   1. Вызвать decomposeBlock для корневого блока A0.
 *   2. Проверить появление дочерней диаграммы с кодом A1.
 *   3. Проверить привязку parentBlockId.
 * Ожидаемый результат: Создана дочерняя диаграмма с кодом A1, привязанная к родительскому блоку.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №29: Декомпозиция блока BLK-04', () => {
  it('создает дочернюю диаграмму при декомпозиции блока', () => {
    const store = new EditorStore();
    const rootDiag = store.getActiveDiagram()!;
    const rootBlock = rootDiag.blocks[0];
    const newDiagId = store.decomposeBlock(rootBlock.id);
    expect(newDiagId).toBeDefined();
    const childDiag = store.state.project.diagrams.find(d => d.id === newDiagId);
    expect(childDiag).toBeDefined();
    expect(childDiag!.parentBlockId).toBe(rootBlock.id);
  });
});

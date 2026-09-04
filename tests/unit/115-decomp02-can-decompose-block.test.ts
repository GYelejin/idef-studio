/**
 * ТЕСТ №115: Декомпозиция: Проверка статуса декомпозиции блока
 * 
 * Класс эквивалентности: DECOMP-02 (Can Decompose Block Check)
 * Описание: Проверяет фиксацию decompDiagramId у блока после выполнения декомпозиции.
 * Предусловия:
 *   - Блок не имеет декомпозиции (decompDiagramId === null).
 * Действия:
 *   1. Вызвать decomposeBlock.
 *   2. Проверить decompDiagramId.
 * Ожидаемый результат: Блок содержит валидный идентификатор дочерней диаграммы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №115: Фиксация декомпозиции у блока DECOMP-02', () => {
  it('записывает ID дочерней диаграммы в блок при декомпозиции', () => {
    const store = new EditorStore();
    const rootDiag = store.getActiveDiagram()!;
    const block = rootDiag.blocks[0];
    expect(block.decompDiagramId).toBeNull();
    const childId = store.decomposeBlock(block.id);
    expect(block.decompDiagramId).toBe(childId);
  });
});

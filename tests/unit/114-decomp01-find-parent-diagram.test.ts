/**
 * ТЕСТ №114: Декомпозиция: Определение родительской диаграммы по parentBlockId
 * 
 * Класс эквивалентности: DECOMP-01 (Find Parent Diagram)
 * Описание: Проверяет поиск диаграммы верхнего уровня по родительскому блоку.
 * Предусловия:
 *   - Создана декомпозиция блока A0.
 * Действия:
 *   1. Проверить свойство parentBlockId дочерней диаграммы.
 *   2. Найти диаграмму-родитель в проекте.
 * Ожидаемый результат: Родительская диаграмма A0 успешно найдена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №114: Поиск родительской диаграммы DECOMP-01', () => {
  it('определяет диаграмму-родитель по идентификатору декомпозированного блока', () => {
    const store = new EditorStore();
    const proj = store.state.project;
    const rootDiag = proj.diagrams.find(d => d.code === 'A0')!;
    const rootBlock = rootDiag.blocks[0];
    const childId = store.decomposeBlock(rootBlock.id);
    const childDiag = proj.diagrams.find(d => d.id === childId)!;
    expect(childDiag.parentBlockId).toBe(rootBlock.id);
    const parent = proj.diagrams.find(d => d.blocks.some(b => b.id === childDiag.parentBlockId));
    expect(parent?.id).toBe(rootDiag.id);
  });
});

/**
 * ТЕСТ №296: Хранилище: Повторная декомпозиция переключает на существующую дочернюю схему
 * 
 * Класс эквивалентности: STORE-48 (Decompose Already Decomposed Block)
 * Описание: Проверяет, что повторный вызов decomposeBlock для уже декомпозированного блока не дублирует схемы, а переключает активную диаграмму.
 * Предусловия:
 *   - Корневой блок диаграммы A0.
 * Действия:
 *   1. Вызвать store.decomposeBlock(rootBlock.id).
 *   2. Вернуться на A0 через switchDiagram('diag-a0').
 *   3. Вызвать store.decomposeBlock(rootBlock.id) повторно.
 *   4. Сравнить возвращенные идентификаторы.
 * Ожидаемый результат: Возвращен один и тот же ID, произошел возврат на дочернюю диаграмму.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №296: Повторная декомпозиция блока STORE-48', () => {
  it('переключает на существующую диаграмму при повторном вызове', () => {
    const store = new EditorStore();
    const rootBlock = store.getActiveDiagram()!.blocks[0];
    const id1 = store.decomposeBlock(rootBlock.id);
    store.switchDiagram('diag-a0');
    const id2 = store.decomposeBlock(rootBlock.id);
    expect(id1).toBe(id2);
    expect(store.state.activeDiagramId).toBe(id1);
  });
});

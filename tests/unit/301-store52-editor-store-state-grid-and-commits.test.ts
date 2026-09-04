/**
 * ТЕСТ №301: Хранилище: Методы getState, toggleGrid, commitBlockMove и commitBlockResize
 * 
 * Класс эквивалентности: STORE-52 (EditorStore State Grid and Commits)
 * Описание: Проверяет получение состояния через getState, переключение сетки toggleGrid и сохранение истории при фиксации перемещения и изменения размера блока.
 * Предусловия:
 *   - Экземпляр EditorStore.
 * Действия:
 *   1. Вызвать getState() и toggleGrid().
 *   2. Вызвать commitBlockMove и commitBlockResize.
 * Ожидаемый результат: Сетка переключена, история сохранена.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №301: Состояние, сетка и фиксации STORE-52', () => {
  it('предоставляет состояние, переключает сетку и фиксирует историю', () => {
    const store = new EditorStore();
    const st = store.getState();
    expect(st).toBeDefined();

    const initialGrid = st.gridVisible;
    store.toggleGrid();
    expect(store.getState().gridVisible).toBe(!initialGrid);

    const histLenBefore = store.state.history.length;
    store.commitBlockMove('b1');
    expect(store.state.history.length).toBe(histLenBefore + 1);

    store.commitBlockResize('b1');
    expect(store.state.history.length).toBe(histLenBefore + 2);
  });
});

/**
 * ТЕСТ №130: Хранилище: Переключение видимости боковых панелей (дерево, инспектор)
 * 
 * Класс эквивалентности: STORE-08 (Panel Visibility Toggles)
 * Описание: Проверяет сворачивание и разворачивание левой панели дерева и правой панели свойств.
 * Предусловия:
 *   - Боковые панели открыты.
 * Действия:
 *   1. Вызвать toggleLeftPanel.
 *   2. Вызвать toggleRightPanel.
 *   3. Проверить флаги.
 * Ожидаемый результат: Флаги видимости панелей переключаются корректно.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №130: Переключение панелей STORE-08', () => {
  it('сворачивает и разворачивает боковые панели интерфейса', () => {
    const store = new EditorStore();
    const leftBefore = store.state.leftPanelOpen;
    store.toggleLeftPanel();
    expect(store.state.leftPanelOpen).toBe(!leftBefore);
    const rightBefore = store.state.rightPanelOpen;
    store.toggleRightPanel();
    expect(store.state.rightPanelOpen).toBe(!rightBefore);
  });
});

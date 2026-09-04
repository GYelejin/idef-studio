/**
 * ТЕСТ №127: Хранилище: Переключение активного инструмента холста (setTool)
 * 
 * Класс эквивалентности: STORE-05 (Tool Selection State)
 * Описание: Проверяет переключение рабочих инструментов редактора: select, block, arrow.
 * Предусловия:
 *   - Редактор запущен.
 * Действия:
 *   1. Установить инструмент 'block'.
 *   2. Установить инструмент 'arrow'.
 *   3. Вернуть 'select'.
 * Ожидаемый результат: Инструмент в хранилище переключается корректно.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №127: Переключение инструментов STORE-05', () => {
  it('активирует выбранный инструмент моделирования', () => {
    const store = new EditorStore();
    store.setTool('block');
    expect(store.state.activeTool).toBe('block');
    store.setTool('arrow');
    expect(store.state.activeTool).toBe('arrow');
    store.setTool('select');
    expect(store.state.activeTool).toBe('select');
  });
});

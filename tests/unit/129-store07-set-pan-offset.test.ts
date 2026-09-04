/**
 * ТЕСТ №129: Хранилище: Панорамирование холста (setPan)
 * 
 * Класс эквивалентности: STORE-07 (Canvas Pan Offset)
 * Описание: Проверяет сохранение смещения видимой области холста.
 * Предусловия:
 *   - Смещение холста (0, 0).
 * Действия:
 *   1. Сместить холст на (150, -80).
 *   2. Проверить pan в store.
 * Ожидаемый результат: Координаты панорамирования сохранены в состоянии редактора.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №129: Панорамирование холста STORE-07', () => {
  it('сохраняет координаты сдвига холста', () => {
    const store = new EditorStore();
    store.setPan({ x: 150, y: -80 });
    expect(store.state.pan.x).toBe(150);
    expect(store.state.pan.y).toBe(-80);
  });
});

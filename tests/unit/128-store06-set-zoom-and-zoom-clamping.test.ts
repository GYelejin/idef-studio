/**
 * ТЕСТ №128: Хранилище: Масштабирование холста (setZoom)
 * 
 * Класс эквивалентности: STORE-06 (Canvas Zoom State)
 * Описание: Проверяет обновление коэффициента зума холста.
 * Предусловия:
 *   - Текущий зум равен 1.0.
 * Действия:
 *   1. Установить зум 1.5.
 *   2. Установить зум 2.0.
 * Ожидаемый результат: Значение зума в store точно обновляется.
 */

import { describe, it, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";

describe("ТЕСТ №128: Масштабирование зума STORE-06", () => {
  it("обновляет коэффициент масштабирования холста", () => {
    const store = new EditorStore();
    store.setZoom(1.5);
    expect(store.state.zoom).toBe(1.5);
    store.setZoom(2.0);
    expect(store.state.zoom).toBe(2.0);
  });
});

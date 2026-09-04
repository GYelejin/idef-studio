/**
 * ТЕСТ №266: Экспорт: Ошибка при недоступности 2D контекста Canvas
 * 
 * Класс эквивалентности: IO-15 (Export PNG Null Context Error)
 * Описание: Проверяет отклонение промиса с понятной ошибкой при сбое получения 2D-контекста Canvas.
 * Предусловия:
 *   - Мокирование Canvas с getContext returning null.
 * Действия:
 *   1. Вызвать exportSvgToPngBlob.
 *   2. Ожидать отклонения с ошибкой.
 * Ожидаемый результат: Промис отклонен с 'Canvas 2D context unavailable'.
 */

import { describe, it, expect } from 'bun:test';
import { exportSvgToPngBlob } from '../../src/core/exporter';

describe('ТЕСТ №266: Ошибка 2D контекста IO-15', () => {
  it('отклоняет промис если контекст 2D недоступен', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    class MockImage {
      onload: (() => void) | null = null;
      set src(v: string) { setTimeout(() => this.onload?.(), 5); }
    }
    const mockCanvas = { getContext: () => null };
    globalThis.Image = MockImage as any;
    globalThis.document = { createElement: () => mockCanvas } as any;
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};

    try {
      await expect(exportSvgToPngBlob('<svg></svg>')).rejects.toThrow('Canvas 2D context unavailable');
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
    }
  });
});

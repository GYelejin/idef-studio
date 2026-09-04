/**
 * ТЕСТ №268: Экспорт: Ошибка при сбое декодирования SVG в Image
 * 
 * Класс эквивалентности: IO-17 (Export PNG Image Load Error)
 * Описание: Проверяет отклонение промиса при срабатывании события onerror у объекта Image.
 * Предусловия:
 *   - Image с вызовом onerror.
 * Действия:
 *   1. Вызвать exportSvgToPngBlob.
 *   2. Ожидать отклонения.
 * Ожидаемый результат: Промис отклонен с сообщением 'Ошибка загрузки SVG в растровый конвертер'.
 */

import { describe, it, expect } from 'bun:test';
import { exportSvgToPngBlob } from '../../src/core/exporter';

describe('ТЕСТ №268: Ошибка загрузки Image IO-17', () => {
  it('отклоняет промис при ошибке загрузки изображения', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    class MockImage {
      onerror: ((e: any) => void) | null = null;
      set src(v: string) { setTimeout(() => this.onerror?.(new Error('img-err')), 5); }
    }
    globalThis.Image = MockImage as any;
    globalThis.document = { createElement: () => ({}) } as any;
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};

    try {
      await expect(exportSvgToPngBlob('<svg></svg>')).rejects.toThrow('Ошибка загрузки SVG');
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
    }
  });
});

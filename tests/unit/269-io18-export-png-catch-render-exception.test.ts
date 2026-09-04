/**
 * ТЕСТ №269: Экспорт: Перехват исключения при отрисовке в Canvas
 * 
 * Класс эквивалентности: IO-18 (Export PNG Catch Render Exception)
 * Описание: Проверяет перехват непредвиденного исключения в блоке try-catch обработчика onload.
 * Предусловия:
 *   - Canvas с выбросом ошибки в drawImage.
 * Действия:
 *   1. Вызвать exportSvgToPngBlob.
 *   2. Ожидать перехвата исключения.
 * Ожидаемый результат: Исключение поймано и передано в reject.
 */

import { describe, it, expect } from 'bun:test';
import { exportSvgToPngBlob } from '../../src/core/exporter';

describe('ТЕСТ №269: Перехват исключения Canvas IO-18', () => {
  it('перехватывает исключение при сбое отрисовки Canvas', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    class MockImage {
      onload: (() => void) | null = null;
      set src(v: string) { setTimeout(() => this.onload?.(), 5); }
    }
    const mockCanvas = {
      getContext: () => ({
        fillStyle: '', fillRect: () => {},
        drawImage: () => { throw new Error('Draw error'); }
      }),
    };
    globalThis.Image = MockImage as any;
    globalThis.document = { createElement: () => mockCanvas } as any;
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};

    try {
      await expect(exportSvgToPngBlob('<svg></svg>')).rejects.toThrow('Draw error');
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
    }
  });
});

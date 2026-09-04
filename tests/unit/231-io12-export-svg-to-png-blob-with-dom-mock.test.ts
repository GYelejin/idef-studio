/**
 * ТЕСТ №231: Экспорт: Конвертация SVG в PNG Blob с мокированием HTML5 Canvas
 * 
 * Класс эквивалентности: IO-12 (Export SVG to PNG Blob with DOM Mock)
 * Описание: Проверяет успешное преобразование SVG в растровый PNG Blob с эмуляцией Image и Canvas API.
 * Предусловия:
 *   - Мокирование глобальных объектов Image, document.createElement и URL.
 * Действия:
 *   1. Вызвать exportSvgToPngBlob.
 *   2. Проверить полученный Blob.
 * Ожидаемый результат: Возвращен Blob с типом 'image/png'.
 */

import { describe, it, expect } from 'bun:test';
import { exportSvgToPngBlob } from '../../src/core/exporter';

describe('ТЕСТ №231: Экспорт в PNG Blob IO-12', () => {
  it('конвертирует SVG в PNG Blob через эмуляцию HTML5 Canvas', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    const origCreateUrl = URL.createObjectURL;
    const origRevokeUrl = URL.revokeObjectURL;

    class MockImage {
      onload: (() => void) | null = null;
      onerror: ((e: any) => void) | null = null;
      set src(v: string) {
        setTimeout(() => this.onload?.(), 5);
      }
    }

    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: () => ({
        fillStyle: '',
        fillRect: () => {},
        drawImage: () => {},
      }),
      toBlob: (cb: (b: Blob) => void) => {
        cb(new Blob(['png-binary-data'], { type: 'image/png' }));
      },
    };

    globalThis.Image = MockImage as any;
    globalThis.document = {
      createElement: (tag: string) => (tag === 'canvas' ? mockCanvas : {}),
    } as any;
    URL.createObjectURL = () => 'blob:mock-svg';
    URL.revokeObjectURL = () => {};

    try {
      const blob = await exportSvgToPngBlob('<svg></svg>');
      expect(blob).toBeDefined();
      expect(blob.type).toBe('image/png');
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
      URL.createObjectURL = origCreateUrl;
      URL.revokeObjectURL = origRevokeUrl;
    }
  });
});

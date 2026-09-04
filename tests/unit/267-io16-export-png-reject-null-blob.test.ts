/**
 * ТЕСТ №267: Экспорт: Ошибка при сбое генерации Blob из Canvas
 * 
 * Класс эквивалентности: IO-16 (Export PNG Null Blob Error)
 * Описание: Проверяет отклонение промиса при возврате null из canvas.toBlob.
 * Предусловия:
 *   - Мокирование Canvas с toBlob((cb) => cb(null)).
 * Действия:
 *   1. Вызвать exportSvgToPngBlob.
 *   2. Ожидать отклонения.
 * Ожидаемый результат: Промис отклонен с 'Не удалось сгенерировать PNG файл'.
 */

import { describe, it, expect } from 'bun:test';
import { exportSvgToPngBlob } from '../../src/core/exporter';

describe('ТЕСТ №267: Сбой генерации Blob IO-16', () => {
  it('отклоняет промис если canvas.toBlob вернул null', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    class MockImage {
      onload: (() => void) | null = null;
      set src(v: string) { setTimeout(() => this.onload?.(), 5); }
    }
    const mockCanvas = {
      getContext: () => ({ fillStyle: '', fillRect: () => {}, drawImage: () => {} }),
      toBlob: (cb: any) => cb(null),
    };
    globalThis.Image = MockImage as any;
    globalThis.document = { createElement: () => mockCanvas } as any;
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};

    try {
      await expect(exportSvgToPngBlob('<svg></svg>')).rejects.toThrow('Не удалось сгенерировать PNG файл');
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
    }
  });
});

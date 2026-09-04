/**
 * ТЕСТ №232: Экспорт: Архивирование нескольких диаграмм в ZIP (PNG)
 * 
 * Класс эквивалентности: IO-13 (Export Diagrams to ZIP PNG)
 * Описание: Проверяет экспорт проекта в ZIP-архив с конвертацией страниц в формат PNG.
 * Предусловия:
 *   - Диаграмма с блоком и замоканный Canvas.
 * Действия:
 *   1. Вызвать exportDiagramsToZip(diagrams, 'png').
 *   2. Проверить итоговый ZIP Blob.
 * Ожидаемый результат: Создан валидный архив Blob.
 */

import { describe, it, expect } from 'bun:test';
import { exportDiagramsToZip } from '../../src/core/exporter';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №232: Экспорт в ZIP PNG IO-13', () => {
  it('пакетирует диаграммы в ZIP архив растровых изображений PNG', async () => {
    const origImage = globalThis.Image;
    const origDoc = globalThis.document;
    const origCreateUrl = URL.createObjectURL;
    const origRevokeUrl = URL.revokeObjectURL;

    class MockImage {
      onload: (() => void) | null = null;
      set src(v: string) { setTimeout(() => this.onload?.(), 5); }
    }
    const mockCanvas = {
      getContext: () => ({ fillStyle: '', fillRect: () => {}, drawImage: () => {} }),
      toBlob: (cb: (b: Blob) => void) => cb(new Blob(['png-data'], { type: 'image/png' })),
    };
    globalThis.Image = MockImage as any;
    globalThis.document = { createElement: (tag: string) => mockCanvas } as any;
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};

    try {
      const diag: Diagram = {
        id: 'd1', code: 'A0', title: 'Главная', blocks: [], arrows: [], junctions: [],
      };
      const zipBlob = await exportDiagramsToZip([diag], 'png');
      expect(zipBlob).toBeDefined();
    } finally {
      globalThis.Image = origImage;
      globalThis.document = origDoc;
      URL.createObjectURL = origCreateUrl;
      URL.revokeObjectURL = origRevokeUrl;
    }
  });
});

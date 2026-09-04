/**
 * ТЕСТ №122: Экспорт: Наличие определений маркеров стрелок в генерируемом SVG
 * 
 * Класс эквивалентности: EXPORT-01 (SVG Marker Definitions)
 * Описание: Проверяет экспорт векторного SVG с корректным треугольным наконечником стрелки marker-end.
 * Предусловия:
 *   - Диаграмма содержит функциональный блок и стрелку.
 * Действия:
 *   1. Вызвать exportDiagramToSvg.
 *   2. Проверить наличие тега marker.
 * Ожидаемый результат: Векторный SVG содержит корректное геометрическое определение наконечника стрелки.
 */

import { describe, it, expect } from 'bun:test';
import { exportDiagramToSvg } from '../../src/core/exporter';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №122: Маркеры стрелок в SVG EXPORT-01', () => {
  it('включает маркер наконечника стрелки в defs SVG документа', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A0',
      title: 'Контекст',
      blocks: [{ id: 'b1', nodeNumber: 0, name: 'Функция', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null }],
      arrows: [{
        id: 'a1',
        label: 'Стрелка',
        source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
        target: { type: 'block', id: 'b1', side: 'left', point: { x: 200, y: 250 } },
        role: 'input',
        points: [{ x: 30, y: 250 }, { x: 200, y: 250 }],
        pinned: false,
      }],
      junctions: [],
    };
    const svg = exportDiagramToSvg(diag);
    expect(svg).toContain('<svg');
    expect(svg).toContain('<marker');
    expect(svg).toContain('marker-end="url(#marker-arrow-a1)"');
  });
});

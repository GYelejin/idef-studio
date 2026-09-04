/**
 * ТЕСТ №331: Адаптация при ресайзе: Синхронизация стрелок на левой и правой гранях
 * 
 * Класс эквивалентности: RESIZE-06 (Adapt Source Left Target Right)
 * Описание: Проверяет пересчет контактных портов стрелок, присоединенных к левой грани источника и правой грани цели, при изменении габаритов блоков.
 * Предусловия:
 *   - Блок источника и блок цели изменяют размеры.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize для левой грани источника.
 *   2. Вызвать adjustArrowOnBlockResize для правой грани цели.
 * Ожидаемый результат: Точки контактов пропорционально пересчитаны по новым размерам.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster/blockResizeAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №331: Ресайз левой и правой граней RESIZE-06', () => {
  it('адаптирует контакты стрелки на левой и правой гранях при ресайзе блоков', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'left', point: { x: 200, y: 250 } },
      target: { type: 'block', id: 'b2', side: 'right', point: { x: 800, y: 250 } },
      role: 'output', points: [{ x: 200, y: 250 }, { x: 100, y: 250 }, { x: 100, y: 400 }, { x: 900, y: 400 }, { x: 900, y: 250 }, { x: 800, y: 250 }],
      pinned: true,
    };

    adjustArrowOnBlockResize(arrow, b1, { x: 200, y: 200, width: 200, height: 100 }, { x: 150, y: 150, width: 250, height: 150 });
    expect(arrow.source.point.x).toBe(150);

    adjustArrowOnBlockResize(arrow, b2, { x: 600, y: 200, width: 200, height: 100 }, { x: 600, y: 200, width: 300, height: 100 });
    expect(arrow.target.point.x).toBe(900);
  });
});

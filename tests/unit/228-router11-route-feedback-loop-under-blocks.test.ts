/**
 * ТЕСТ №228: Трассировка: Ортогональная петля обратной связи вокруг препятствий
 * 
 * Класс эквивалентности: ROUTE-11 (Route Feedback Loop Under Blocks)
 * Описание: Проверяет обходное ортогональное соединение Выхода правого блока со Входом левого блока вокруг промежуточного препятствия.
 * Предусловия:
 *   - Источник справа (800, 250), цель слева (200, 250), между ними блок-препятствие.
 * Действия:
 *   1. Вызвать buildOrthogonalRoute с передачей блоков-препятствий.
 *   2. Проверить количество точек (>= 4) и их ортогональность.
 * Ожидаемый результат: Сгенерирован обходной маршрут без коллизий.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute, isOrthogonal } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №228: Петля под блоками ROUTE-11', () => {
  it('строит строго ортогональный обходной маршрут обратной связи', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Блок 1', x: 100, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Блок 2', x: 600, y: 200, width: 200, height: 100, decompDiagramId: null };
    const obstacle: Block = { id: 'obs', nodeNumber: 3, name: 'Препятствие', x: 350, y: 200, width: 200, height: 100, decompDiagramId: null };

    const pts = buildOrthogonalRoute(
      { type: 'block', id: 'b2', side: 'right', point: { x: 800, y: 250 } },
      { type: 'block', id: 'b1', side: 'left', point: { x: 100, y: 250 } },
      [b1, obstacle, b2]
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
    for (let i = 0; i < pts.length - 1; i++) {
      expect(isOrthogonal(pts[i], pts[i + 1])).toBe(true);
    }
  });
});

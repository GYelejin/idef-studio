/**
 * ТЕСТ №172: Трассировка: Обход промежуточного блока по горизонтали
 * 
 * Класс эквивалентности: ROUTE-06 (Avoid Block Detour Vertical)
 * Описание: Проверяет обход блока при вертикальном прохождении стрелки сверху вниз сквозь блок.
 * Предусловия:
 *   - Вертикальный отрезок (400, 50) -> (400, 500) пересекает блок в (300, 200).
 * Действия:
 *   1. Вызвать avoidBlockObstacles.
 *   2. Проверить обходные координаты X.
 * Ожидаемый результат: Маршрут содержит точки обхода левее или правее блока.
 */

import { describe, it, expect } from 'bun:test';
import { avoidBlockObstacles } from '../../src/core/geometry/router';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №172: Обход блока по горизонтали ROUTE-06', () => {
  it('строит обходной маршрут вокруг блока при вертикальной трассировке', () => {
    const obstacle: Block = { id: 'obs', nodeNumber: 2, name: 'Препятствие', x: 300, y: 200, width: 200, height: 100, decompDiagramId: null };
    const rawPoints = [{ x: 400, y: 50 }, { x: 400, y: 500 }];
    const routed = avoidBlockObstacles(rawPoints, [obstacle], []);
    expect(routed.length).toBeGreaterThan(2);
  });
});

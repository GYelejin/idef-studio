/**
 * ТЕСТ №171: Трассировка: Обход промежуточного блока по вертикали (avoidBlockObstacles)
 * 
 * Класс эквивалентности: ROUTE-05 (Avoid Block Detour Horizontal)
 * Описание: Проверяет построение обходного коридора вокруг функционального блока, лежащего на пути стрелки.
 * Предусловия:
 *   - Блок-препятствие расположен между началом и концом стрелки.
 * Действия:
 *   1. Вызвать avoidBlockObstacles.
 *   2. Проверить наличие обходных точек.
 * Ожидаемый результат: Сгенерирован маршрут обхода препятствия.
 */

import { describe, it, expect } from 'bun:test';
import { avoidBlockObstacles } from '../../src/core/geometry/router';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №171: Обход блока по вертикали ROUTE-05', () => {
  it('строит обходной маршрут вокруг промежуточного блока', () => {
    const obstacle: Block = { id: 'obs', nodeNumber: 2, name: 'Препятствие', x: 300, y: 150, width: 200, height: 100, decompDiagramId: null };
    const rawPoints = [{ x: 100, y: 200 }, { x: 700, y: 200 }];
    const routed = avoidBlockObstacles(rawPoints, [obstacle], []);
    expect(routed.length).toBeGreaterThan(2);
  });
});

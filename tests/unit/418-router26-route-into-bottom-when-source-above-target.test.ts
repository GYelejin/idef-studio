/**
 * ТЕСТ №418: Трассировка: Обходной коридор входа в нижнюю грань блока сверху
 * 
 * Класс эквивалентности: ROUTE-26 (Route Into Bottom When Source Above Target)
 * Описание: Проверяет построение огибающего коридора со stepY = pEnd.y + 30 при трассировке в нижний порт блока (Механизм), когда источник расположен выше блока.
 * Предусловия:
 *   - Источник (200, 100), цель на нижней грани блока (500, 400).
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить максимальную координату Y в маршруте.
 * Ожидаемый результат: Построен безопасный обходной путь с заходом снизу.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №418: Обходной заход снизу ROUTE-26', () => {
  it('формирует безопасный огибающий коридор при вводе в нижнюю грань сверху', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 200, y: 100 } },
      { type: 'block', id: 'b2', side: 'bottom', point: { x: 500, y: 400 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
    const maxY = Math.max(...pts.map(p => p.y));
    expect(maxY).toBeGreaterThan(400);
  });
});

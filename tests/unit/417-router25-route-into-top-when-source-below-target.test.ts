/**
 * ТЕСТ №417: Трассировка: Обходной коридор входа в верхнюю грань блока снизу
 * 
 * Класс эквивалентности: ROUTE-25 (Route Into Top When Source Below Target)
 * Описание: Проверяет построение безопасного огибающего коридора со stepY = pEnd.y - 30 при трассировке в верхний порт блока (Управление), когда источник расположен ниже блока.
 * Предусловия:
 *   - Источник (600, 500), цель на верхней грани блока (400, 200).
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить минимальную координату Y в маршруте.
 * Ожидаемый результат: Построен безопасный обходной путь с заходом сверху.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №417: Обходной заход сверху ROUTE-25', () => {
  it('формирует безопасный огибающий коридор при вводе в верхнюю грань снизу', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'block', id: 'b1', side: 'right', point: { x: 600, y: 500 } },
      { type: 'block', id: 'b2', side: 'top', point: { x: 400, y: 200 } }
    );
    expect(pts.length).toBeGreaterThanOrEqual(4);
    const minY = Math.min(...pts.map(p => p.y));
    expect(minY).toBeLessThan(200);
  });
});

/**
 * ТЕСТ №430: Трассировка: Обходной коридор входа в нижнюю грань при расположении источника выше цели
 * 
 * Класс эквивалентности: ROUTE-28 (Route Into Bottom When Source Higher Than Target)
 * Описание: Проверяет расчет stepY = pEnd.y + 30 и формирование безопасной петли захода в нижний порт блока (Механизм), когда источник лежит выше целевого контакта.
 * Предусловия:
 *   - Источник (100, 200), цель (500, 400) на грани side: 'bottom'.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить точки трассы.
 * Ожидаемый результат: Построен маршрут с заходом снизу с высотой Y = 430.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №430: Петля захода снизу ROUTE-28', () => {
  it('строит огибающий коридор со stepY = pEnd.y + 30 при вводе в нижнюю грань сверху', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 100, y: 200 } },
      { type: 'block', id: 'b1', side: 'bottom', point: { x: 500, y: 400 } }
    );
    expect(pts.length).toBe(4);
    expect(pts[1].y).toBe(430);
    expect(pts[2].y).toBe(430);
  });
});

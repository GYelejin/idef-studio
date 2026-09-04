/**
 * ТЕСТ №429: Трассировка: Обходной коридор входа в верхнюю грань при расположении источника ниже цели
 * 
 * Класс эквивалентности: ROUTE-27 (Route Into Top When Source Lower Than Target)
 * Описание: Проверяет расчет stepY = pEnd.y - 30 и формирование безопасной петли захода в верхний порт блока (Управление), когда источник лежит ниже целевого контакта.
 * Предусловия:
 *   - Источник (100, 500), цель (500, 200) на грани side: 'top'.
 * Действия:
 *   1. Вызвать buildRawOrthogonalRoute.
 *   2. Проверить точки трассы.
 * Ожидаемый результат: Построен маршрут с заходом сверху с высотой Y = 170.
 */

import { describe, it, expect } from 'bun:test';
import { buildRawOrthogonalRoute } from '../../src/core/geometry/router';

describe('ТЕСТ №429: Петля захода сверху ROUTE-27', () => {
  it('строит огибающий коридор со stepY = pEnd.y - 30 при вводе в верхнюю грань снизу', () => {
    const pts = buildRawOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 100, y: 500 } },
      { type: 'block', id: 'b1', side: 'top', point: { x: 500, y: 200 } }
    );
    expect(pts.length).toBe(4);
    expect(pts[1].y).toBe(170);
    expect(pts[2].y).toBe(170);
  });
});

/**
 * ТЕСТ №356: Перемещение блока: Перетрассировка граничного выхода в автоматическом режиме
 * 
 * Класс эквивалентности: MOVE-11 (Boundary Arrow Auto Mode Recalculates Route)
 * Описание: Проверяет автоматический пересчет ортогонального маршрута через buildOrthogonalRoute при сдвиге блока с исходящей стрелкой в режиме auto.
 * Предусловия:
 *   - Стрелка в pathMode: 'auto'.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points.
 * Ожидаемый результат: Маршрут перетрассирован роутером.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №356: Граничный выход в авто-режиме MOVE-11', () => {
  it('перетрассирует граничную стрелку в режиме auto', () => {
    const b: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Выход',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output', points: [{ x: 400, y: 250 }, { x: 1570, y: 250 }],
      pinned: false, pathMode: 'auto',
    };

    adjustArrowOnBlockMove(arrow, b, 50, 50);
    expect(arrow.points[0].x).toBe(450);
    expect(arrow.points[0].y).toBe(300);
  });
});

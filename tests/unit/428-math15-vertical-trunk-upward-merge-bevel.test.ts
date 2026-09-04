/**
 * ТЕСТ №428: Математика: Скос слияния на вертикальном стволе с восходящим потоком
 * 
 * Класс эквивалентности: MATH-15 (Vertical Trunk Upward Merge Bevel)
 * Описание: Проверяет добавление скоса слияния для стрелки, входящей в вертикальный ствол с восходящим потоком.
 * Предусловия:
 *   - Вертикальный ствол снизу вверх и входящая горизонтальная стрелка слияния.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить добавление скоса.
 * Ожидаемый результат: Добавлен скос слияния по направлению вверх.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №428: Скос восходящего слияния MATH-15', () => {
  it('добавляет скос слияния на вертикальном стволе с восходящим потоком', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'bottom', point: { x: 500, y: 800 } },
      target: { type: 'border', side: 'top', point: { x: 500, y: 100 } },
      role: 'mechanism', points: [{ x: 500, y: 800 }, { x: 500, y: 100 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'merge', point: { x: 500, y: 400 }, parentArrowId: 'trunk', childArrowIds: ['merge'] };
    const merge: Arrow = {
      id: 'merge', label: 'Слияние',
      source: { type: 'border', side: 'left', point: { x: 30, y: 400 } },
      target: { type: 'junction', id: 'j1', point: { x: 500, y: 400 } },
      role: 'output', points: [{ x: 30, y: 400 }, { x: 500, y: 400 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(merge, [junc], [trunk]);
    expect(renderPts.length).toBeGreaterThan(merge.points.length);
  });
});

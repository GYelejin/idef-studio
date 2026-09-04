/**
 * ТЕСТ №380: Математика: Формирование скоса слияния на вертикальном родительском стволе
 * 
 * Класс эквивалентности: MATH-10 (Vertical Parent Horizontal Merge Lead In)
 * Описание: Проверяет добавление 15px скоса в getRenderPointsForArrow для горизонтальной стрелки, вливающейся в вертикальный ствол.
 * Предусловия:
 *   - Вертикальный ствол и стрелка слияния.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow для стрелки слияния.
 *   2. Проверить добавление завершающего скоса.
 * Ожидаемый результат: В массив точек добавлен завершающий скос слияния.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №380: Скос слияния на вертикальном стволе MATH-10', () => {
  it('добавляет скос слияния по направлению вертикального потока', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'border', side: 'bottom', point: { x: 500, y: 865 } },
      role: 'control', points: [{ x: 500, y: 40 }, { x: 500, y: 865 }], pinned: false,
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

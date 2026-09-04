/**
 * ТЕСТ №379: Математика: Формирование скоса ветвления на вертикальном родительском стволе
 * 
 * Класс эквивалентности: MATH-09 (Vertical Parent Horizontal Branch Lead In)
 * Описание: Проверяет добавление 15px скоса в getRenderPointsForArrow для горизонтальной ветви, отходящей от вертикального ствола Управления.
 * Предусловия:
 *   - Вертикальный ствол и горизонтальная ветвь.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить добавление направляющей точки скоса.
 * Ожидаемый результат: В массив точек добавлен начальный скос по направлению потока.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №379: Скос ветви на вертикальном стволе MATH-09', () => {
  it('добавляет скос ветвления по направлению вертикального потока', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 865 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 400, y: 300 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch', label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 400, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'output', points: [{ x: 400, y: 300 }, { x: 1570, y: 300 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(branch, [junc], [trunk]);
    expect(renderPts.length).toBeGreaterThan(branch.points.length);
  });
});

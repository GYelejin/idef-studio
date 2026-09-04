/**
 * ТЕСТ №427: Математика: Скос ветвления на вертикальном стволе с восходящим потоком
 * 
 * Класс эквивалентности: MATH-14 (Vertical Trunk Upward Branch Bevel)
 * Описание: Проверяет добавление скоса ветвления для горизонтальной ветви, отходящей от вертикального ствола с направлением потока снизу вверх (pEnd.y < pStart.y).
 * Предусловия:
 *   - Вертикальный ствол снизу вверх (Y от 800 до 100) и горизонтальная ветвь.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить добавление скоса.
 * Ожидаемый результат: Добавлен скос с учетом восходящего направления потока.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №427: Скос восходящей ветви MATH-14', () => {
  it('добавляет скос на вертикальном стволе с восходящим потоком', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'bottom', point: { x: 400, y: 800 } },
      target: { type: 'border', side: 'top', point: { x: 400, y: 100 } },
      role: 'mechanism', points: [{ x: 400, y: 800 }, { x: 400, y: 100 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 400, y: 400 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch', label: 'Ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 400, y: 400 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 400 } },
      role: 'output', points: [{ x: 400, y: 400 }, { x: 1570, y: 400 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(branch, [junc], [trunk]);
    expect(renderPts.length).toBeGreaterThan(branch.points.length);
  });
});

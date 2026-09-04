/**
 * ТЕСТ №438: Математика: Пропуск скоса ветвления при противоположном направлении потока
 * 
 * Класс эквивалентности: MATH-16 (Horizontal Parent Opposite Flow Branch)
 * Описание: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если горизонтальная ветвь направлена в противоположную сторону относительно течения родительского ствола.
 * Предусловия:
 *   - Ствол слева направо (100..800), ветвь справа налево (400..200).
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить points.length без изменений.
 * Ожидаемый результат: Скос не добавлен (сохранена исходная длина массива точек).
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №438: Ветвь в обратную сторону MATH-16', () => {
  it('не добавляет скос при противоположном направлении горизонтальной ветви', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 500, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch', label: 'Обратная ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 500, y: 200 } },
      target: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      role: 'output', points: [{ x: 500, y: 200 }, { x: 200, y: 200 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(branch, [junc], [trunk]);
    expect(renderPts.length).toBe(branch.points.length);
  });
});

/**
 * ТЕСТ №439: Математика: Пропуск скоса ветвления при противоположном вертикальном потоке
 * 
 * Класс эквивалентности: MATH-17 (Vertical Parent Opposite Flow Branch)
 * Описание: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если вертикальная ветвь направлена навстречу родительскому стволу.
 * Предусловия:
 *   - Ствол сверху вниз (40..800), ветвь снизу вверх (400..200).
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить points.length без изменений.
 * Ожидаемый результат: Скос не добавлен.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №439: Вертикальная ветвь навстречу MATH-17', () => {
  it('не добавляет скос при противоположном направлении вертикальной ветви', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 865 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'branch', point: { x: 400, y: 400 }, parentArrowId: 'trunk', childArrowIds: ['branch'] };
    const branch: Arrow = {
      id: 'branch', label: 'Обратная ветвь',
      source: { type: 'junction', id: 'j1', point: { x: 400, y: 400 } },
      target: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      role: 'control', points: [{ x: 400, y: 400 }, { x: 400, y: 200 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(branch, [junc], [trunk]);
    expect(renderPts.length).toBe(branch.points.length);
  });
});

/**
 * ТЕСТ №441: Математика: Пропуск скоса слияния при противоположном вертикальном потоке
 * 
 * Класс эквивалентности: MATH-19 (Vertical Parent Opposite Flow Merge)
 * Описание: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если входящая стрелка слияния вливается навстречу течению вертикального ствола.
 * Предусловия:
 *   - Ствол сверху вниз, входящая стрелка снизу вверх.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow.
 *   2. Проверить points.length без изменений.
 * Ожидаемый результат: Скос слияния не добавлен.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №441: Встречное слияние по вертикали MATH-19', () => {
  it('не добавляет скос при противоположном направлении вертикального слияния', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'top', point: { x: 500, y: 40 } },
      target: { type: 'border', side: 'bottom', point: { x: 500, y: 865 } },
      role: 'control', points: [{ x: 500, y: 40 }, { x: 500, y: 865 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'merge', point: { x: 500, y: 500 }, parentArrowId: 'trunk', childArrowIds: ['merge'] };
    const merge: Arrow = {
      id: 'merge', label: 'Встречное слияние',
      source: { type: 'border', side: 'bottom', point: { x: 500, y: 700 } },
      target: { type: 'junction', id: 'j1', point: { x: 500, y: 500 } },
      role: 'mechanism', points: [{ x: 500, y: 700 }, { x: 500, y: 500 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(merge, [junc], [trunk]);
    expect(renderPts.length).toBe(merge.points.length);
  });
});

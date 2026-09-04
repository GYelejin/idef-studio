/**
 * ТЕСТ №440: Математика: Пропуск скоса слияния при противоположном горизонтальном потоке
 * 
 * Класс эквивалентности: MATH-18 (Horizontal Parent Opposite Flow Merge)
 * Описание: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если входящая стрелка слияния вливается навстречу течению горизонтального ствола.
 * Предусловия:
 *   - Ствол слева направо, входящая стрелка справа налево.
 * Действия:
 *   1. Вызвать getRenderPointsForArrow для стрелки слияния.
 *   2. Проверить points.length без изменений.
 * Ожидаемый результат: Скос слияния не добавлен.
 */

import { describe, it, expect } from 'bun:test';
import { getRenderPointsForArrow } from '../../src/core/geometry/math';
import { Arrow, Junction } from '../../src/types/idef0';

describe('ТЕСТ №440: Встречное слияние по горизонтали MATH-18', () => {
  it('не добавляет скос при противоположном направлении стрелки слияния', () => {
    const trunk: Arrow = {
      id: 'trunk', label: 'Ствол',
      source: { type: 'border', side: 'left', point: { x: 30, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'input', points: [{ x: 30, y: 300 }, { x: 1570, y: 300 }], pinned: false,
    };
    const junc: Junction = { id: 'j1', type: 'merge', point: { x: 500, y: 300 }, parentArrowId: 'trunk', childArrowIds: ['merge'] };
    const merge: Arrow = {
      id: 'merge', label: 'Встречное слияние',
      source: { type: 'border', side: 'right', point: { x: 800, y: 300 } },
      target: { type: 'junction', id: 'j1', point: { x: 500, y: 300 } },
      role: 'output', points: [{ x: 800, y: 300 }, { x: 500, y: 300 }], pinned: false,
    };

    const renderPts = getRenderPointsForArrow(merge, [junc], [trunk]);
    expect(renderPts.length).toBe(merge.points.length);
  });
});

/**
 * ТЕСТ №38: Геометрия: Огибание функциональных блоков коридором стрелки
 * 
 * Класс эквивалентности: GEOM-03 (Obstacle Avoidance)
 * Описание: Проверяет автоматическое огибание функционального блока, расположенного между источником и целью стрелки.
 * Предусловия:
 *   - Блок-препятствие расположен прямо на пути прямой линии между точками.
 * Действия:
 *   1. Построить ортогональный маршрут через область с блоком-препятствием.
 *   2. Проверить пересечение сегментов стрелки с телом блока.
 * Ожидаемый результат: Маршрут огибает блок снаружи с отступом не менее 20px, ноль пересечений с телом блока.
 */

import { describe, it, expect } from 'bun:test';
import { buildOrthogonalRoute, checkSegmentBlockCollision, getSegmentsFromPoints } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №38: Огибание препятствий GEOM-03', () => {
  it('прокладывает маршрут в обход функционального блока', () => {
    const obstacle: Block = {
      id: 'obs',
      nodeNumber: 1,
      name: 'Препятствие',
      x: 300,
      y: 150,
      width: 200,
      height: 120,
      decompDiagramId: null,
    };
    const pts = buildOrthogonalRoute(
      { type: 'border', side: 'left', point: { x: 100, y: 210 } },
      { type: 'border', side: 'right', point: { x: 700, y: 210 } },
      [obstacle]
    );
    expect(pts.length).toBeGreaterThan(2);
    const segs = getSegmentsFromPoints(pts);
    for (const seg of segs) {
      const collides = checkSegmentBlockCollision(seg, obstacle);
      expect(collides).toBe(false);
    }
  });
});

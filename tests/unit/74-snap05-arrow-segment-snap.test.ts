/**
 * ТЕСТ №74: Прилипание: Захват промежуточного сегмента существующей стрелки
 * 
 * Класс эквивалентности: SNAP-05 (Arrow Segment Snapping)
 * Описание: Проверяет притягивание точки к сегменту стрелки для создания узлов ветвления или слияния.
 * Предусловия:
 *   - Стрелка с горизонтальным сегментом от (100, 200) до (500, 200).
 * Действия:
 *   1. Задать точку около сегмента (x: 250, y: 205).
 *   2. Вызвать getArrowSegmentSnapPoint.
 * Ожидаемый результат: Точка спроецирована на сегмент с координатой y: 200.
 */

import { describe, it, expect } from 'bun:test';
import { getArrowSegmentSnapPoint } from '../../src/core/geometry';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №74: Прилипание к сегменту стрелки SNAP-05', () => {
  it('притягивает точку к сегменту стрелки для создания узла', () => {
    const arrow: Arrow = {
      id: 'a1',
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'block', id: 'b1', side: 'left', point: { x: 500, y: 200 } },
      role: 'input',
      points: [{ x: 30, y: 200 }, { x: 500, y: 200 }],
      pinned: false,
    };
    const snap = getArrowSegmentSnapPoint([arrow], { x: 250, y: 205 }, 25);
    expect(snap).toBeDefined();
    expect(snap!.point.y).toBe(200);
  });
});

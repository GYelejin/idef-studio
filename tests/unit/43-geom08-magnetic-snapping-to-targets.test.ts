/**
 * ТЕСТ №43: Геометрия: Магнитное прилипание к граням блоков и границам
 * 
 * Класс эквивалентности: GEOM-08 (Magnetic Snapping Engine)
 * Описание: Проверяет притяжение курсора к граням блока при наведении в радиусе прилипания 25px.
 * Предусловия:
 *   - Блок расположен на координатах (400, 300).
 * Действия:
 *   1. Задать курсор на расстоянии 10px от грани блока (x: 390, y: 350).
 *   2. Вызвать findSnapTarget.
 *   3. Проверить захват цели прилипания.
 * Ожидаемый результат: Точка прилипает к левой грани блока с точной координатой x: 400.
 */

import { describe, it, expect } from 'bun:test';
import { getBlockSnapPoint } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №43: Магнитное прилипание GEOM-08', () => {
  it('притягивает курсор к грани блока в радиусе захвата', () => {
    const b: Block = {
      id: 'b1',
      nodeNumber: 1,
      name: 'Блок',
      x: 400,
      y: 300,
      width: 200,
      height: 120,
      decompDiagramId: null,
    };
    const snap = getBlockSnapPoint(b, { x: 395, y: 360 }, 25);
    expect(snap).toBeDefined();
    expect(snap!.point.x).toBe(400);
  });
});

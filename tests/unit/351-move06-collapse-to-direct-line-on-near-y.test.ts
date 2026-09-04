/**
 * ТЕСТ №351: Перемещение блока: Схлопывание в прямой горизонтальный отрезок при совмещении по высоте
 * 
 * Класс эквивалентности: MOVE-06 (Collapse To Direct Line On Near Y)
 * Описание: Проверяет автоматическое спрямление трассы в 2 точки (pSrc, pTgt), когда в процессе перетаскивания блока разница высот между портами становится <= 10px.
 * Предусловия:
 *   - Два блока, блок 1 смещается так, что Y выхода совпадает с Y входа блока 2.
 * Действия:
 *   1. Вызвать adjustArrowOnBlockMove.
 *   2. Проверить points.length === 2.
 * Ожидаемый результат: Трасса схлопнута в прямую линию из 2 точек.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockMove } from '../../src/core/geometry/adjuster/blockMoveAdjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №351: Схлопывание в прямую линию MOVE-06', () => {
  it('спрямляет трассу в 2 точки при выравнивании высоты портов', () => {
    const b1: Block = { id: 'b1', nodeNumber: 1, name: 'Б1', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const b2: Block = { id: 'b2', nodeNumber: 2, name: 'Б2', x: 600, y: 250, width: 200, height: 100, decompDiagramId: null };
    const arrow: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: 'b1', side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'block', id: 'b2', side: 'left', point: { x: 600, y: 254 } },
      role: 'output', points: [{ x: 400, y: 250 }, { x: 500, y: 250 }, { x: 500, y: 254 }, { x: 600, y: 254 }],
      pinned: false,
    };

    adjustArrowOnBlockMove(arrow, b1, 0, 4);
    expect(arrow.points.length).toBe(2);
  });
});

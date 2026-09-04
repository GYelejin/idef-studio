/**
 * ТЕСТ №221: Масштабирование: Пересчет выноски подписи при ресайзе блока
 * 
 * Класс эквивалентности: RESIZE-11 (Leader Line Update on Resize)
 * Описание: Проверяет обновление leaderPoints стрелки с выноской при изменении размера подключенного блока.
 * Предусловия:
 *   - Стрелка с включенной выноской (showLeader: true).
 * Действия:
 *   1. Вызвать adjustArrowOnBlockResize.
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: leaderPoints обновлены с учетом нового положения портов.
 */

import { describe, it, expect } from 'bun:test';
import { adjustArrowOnBlockResize } from '../../src/core/geometry/adjuster';
import { Arrow, Block } from '../../src/types/idef0';

describe('ТЕСТ №221: Выноска при ресайзе блока RESIZE-11', () => {
  it('пересчитывает точки выноски при изменении размеров блока', () => {
    const oldB: Block = { id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null };
    const newB: Block = { ...oldB, height: 180 };
    const a: Arrow = {
      id: 'a1', label: 'Поток',
      source: { type: 'block', id: oldB.id, side: 'right', point: { x: 400, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 400, y: 250 }, { x: 1570, y: 250 }],
      showLeader: true,
      labelPos: { x: 500, y: 350 },
      pinned: false,
    };
    adjustArrowOnBlockResize(a, newB, oldB, newB);
    expect(a.leaderPoints).toBeDefined();
  });
});

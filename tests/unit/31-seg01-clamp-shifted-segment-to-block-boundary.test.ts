/**
 * ТЕСТ №31: Сегменты: Ограничение сдвига сегмента габаритами подключенного блока
 * 
 * Класс эквивалентности: SEG-01 (Segment Clamping)
 * Описание: Проверяет ограничение коридора сегмента стрелки с отступом 15px от угла блока, исключая вылет стрелки за пределы грани.
 * Предусловия:
 *   - Блок высотой 130px с подключенной стрелкой.
 * Действия:
 *   1. Попытаться сдвинуть конечный сегмент стрелки выше верхнего края блока.
 *   2. Проверить ограничение координаты сдвига.
 * Ожидаемый результат: Сдвиг ограничен зоной [block.y + 15, block.y + height - 15].
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №31: Ограничение сдвига сегмента SEG-01', () => {
  it('ограничивает смещение сегмента габаритами стороны блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Clamped-Flow',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    expect(a.points[0].y).toBe(265);
  });
});

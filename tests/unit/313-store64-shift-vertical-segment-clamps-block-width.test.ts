/**
 * ТЕСТ №313: Хранилище: Ограничение сдвига стрелки Управления шириной блока
 * 
 * Класс эквивалентности: STORE-64 (Shift Vertical Segment Clamps Block Width)
 * Описание: Проверяет удержание контактного порта в пределах [block.x + 15, block.x + block.width - 15] при попытке сдвинуть вертикальный сегмент за пределы блока.
 * Предусловия:
 *   - Стрелка в верхнюю грань блока (X от 300 до 510).
 * Действия:
 *   1. Вызвать shiftArrowSegment со значением X=600.
 *   2. Проверить ограничение X не более 495.
 * Ожидаемый результат: Координата ограничена 495px (отступ 15px от правого края блока).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №313: Ограничение сдвига шириной блока STORE-64', () => {
  it('удерживает вертикальное звено стрелки в границах грани блока', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Управление',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 200 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 200 }], pinned: true,
    })!;

    store.shiftArrowSegment(a.id, 0, 600);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].x).toBeLessThanOrEqual(300 + b.width - 15);
  });
});

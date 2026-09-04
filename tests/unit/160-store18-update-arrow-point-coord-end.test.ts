/**
 * ТЕСТ №160: Хранилище: Обновление координаты конечной точки (updateArrowPointCoord)
 * 
 * Класс эквивалентности: STORE-18 (Update Arrow Point Coord End)
 * Описание: Проверяет обновление координаты X конечной точки с синхронизацией target.point.
 * Предусловия:
 *   - Стрелка между блоками.
 * Действия:
 *   1. Вызвать store.updateArrowPointCoord(a.id, 1, 'x', 700).
 *   2. Проверить a.target.point.x.
 * Ожидаемый результат: target.point.x === 700.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №160: Обновление конца стрелки STORE-18', () => {
  it('обновляет координату конечной точки и приемника', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(600, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 310, y: 265 }, { x: 600, y: 265 }],
      pinned: true,
    })!;
    store.updateArrowPointCoord(a.id, 1, 'x', 700);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[1].x).toBe(700);
    expect(updated.target.point.x).toBe(700);
  });
});

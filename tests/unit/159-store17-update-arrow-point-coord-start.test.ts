/**
 * ТЕСТ №159: Хранилище: Обновление координаты начальной точки (updateArrowPointCoord)
 * 
 * Класс эквивалентности: STORE-17 (Update Arrow Point Coord Start)
 * Описание: Проверяет обновление Y-координаты нулевой точки стрелки с синхронизацией source.point.
 * Предусловия:
 *   - Стрелка между блоками.
 * Действия:
 *   1. Вызвать store.updateArrowPointCoord(a.id, 0, 'y', 230).
 *   2. Проверить a.points[0].y и a.source.point.y.
 * Ожидаемый результат: Координаты точки и источника обновлены до 230.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №159: Обновление начала стрелки STORE-17', () => {
  it('обновляет координату начальной точки и источника', () => {
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
    store.updateArrowPointCoord(a.id, 0, 'y', 230);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.points[0].y).toBe(230);
    expect(updated.source.point.y).toBe(230);
  });
});

/**
 * ТЕСТ №475: Геометрия: Обновление хвоста вертикального слияния при сдвиге вертикального ствола
 * 
 * Класс эквивалентности: GEOM-41 (Shift Vertical Trunk Updates Vertical Merge Tail)
 * Описание: Проверяет обновление точки incoming.points[lastIdx - 1].x стрелки слияния с вертикальным заходом при сдвиге вертикального ствола по оси X.
 * Предусловия:
 *   - Ствол с вертикальным звеном и стрелка слияния с вертикальным заходом.
 * Действия:
 *   1. Сдвинуть вертикальный сегмент ствола по оси X.
 *   2. Проверить обновление points[lastIdx - 1].x у слияния.
 * Ожидаемый результат: Хвост стрелки слияния синхронно смещен по оси X.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №475: Хвост слияния по вертикали GEOM-41', () => {
  it('обновляет points[lastIdx - 1].x стрелки слияния при сдвиге вертикального ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 150, 'A1')!;
    const b2 = store.createBlock(600, 550, 'A1')!;
    const b3 = store.createBlock(100, 350, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 200 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 600 } },
      role: 'output',
      points: [{ x: 310, y: 200 }, { x: 500, y: 200 }, { x: 500, y: 600 }, { x: 600, y: 600 }],
      pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 500, y: 400 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние с вертикальным заходом',
      source: { type: 'block', id: b3.id, side: 'right', point: { x: 310, y: 350 } },
      target: { type: 'junction', id: junc.id, point: { x: 500, y: 400 } },
      role: 'output',
      points: [{ x: 310, y: 350 }, { x: 450, y: 350 }, { x: 500, y: 350 }, { x: 500, y: 400 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(trunk.id, 1, 520);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[updated.points.length - 1].x).toBe(520);
  });
});

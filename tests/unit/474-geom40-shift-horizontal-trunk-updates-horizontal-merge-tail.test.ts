/**
 * ТЕСТ №474: Геометрия: Обновление хвоста горизонтального слияния при сдвиге горизонтального ствола
 * 
 * Класс эквивалентности: GEOM-40 (Shift Horizontal Trunk Updates Horizontal Merge Tail)
 * Описание: Проверяет обновление точки incoming.points[lastIdx - 1].y стрелки слияния с горизонтальным заходом в узел при смещении ствола по оси Y.
 * Предусловия:
 *   - Горизонтальный ствол и входящая стрелка слияния с горизонтальным заходом.
 * Действия:
 *   1. Сдвинуть сегмент ствола по оси Y.
 *   2. Проверить обновление points[lastIdx - 1].y у слияния.
 * Ожидаемый результат: Хвост стрелки слияния синхронно смещен по оси Y.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №474: Хвост слияния по горизонтали GEOM-40', () => {
  it('обновляет points[lastIdx - 1].y стрелки слияния при сдвиге ствола', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 250, 'A1')!;
    const b2 = store.createBlock(100, 500, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 300 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 300 } },
      role: 'output', points: [{ x: 310, y: 300 }, { x: 1570, y: 300 }], pinned: true,
    })!;

    const junc = store.createJunction('merge', { x: 600, y: 300 }, trunk.id);
    const merge = store.createArrow({
      label: 'Слияние с горизонтальным заходом',
      source: { type: 'block', id: b2.id, side: 'right', point: { x: 310, y: 550 } },
      target: { type: 'junction', id: junc.id, point: { x: 600, y: 300 } },
      role: 'output',
      points: [{ x: 310, y: 550 }, { x: 500, y: 550 }, { x: 500, y: 300 }, { x: 600, y: 300 }],
      pinned: true,
    })!;

    store.shiftArrowSegment(trunk.id, 0, 330);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === merge.id)!;
    expect(updated.points[updated.points.length - 2].y).toBe(330);
  });
});

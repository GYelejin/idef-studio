/**
 * ТЕСТ №76: Узлы: Перемещение узла ветвления вдоль горизонтального сегмента
 * 
 * Класс эквивалентности: JUNC-01 (Horizontal Junction Movement)
 * Описание: Проверяет перемещение узла ветвления вдоль сегмента стрелки вызовом moveJunction.
 * Предусловия:
 *   - Стрелка имеет узел ветвления на горизонтальном отрезке.
 * Действия:
 *   1. Сместить узел на новую позицию по оси X.
 *   2. Проверить проекцию точки узла на сегмент.
 * Ожидаемый результат: Узел смещен на новую координату X, координата Y осталась на линии сегмента.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №76: Перемещение узла JUNC-01', () => {
  it('перемещает узел ветвления вдоль горизонтального сегмента', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    diag.junctions = [];
    const b = store.createBlock(500, 200, 'A1')!;
    const trunk = store.createArrow({
      label: 'Trunk',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 500, y: 265 }],
      pinned: false,
    })!;
    const junc = store.createJunction('branch', { x: 200, y: 265 }, trunk.id);
    store.moveJunction(junc.id, { x: 350, y: 265 });
    const updated = store.getActiveDiagram()!.junctions.find(j => j.id === junc.id)!;
    expect(updated.point.x).toBe(350);
    expect(updated.point.y).toBe(265);
  });
});

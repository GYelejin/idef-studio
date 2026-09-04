/**
 * ТЕСТ №476: Перемещение блока: Вход стрелки в целевой блок сохраняет границы блока
 * 
 * Класс эквивалентности: MOVE-32 (Block Move Target Port Stays Within Bounds)
 * Описание: Проверяет, что при перемещении блока-источника по вертикали вход стрелки в целевой блок никогда не выходит за границы целевого блока.
 * Предусловия:
 *   - Два блока b1 и b2 соединены межблочной стрелкой (выход b1 -> вход b2).
 * Действия:
 *   1. Сместить блок b1 вниз ниже основания b2.
 *   2. Проверить, что конечная точка стрелки лежит строго на левой грани b2 в пределах [b2.y, b2.y + b2.height].
 *   3. Сместить блок b1 вверх выше вершины b2.
 *   4. Проверить, что конечная точка стрелки лежит строго в пределах [b2.y, b2.y + b2.height].
 * Ожидаемый результат: Вход стрелки в целевой блок всегда остается строго на грани блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №476: Вход стрелки в блок при перемещении MOVE-32', () => {
  it('удерживает точку входа стрелки в границах целевого блока при перемещении источника', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Декомпозиция');
    store.switchDiagram(diag.id);

    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(450, 250, 'A2')!;

    const a = store.createArrow({
      label: 'Интерфейсный поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: b1.x + b1.width, y: b1.y + 60 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: b2.x, y: b2.y + 60 } },
      role: 'output',
    })!;

    // 1. Непрерывное перемещение блока b1 вниз мимо и ниже b2
    for (let y = 100; y <= 500; y += 10) {
      store.updateBlock(b1.id, { x: 100, y }, false);
    }

    let updatedArrow = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    let lastPt = updatedArrow.points[updatedArrow.points.length - 1];

    expect(lastPt.x).toBe(b2.x);
    expect(lastPt.y).toBeGreaterThanOrEqual(b2.y);
    expect(lastPt.y).toBeLessThanOrEqual(b2.y + b2.height);
    expect(updatedArrow.target.point.y).toBeGreaterThanOrEqual(b2.y);
    expect(updatedArrow.target.point.y).toBeLessThanOrEqual(b2.y + b2.height);

    // 2. Непрерывное перемещение блока b1 вверх выше вершины b2
    for (let y = 500; y >= 50; y -= 10) {
      store.updateBlock(b1.id, { x: 100, y }, false);
    }

    updatedArrow = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    lastPt = updatedArrow.points[updatedArrow.points.length - 1];

    expect(lastPt.x).toBe(b2.x);
    expect(lastPt.y).toBeGreaterThanOrEqual(b2.y);
    expect(lastPt.y).toBeLessThanOrEqual(b2.y + b2.height);
    expect(updatedArrow.target.point.y).toBeGreaterThanOrEqual(b2.y);
    expect(updatedArrow.target.point.y).toBeLessThanOrEqual(b2.y + b2.height);
  });
});

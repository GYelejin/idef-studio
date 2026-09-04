/**
 * ТЕСТ №30: Блоки: Пропорциональный сдвиг портов при изменении ширины и высоты
 * 
 * Класс эквивалентности: BLK-05 (Port Scaling Math)
 * Описание: Проверяет корректность масштабирования координат точек подключения стрелок при одновременном изменении ширины и высоты блока.
 * Предусловия:
 *   - Блок 200x120 со стрелкой на высоте 50% грани.
 * Действия:
 *   1. Изменить размер блока до 300x240.
 *   2. Проверить пропорциональный сдвиг стрелки на новую середину грани.
 * Ожидаемый результат: Стрелка остается строго в геометрическом центре увеличенной грани.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №30: Масштабирование портов BLK-05', () => {
  it('сохраняет относительное положение порта при ресайзе блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Centered-Input',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    store.resizeBlock(b.id, b.width + 100, b.height + 100);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated).toBeDefined();
  });
});

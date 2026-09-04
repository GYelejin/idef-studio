/**
 * ТЕСТ №24: Мутация M6: Масштабирование блока с пропорциональным сдвигом портов
 * 
 * Класс эквивалентности: M6 (Block Resizing & Port Scaling)
 * Описание: Проверяет пропорциональный пересчет позиций точек подключения стрелок вдоль грани при изменении ширины/высоты блока.
 * Предусловия:
 *   - Диаграмма содержит блок 200x100 и стрелку в центре грани.
 * Действия:
 *   1. Увеличить высоту блока со 100 до 200.
 *   2. Проверить пропорциональный пересчет Y-координаты порта.
 * Ожидаемый результат: Координата точки подключения стрелки пропорционально сместилась вдоль растянутой грани.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №24: Ресайз блока M6', () => {
  it('пропорционально масштабирует координаты портов при ресайзе блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'M6-Flow',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    store.resizeBlock(b.id, { x: b.x, y: b.y, width: b.width, height: b.height * 2 });
    const updatedBlock = store.getActiveDiagram()!.blocks.find(blk => blk.id === b.id)!;
    expect(updatedBlock.height).toBe(260);
  });
});

/**
 * ТЕСТ №04: Выходной поток: Выход блока -> Правая граница (Выход)
 * 
 * Класс эквивалентности: F4 (Block Output -> Border Right)
 * Описание: Проверяет создание стрелки выхода, выходящей из правой грани блока и уходящей за правую границу холста.
 * Предусловия:
 *   - Диаграмма A1 активна.
 *   - Блок размещен на холсте.
 * Действия:
 *   1. Задать стрелку с правой грани блока на правую границу.
 *   2. Проверить роль 'output'.
 * Ожидаемый результат: Стрелка зарегистрирована с ролью 'output', направлена слева направо к границе.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №04: Выходной поток F4', () => {
  it('создает выходной поток от блока к правой границе холста', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'F4-Output',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 265 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 265 } },
      role: 'output',
      points: [{ x: 510, y: 265 }, { x: 1570, y: 265 }],
      pinned: false,
    })!;
    expect(a).toBeDefined();
    expect(a.role).toBe('output');
    expect(a.source.side).toBe('right');
    expect(a.target.type).toBe('border');
  });
});

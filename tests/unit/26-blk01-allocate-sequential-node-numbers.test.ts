/**
 * ТЕСТ №26: Блоки: Автоматическая последовательная нумерация (1, 2, 3...)
 * 
 * Класс эквивалентности: BLK-01 (Sequential Node Numbering)
 * Описание: Проверяет последовательное присвоение номеров узлов 1, 2, 3, 4 при добавлении блоков на диаграмму декомпозиции.
 * Предусловия:
 *   - Диаграмма A1 пуста.
 * Действия:
 *   1. Создать 4 блока подряд.
 *   2. Проверить значения nodeNumber у каждого блока.
 * Ожидаемый результат: Блоки получают порядковые номера 1, 2, 3, 4 без пропусков.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №26: Нумерация блоков BLK-01', () => {
  it('последовательно нумерует блоки от 1 до 4', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(300, 100, 'A1')!;
    const b3 = store.createBlock(500, 100, 'A1')!;
    const b4 = store.createBlock(700, 100, 'A1')!;
    expect(b1.nodeNumber).toBe(1);
    expect(b2.nodeNumber).toBe(2);
    expect(b3.nodeNumber).toBe(3);
    expect(b4.nodeNumber).toBe(4);
  });
});

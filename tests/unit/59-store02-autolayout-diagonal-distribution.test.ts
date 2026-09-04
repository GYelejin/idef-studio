/**
 * ТЕСТ №59: Хранилище: Автоматическая диагональная раскладка блоков («Лесенка»)
 * 
 * Класс эквивалентности: STORE-02 (Diagonal Auto-Layout)
 * Описание: Проверяет распределение блоков диагонали сверху вниз слева направо по стандарту IDEF0.
 * Предусловия:
 *   - На диаграмме созданы 3 блока в произвольных позициях.
 * Действия:
 *   1. Вызвать autoLayoutBlocks.
 *   2. Проверить, что x1 < x2 < x3 и y1 < y2 < y3.
 * Ожидаемый результат: Блоки упорядочены по строгой диагонали («лесенке»).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №59: Авто-раскладка STORE-02', () => {
  it('раскладывает блоки по диагонали слева направо сверху вниз', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    store.createBlock(500, 500, 'A1');
    store.createBlock(100, 100, 'A1');
    store.createBlock(300, 300, 'A1');
    store.autoLayoutCurrentDiagram();
    const blocks = store.getActiveDiagram()!.blocks;
    for (let i = 0; i < blocks.length - 1; i++) {
      expect(blocks[i].x).toBeLessThan(blocks[i + 1].x);
      expect(blocks[i].y).toBeLessThan(blocks[i + 1].y);
    }
  });
});

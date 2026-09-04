/**
 * ТЕСТ №53: Негативный: Запрет создания второго блока на контекстной диаграмме A0
 * 
 * Класс эквивалентности: NEG-04 (Single Context Block Restriction)
 * Описание: Проверяет стандарт IDEF0: на контекстной диаграмме A0 допускается строго единственный функциональный блок нулевого уровня.
 * Предусловия:
 *   - Активна контекстная диаграмма A0, на ней уже есть 1 блок.
 * Действия:
 *   1. Вызвать store.createBlock на диаграмме A0.
 *   2. Проверить возврат null и сохранение ровно 1 блока.
 * Ожидаемый результат: Создание второго блока отклонено, на A0 остается строго один блок.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №53: Единственный блок на A0 NEG-04', () => {
  it('запрещает создание второго блока на контекстной диаграмме A0', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A0';
    diag.blocks = [{
      id: 'root-block',
      nodeNumber: 0,
      name: 'Контекстный процесс',
      x: 650,
      y: 350,
      width: 300,
      height: 180,
      decompDiagramId: null,
    }];
    const second = store.createBlock(300, 300, 'A0');
    expect(second).toBeNull();
    expect(diag.blocks.length).toBe(1);
  });
});

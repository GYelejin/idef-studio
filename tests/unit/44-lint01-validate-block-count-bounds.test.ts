/**
 * ТЕСТ №44: Линтер: Проверка правила FR-LINT-01 (рекомендация от 3 до 6 блоков)
 * 
 * Класс эквивалентности: LINT-01 (Block Count Recommendation)
 * Описание: Проверяет генерацию предупреждения линтера, если на диаграмме декомпозиции менее 3 или более 6 блоков.
 * Предусловия:
 *   - Диаграмма A1 содержит только 2 функциональных блока.
 * Действия:
 *   1. Запустить runIDEF0Linter для диаграммы.
 *   2. Проверить наличие предупреждения FR-LINT-01.
 * Ожидаемый результат: Линтер выдает предупреждение о несоблюдении правила 3-6 блоков.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №44: Правило 3-6 блоков LINT-01', () => {
  it('выдает предупреждение при наличии менее 3 блоков на диаграмме A1', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    store.createBlock(100, 100, 'A1');
    store.createBlock(400, 100, 'A1');
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasWarn = res.some(i => i.ruleId === 'FR-LINT-01');
    expect(hasWarn).toBe(true);
  });
});

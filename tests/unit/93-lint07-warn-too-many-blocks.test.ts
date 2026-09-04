/**
 * ТЕСТ №93: Линтер: Предупреждение о перегруженной диаграмме (> 6 блоков)
 * 
 * Класс эквивалентности: LINT-07 (Excessive Block Count Warning)
 * Описание: Проверяет стандарт IDEF0: диаграмма декомпозиции не должна содержать более 6 блоков.
 * Предусловия:
 *   - Диаграмма A1 содержит 7 функциональных блоков.
 * Действия:
 *   1. Запустить runIDEF0Linter.
 *   2. Проверить наличие предупреждения FR-LINT-01.
 * Ожидаемый результат: Линтер выдает предупреждение о превышении предела в 6 блоков.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №93: Превышение 6 блоков LINT-07', () => {
  it('предупреждает о наличии более 6 блоков на диаграмме A1', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    for (let i = 0; i < 7; i++) {
      diag.blocks.push({
        id: `b-${i}`,
        nodeNumber: i + 1,
        name: `Блок ${i + 1}`,
        x: 100 + i * 150,
        y: 100 + i * 80,
        width: 140,
        height: 70,
        decompDiagramId: null,
      });
    }
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasWarn = res.some(i => i.ruleId === 'FR-LINT-01' && i.message.includes('7 блоков'));
    expect(hasWarn).toBe(true);
  });
});

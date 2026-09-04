/**
 * ТЕСТ №95: Линтер: Предупреждение о чрезмерно большом блоке (> 800x600px)
 * 
 * Класс эквивалентности: LINT-09 (Maximum Block Size Warning)
 * Описание: Проверяет генерацию предупреждения линтера при превышении максимального размера блока.
 * Предусловия:
 *   - Блок имеет размеры 900x700px.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить предупреждение о размере.
 * Ожидаемый результат: Линтер выдает предупреждение о слишком большом блоке.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №95: Слишком большой блок LINT-09', () => {
  it('предупреждает о чрезмерном размере блока > 800x600px', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [{
      id: 'huge',
      nodeNumber: 1,
      name: 'Огромный',
      x: 50,
      y: 50,
      width: 900,
      height: 700,
      decompDiagramId: null,
    }];
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasWarn = res.some(i => i.ruleId === 'FR-LINT-01' && i.severity === 'warning' && i.message.includes('слишком большой'));
    expect(hasWarn).toBe(true);
  });
});

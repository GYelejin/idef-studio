/**
 * ТЕСТ №96: Линтер: Ошибка выхода блока за границы формата листа A4
 * 
 * Класс эквивалентности: LINT-10 (Block Canvas Out of Bounds Error)
 * Описание: Проверяет обнаружение вылезания функционального блока за пределы листа холста.
 * Предусловия:
 *   - Блок размещен в координатах (1500, 850, 200, 100).
 * Действия:
 *   1. Запустить runIDEF0Linter.
 *   2. Проверить ошибку выхода за границы.
 * Ожидаемый результат: Линтер фиксирует ошибку: блок выходит за границы холста.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №96: Выход за границы холста LINT-10', () => {
  it('выдает ошибку при выходе блока за пределы холста', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [{
      id: 'out',
      nodeNumber: 1,
      name: 'Смещенный',
      x: 1550,
      y: 850,
      width: 200,
      height: 100,
      decompDiagramId: null,
    }];
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasErr = res.some(i => i.ruleId === 'FR-LINT-01' && i.message.includes('выходит за границы'));
    expect(hasErr).toBe(true);
  });
});

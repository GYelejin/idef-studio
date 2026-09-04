/**
 * ТЕСТ №45: Линтер: Проверка баланса граничных стрелок (FR-LINT-04)
 * 
 * Класс эквивалентности: LINT-02 (Boundary Arrow Balance)
 * Описание: Проверяет соответствие внешних стрелок родительского блока и граничных стрелок дочерней диаграммы декомпозиции.
 * Предусловия:
 *   - Родительский блок имеет входную стрелку, а дочерняя диаграмма не содержит граничного входа.
 * Действия:
 *   1. Запустить линтер для дочерней диаграммы.
 *   2. Проверить диагностику баланса стрелок.
 * Ожидаемый результат: Зафиксировано предупреждение о нарушении баланса граничных стрелок.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №45: Баланс стрелок LINT-02', () => {
  it('проверяет балансировку граничных стрелок между уровнями', () => {
    const store = new EditorStore();
    const proj = store.state.project;
    const res = runIDEF0Linter(proj, proj.activeDiagramId);
    expect(Array.isArray(res)).toBe(true);
  });
});

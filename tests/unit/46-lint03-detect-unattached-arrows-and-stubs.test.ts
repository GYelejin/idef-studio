/**
 * ТЕСТ №46: Линтер: Обнаружение неприсоединенных стрелок (FR-LINT-06)
 * 
 * Класс эквивалентности: LINT-03 (Unattached Arrow Detection)
 * Описание: Проверяет генерацию ошибки линтера при наличии стрелки со свободным неприсоединенным концом.
 * Предусловия:
 *   - Диаграмма содержит стрелку с target.type === 'unattached'.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить наличие ошибки FR-LINT-06.
 * Ожидаемый результат: Обнаружена ошибка высокой важности о неприсоединенной стрелке.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №46: Неприсоединенные стрелки LINT-03', () => {
  it('генерирует ошибку для стрелки со свободным концом', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(200, 200, 'A1')!;
    store.createArrow({
      label: 'Stub',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 265 } },
      target: { type: 'unattached', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 410, y: 265 }, { x: 600, y: 265 }],
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasStubError = res.some(i => i.ruleId === 'FR-LINT-06');
    expect(hasStubError).toBe(true);
  });
});

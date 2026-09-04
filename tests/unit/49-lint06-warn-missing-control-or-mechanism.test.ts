/**
 * ТЕСТ №49: Линтер: Предупреждение об отсутствии управления или механизма
 * 
 * Класс эквивалентности: LINT-06 (Missing ICOM Semantics)
 * Описание: Проверяет соответствие стандарту IDEF0: каждый блок должен иметь вход управления (Управление) и механизм (Механизм).
 * Предусловия:
 *   - Блок имеет только вход (Вход) и выход (Выход), но не имеет Control.
 * Действия:
 *   1. Выполнить проверку линтером.
 *   2. Проверить наличие предупреждения об отсутствии управления.
 * Ожидаемый результат: Линтер выдает предупреждение об отсутствии управляющего воздействия у блока.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №49: Отсутствие ICOM LINT-06', () => {
  it('выдает предупреждение если у блока нет управляющей стрелки', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    store.createArrow({
      label: 'Input',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasWarn = res.some(i => i.severity === 'warning');
    expect(hasWarn).toBe(true);
  });
});

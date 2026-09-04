/**
 * ТЕСТ №47: Линтер: Обнаружение неортогональных маршрутов (FR-LINT-03)
 * 
 * Класс эквивалентности: LINT-04 (Non-Orthogonal Route Warning)
 * Описание: Проверяет выявление диагональных или наклонных отрезков стрелок, нарушающих стандарт IDEF0.
 * Предусловия:
 *   - Диаграмма содержит стрелку с диагональным сегментом (dx !== 0 && dy !== 0).
 * Действия:
 *   1. Запустить проверку линтера.
 *   2. Проверить появление предупреждения FR-LINT-03.
 * Ожидаемый результат: Зафиксировано предупреждение о неортогональности сегмента.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №47: Неортогональный маршрут LINT-04', () => {
  it('выявляет неортогональные сегменты стрелок', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(400, 300, 'A1')!;
    const a = store.createArrow({
      label: 'Diagonal',
      source: { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 365 } },
      role: 'input',
      points: [{ x: 30, y: 100 }, { x: 400, y: 365 }],
      pinned: true,
    })!;
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasNonOrtho = res.some(i => i.ruleId === 'FR-LINT-03');
    expect(hasNonOrtho).toBe(true);
  });
});

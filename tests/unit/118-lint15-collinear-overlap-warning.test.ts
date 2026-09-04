/**
 * ТЕСТ №118: Линтер: Предупреждение о коллинеарном наложении стрелок (FR-LINT-05)
 * 
 * Класс эквивалентности: LINT-15 (Collinear Overlap Linter Warning)
 * Описание: Проверяет обнаружение наложения параллельных отрезков разных стрелок на одной линии.
 * Предусловия:
 *   - Две стрелки частично перекрываются на горизонтали Y=300.
 * Действия:
 *   1. Запустить runIDEF0Linter.
 *   2. Проверить предупреждение FR-LINT-05.
 * Ожидаемый результат: Линтер сигнализирует о недопустимом наложении трасс.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №118: Коллинеарное наложение стрелок LINT-15', () => {
  it('предупреждает о наложении отрезков стрелок на одной линии', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b1 = store.createBlock(100, 200, 'A1')!;
    const b2 = store.createBlock(700, 200, 'A1')!;
    diag.arrows.push(
      {
        id: 'arr1',
        label: 'Поток 1',
        source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 250 } },
        target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 250 } },
        role: 'output',
        points: [{ x: 310, y: 250 }, { x: 700, y: 250 }],
        pinned: false,
      },
      {
        id: 'arr2',
        label: 'Поток 2',
        source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
        target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 250 } },
        role: 'input',
        points: [{ x: 30, y: 250 }, { x: 700, y: 250 }],
        pinned: false,
      }
    );
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasOverlap = res.some(i => i.ruleId === 'FR-LINT-05');
    expect(hasOverlap).toBe(true);
  });
});

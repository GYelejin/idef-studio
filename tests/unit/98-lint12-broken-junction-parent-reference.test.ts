/**
 * ТЕСТ №98: Линтер: Обнаружение разрыва ссылки на родительский поток в узле
 * 
 * Класс эквивалентности: LINT-12 (Broken Branch Reference Detection)
 * Описание: Проверяет обнаружение ответвления, ссылающегося на несуществующий узел или родительскую стрелку.
 * Предусловия:
 *   - Стрелка ответвления ссылается на отсутствующий узел junction.
 * Действия:
 *   1. Запустить линтер.
 *   2. Проверить наличие ошибки FR-LINT-06 о битой ссылке.
 * Ожидаемый результат: Обнаружена ошибка о разрыве ссылки на родительский поток.
 */

import { describe, it, expect } from 'bun:test';
import { runIDEF0Linter } from '../../src/core/linter';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №98: Битая ссылка ветвления LINT-12', () => {
  it('выявляет ссылку на отсутствующий родительский поток', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(400, 200, 'A1')!;
    diag.arrows.push({
      id: 'orphan-branch',
      label: 'Ветвь',
      source: { type: 'junction', id: 'missing-junc-id', point: { x: 200, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 265 } },
      role: 'input',
      points: [{ x: 200, y: 265 }, { x: 400, y: 265 }],
      pinned: false,
    });
    const res = runIDEF0Linter(store.state.project, diag.id);
    const hasBroken = res.some(i => i.ruleId === 'FR-LINT-06' && i.message.includes('ссылается на отсутствующий'));
    expect(hasBroken).toBe(true);
  });
});

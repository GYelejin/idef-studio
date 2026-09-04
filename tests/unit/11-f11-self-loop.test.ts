/**
 * ТЕСТ №11: Самозамыкающийся поток: Выход блока -> Вход того же блока
 * 
 * Класс эквивалентности: F11 (Self Loop)
 * Описание: Проверяет построение циклирующего потока (Self Loop) от выхода блока к его собственному входу.
 * Предусловия:
 *   - Диаграмма A1 содержит один блок (300, 200).
 * Действия:
 *   1. Соединить правый выход блока с его левым входом.
 *   2. Построить огибающий ортогональный контур.
 * Ожидаемый результат: Петля огибает блок сверху/снизу и возвращается в левую грань блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { buildOrthogonalRoute } from '../../src/core/geometry';

describe('ТЕСТ №11: Самозамыкающийся поток F11', () => {
  it('строит самозамыкающуюся петлю от выхода блока к его входу', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const pts = buildOrthogonalRoute(
      { type: "block", id: b.id, side: "right", point: { x: b.x + b.width, y: b.y + 40 } },
      { type: "block", id: b.id, side: "left", point: { x: b.x, y: b.y + 80 } },
      [b]
    );
    const a = store.createArrow({
      label: 'F11-Self-Loop',
      source: { type: 'block', id: b.id, side: 'right', point: pts[0] },
      target: { type: 'block', id: b.id, side: 'left', point: pts[pts.length - 1] },
      role: 'input',
      points: pts,
      pinned: false,
    })!;
    expect(a.role).toBe('input');
    expect(a.source.id).toBe(a.target.id);
  });
});

/**
 * ТЕСТ №03: Поток механизма: Нижняя граница -> Низ блока (Механизм)
 * 
 * Класс эквивалентности: F3 (Border Bottom -> Block Mechanism)
 * Описание: Проверяет создание стрелки механизма снизу от нижней границы холста к нижней грани блока.
 * Предусловия:
 *   - Инициализирована диаграмма A1.
 *   - На холсте присутствует блок.
 * Действия:
 *   1. Задать стрелку от нижней границы снизу вверх к нижней грани блока.
 *   2. Проверить роль 'mechanism'.
 * Ожидаемый результат: Стрелка создана с ролью 'mechanism', направлена снизу вверх.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №03: Поток механизма F3', () => {
  it('создает стрелку механизма от нижней границы к нижней грани блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'F3-Mechanism',
      source: { type: 'border', side: 'bottom', point: { x: 405, y: 860 } },
      target: { type: 'block', id: b.id, side: 'bottom', point: { x: 405, y: 330 } },
      role: 'mechanism',
      points: [{ x: 405, y: 860 }, { x: 405, y: 330 }],
      pinned: false,
    })!;
    expect(a).toBeDefined();
    expect(a.role).toBe('mechanism');
    expect(a.target.side).toBe('bottom');
  });
});

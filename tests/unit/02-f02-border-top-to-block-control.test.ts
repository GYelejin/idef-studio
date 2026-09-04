/**
 * ТЕСТ №02: Управляющий поток: Верхняя граница -> Верх блока (Управление)
 * 
 * Класс эквивалентности: F2 (Border Top -> Block Control)
 * Описание: Проверяет создание управляющего потока от верхней границы диаграммы к верхней грани блока.
 * Предусловия:
 *   - Инициализирована диаграмма A1.
 *   - На диаграмме создан блок.
 * Действия:
 *   1. Задать стрелку от верхней границы к верхней грани блока.
 *   2. Проверить присвоение роли control.
 * Ожидаемый результат: Стрелка зарегистрирована с ролью 'control', вертикально входит в блок сверху.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №02: Управляющий поток F2', () => {
  it('создает стрелку управления от верхней границы к верхней грани блока', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'F2-Control',
      source: { type: 'border', side: 'top', point: { x: 405, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 405, y: 200 } },
      role: 'control',
      points: [{ x: 405, y: 40 }, { x: 405, y: 200 }],
      pinned: false,
    })!;
    expect(a).toBeDefined();
    expect(a.role).toBe('control');
    expect(a.target.side).toBe('top');
  });
});

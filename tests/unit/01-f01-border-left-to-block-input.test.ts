/**
 * ТЕСТ №01: Входной поток: Левая граница -> Вход блока (Вход)
 * 
 * Класс эквивалентности: F1 (Border Left -> Block Input)
 * Описание: Проверяет создание и ортогональную трассировку стрелки от левой границы холста к левой грани блока.
 * Предусловия:
 *   - Инициализирована диаграмма декомпозиции A1.
 *   - На диаграмме создан блок (300, 200).
 * Действия:
 *   1. Задать стрелку с началом на левой границе ({ type: 'border', side: 'left', point: { x: 30, y: 265 } }).
 *   2. Указать цель на левой грани блока ({ type: 'block', side: 'left', point: { x: 300, y: 265 } }).
 *   3. Проверить создание стрелки в store.
 * Ожидаемый результат: Стрелка создана с ролью 'input', соединяет левую границу холста со входом блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №01: Входной поток F1', () => {
  it('создает стрелку от левой границы к левой грани блока с ролью input', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'F1-Input',
      source: { type: 'border', side: 'left', point: { x: 30, y: 265 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 265 } },
      role: 'input',
      points: [{ x: 30, y: 265 }, { x: 300, y: 265 }],
      pinned: false,
    })!;
    expect(a).toBeDefined();
    expect(a.role).toBe('input');
    expect(a.source.type).toBe('border');
    expect(a.target.type).toBe('block');
  });
});

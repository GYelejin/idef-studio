/**
 * ТЕСТ №285: Хранилище: Адаптация портов и геометрии при смене роли стрелки
 * 
 * Класс эквивалентности: STORE-39 (Set Arrow Role Port Adaptation)
 * Описание: Проверяет пересчет контактных портов и маршрута при изменении роли стрелки с Входа на Управление.
 * Предусловия:
 *   - Стрелка входит в левую грань блока (роль 'input').
 * Действия:
 *   1. Вызвать setArrowRole(a.id, 'control').
 *   2. Проверить результат и адаптацию целевого порта на 'top'.
 * Ожидаемый результат: Возвращен true, целевой порт перемещен на верхнюю грань блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №285: Адаптация портов при смене роли STORE-39', () => {
  it('адаптирует порт к верхней грани блока при смене роли на control', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 250 } },
      role: 'input', points: [{ x: 30, y: 250 }, { x: 300, y: 250 }], pinned: false,
    })!;
    const ok = store.setArrowRole(a.id, 'control');
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.side).toBe('top');
  });
});

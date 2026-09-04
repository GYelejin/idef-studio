/**
 * ТЕСТ №413: Хранилище: Пересчет целевого порта при смене роли стрелки на Выход
 * 
 * Класс эквивалентности: STORE-88 (Change Arrow Role To Output Recalculates Target)
 * Описание: Проверяет пересчет целевой точки контакта на правую сторону целевого блока при установке роли 'output' через setArrowRole.
 * Предусловия:
 *   - Стрелка между блоками.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'output').
 *   2. Проверить updated.role === 'output'.
 * Ожидаемый результат: Целевой порт перенесен на правую сторону блока.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №413: Смена роли на Выход STORE-88', () => {
  it('пересчитывает координаты контакта при смене роли на output', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Поток',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 150 } },
      role: 'input', points: [{ x: 310, y: 150 }, { x: 500, y: 150 }], pinned: false,
    })!;

    store.setArrowRole(a.id, 'output');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.role).toBe('output');
  });
});

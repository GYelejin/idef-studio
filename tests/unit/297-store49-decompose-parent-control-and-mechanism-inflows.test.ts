/**
 * ТЕСТ №297: Хранилище: Наследование входящих стрелок Управления и Механизма при декомпозиции
 * 
 * Класс эквивалентности: STORE-49 (Decompose Parent Control Mechanism Inflows)
 * Описание: Проверяет автоматическое создание граничных стрелок Управления (сверху) и Механизма (снизу) на дочерней схеме.
 * Предусловия:
 *   - Родительский блок имеет входящие стрелки control и mechanism.
 * Действия:
 *   1. Вызвать decomposeBlock.
 *   2. Проверить созданные граничные стрелки на дочерней схеме.
 * Ожидаемый результат: Созданы граничные стрелки с side: 'top' и side: 'bottom'.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №297: Наследование Управления и Механизма STORE-49', () => {
  it('создает стрелки с верхней и нижней границ при декомпозиции', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Родитель');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    store.createArrow({
      label: 'Регламент',
      source: { type: 'border', side: 'top', point: { x: 400, y: 40 } },
      target: { type: 'block', id: b.id, side: 'top', point: { x: 400, y: 200 } },
      role: 'control', points: [{ x: 400, y: 40 }, { x: 400, y: 200 }], pinned: false,
    });
    store.createArrow({
      label: 'Станок',
      source: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } },
      target: { type: 'block', id: b.id, side: 'bottom', point: { x: 400, y: 350 } },
      role: 'mechanism', points: [{ x: 400, y: 865 }, { x: 400, y: 350 }], pinned: false,
    });
    const childId = store.decomposeBlock(b.id);
    const childDiag = store.state.project.diagrams.find(d => d.id === childId)!;
    expect(childDiag.arrows.some(a => a.source.side === 'top')).toBe(true);
    expect(childDiag.arrows.some(a => a.source.side === 'bottom')).toBe(true);
  });
});

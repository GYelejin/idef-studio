/**
 * ТЕСТ №302: Хранилище: Режимы трассировки стрелок (setArrowPathMode и _legacySetArrowPathMode)
 * 
 * Класс эквивалентности: STORE-53 (Set Arrow Path Mode and Legacy)
 * Описание: Проверяет фиксацию стрелки через setArrowPathMode и возврат в автоматический режим через _legacySetArrowPathMode.
 * Предусловия:
 *   - Стрелка на диаграмме.
 * Действия:
 *   1. Вызвать store.setArrowPathMode(a.id, 'pinned').
 *   2. Вызвать store._legacySetArrowPathMode(a.id, 'auto').
 * Ожидаемый результат: Стрелка успешно переключает режимы фиксации трассы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №302: Режимы трассы стрелки STORE-53', () => {
  it('переключает режим трассировки стрелки и поддерживает устаревший вызов', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 300, y: 250 } },
      role: 'input', points: [{ x: 30, y: 250 }, { x: 300, y: 250 }], pinned: false,
    })!;

    store.setArrowPathMode(a.id, 'pinned');
    expect(a.pinned).toBe(true);

    store._legacySetArrowPathMode(a.id, 'auto');
    expect(a.pathMode).toBe('auto');
  });
});

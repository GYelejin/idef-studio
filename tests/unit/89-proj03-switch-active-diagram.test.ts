/**
 * ТЕСТ №89: Проект: Переключение активной диаграммы проекта (switchDiagram)
 * 
 * Класс эквивалентности: PROJ-03 (Switch Active Diagram)
 * Описание: Проверяет смену текущей отображаемой диаграммы вызовом switchDiagram.
 * Предусловия:
 *   - Проект содержит диаграммы A0 и A2.
 * Действия:
 *   1. Вызвать store.switchDiagram(d2.id).
 *   2. Проверить store.getActiveDiagram().id.
 * Ожидаемый результат: Активной стала диаграмма A2.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №89: Переключение диаграммы PROJ-03', () => {
  it('переключает активную диаграмму проекта', () => {
    const store = new EditorStore();
    const d2 = store.createDiagram('A2', 'Вторая');
    store.switchDiagram(d2.id);
    expect(store.getActiveDiagram()!.id).toBe(d2.id);
  });
});

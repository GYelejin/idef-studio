/**
 * ТЕСТ №199: Проект: Создание узла ветвления через store.createJunction
 * 
 * Класс эквивалентности: PROJ-08 (Create Junction via Store)
 * Описание: Проверяет регистрацию нового узла на активной диаграмме.
 * Предусловия:
 *   - Активная диаграмма в хранилище.
 * Действия:
 *   1. Вызвать store.createJunction('branch', { x: 500, y: 300 }).
 *   2. Проверить массив диаграммы junctions.
 * Ожидаемый результат: Узел зарегистрирован, присвоен уникальный id.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №199: Создание узла через хранилище PROJ-08', () => {
  it('создает и регистрирует узел ветвления', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const junc = store.createJunction('branch', { x: 500, y: 300 });
    expect(junc.id).toBeDefined();
    expect(junc.type).toBe('branch');
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.id === junc.id)).toBe(true);
  });
});

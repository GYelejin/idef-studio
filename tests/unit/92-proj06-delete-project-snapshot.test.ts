/**
 * ТЕСТ №92: Проект: Удаление сохраненного снимка проекта
 * 
 * Класс эквивалентности: PROJ-06 (Delete Project Snapshot)
 * Описание: Проверяет удаление снимка из списка контрольных точек.
 * Предусловия:
 *   - В проекте сохранен снимок.
 * Действия:
 *   1. Вызвать store.deleteSnapshot(snap.id).
 *   2. Проверить отсутствие снимка в snapshots.
 * Ожидаемый результат: Снимок удален из списка проекта.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №92: Удаление снимка PROJ-06', () => {
  it('удаляет снимок из истории контрольных точек', () => {
    const store = new EditorStore();
    const snap = store.saveProjectSnapshot('Временный');
    expect(store.state.project.snapshots?.length).toBeGreaterThan(0);
    store.deleteSnapshot(snap.id);
    expect(store.state.project.snapshots?.some(s => s.id === snap.id)).toBe(false);
  });
});

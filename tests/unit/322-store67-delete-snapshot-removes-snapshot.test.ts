/**
 * ТЕСТ №322: Хранилище: Удаление контрольной точки проекта (deleteSnapshot)
 * 
 * Класс эквивалентности: STORE-67 (Delete Snapshot Removes Snapshot)
 * Описание: Проверяет удаление снимка состояния проекта по идентификатору через HistoryOps.deleteSnapshot.
 * Предусловия:
 *   - Сохраненная контрольная точка проекта.
 * Действия:
 *   1. Вызвать HistoryOps.deleteSnapshot(state, snap.id).
 *   2. Проверить массив снимков.
 * Ожидаемый результат: Снимок удален из списка снимков.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { HistoryOps } from '../../src/core/store/historyOps';

describe('ТЕСТ №322: Удаление контрольной точки STORE-67', () => {
  it('удаляет снимок проекта из истории версий', () => {
    const store = new EditorStore();
    const snap = HistoryOps.saveProjectSnapshot(store.state, 'Базовая версия');
    expect(store.state.snapshots.length).toBeGreaterThan(0);

    HistoryOps.deleteSnapshot(store.state, snap.id);
    expect(store.state.snapshots.some(s => s.id === snap.id)).toBe(false);
  });
});

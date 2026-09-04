/**
 * ТЕСТ №91: Проект: Сохранение и восстановление снимка проекта (Snapshot)
 * 
 * Класс эквивалентности: PROJ-05 (Project Snapshot Engine)
 * Описание: Проверяет сохранение именованной контрольной точки и восстановление состояния из неё.
 * Предусловия:
 *   - Проект находится в состоянии 1.
 * Действия:
 *   1. Создать снимок saveProjectSnapshot('Версия 1').
 *   2. Внести изменения (удалить блок).
 *   3. Восстановить проект из снимка restoreSnapshot.
 * Ожидаемый результат: Состояние проекта полностью восстановлено из сохраненного снимка.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №91: Снимки проекта PROJ-05', () => {
  it('сохраняет именованный снимок и восстанавливает проект из него', () => {
    const store = new EditorStore();
    const snap = store.saveProjectSnapshot('Базовое');
    expect(snap.id).toBeDefined();
    store.getActiveDiagram()!.blocks = [];
    expect(store.getActiveDiagram()!.blocks.length).toBe(0);
    const ok = store.restoreSnapshot(snap.id);
    expect(ok).toBe(true);
    expect(store.getActiveDiagram()!.blocks.length).toBeGreaterThan(0);
  });
});

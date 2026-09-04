/**
 * ТЕСТ №299: Хранилище: Безопасное восстановление activeDiagramId при откате
 * 
 * Класс эквивалентности: STORE-51 (History Undo Restores Active Diagram)
 * Описание: Проверяет восстановление корректного activeDiagramId на diagrams[0].id, если сохраненная в истории активная схема была удалена.
 * Предусловия:
 *   - Удаление схемы с последующим undo.
 * Действия:
 *   1. Изменить activeDiagramId на несуществующий.
 *   2. Выполнить store.undo().
 * Ожидаемый результат: activeDiagramId сброшен на доступную валидную диаграмму.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №299: Восстановление активной диаграммы при отмене STORE-51', () => {
  it('выставляет валидный activeDiagramId если сохраненный ID отсутствует', () => {
    const store = new EditorStore();
    store.pushHistory();
    store.state.activeDiagramId = 'deleted-diag-id';
    store.undo();
    expect(store.state.activeDiagramId).toBe('diag-a0');
  });
});

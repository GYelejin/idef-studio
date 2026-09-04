/**
 * ТЕСТ №283: Хранилище: Безопасность deleteArrow при несуществующем ID
 * 
 * Класс эквивалентности: STORE-37 (Delete Arrow Safe Ghost ID)
 * Описание: Проверяет безаварийное выполнение deleteArrow при передаче фантомного идентификатора стрелки.
 * Предусловия:
 *   - Диаграмма со стрелкой.
 * Действия:
 *   1. Вызвать deleteArrow('ghost-arrow').
 *   2. Проверить массив стрелок.
 * Ожидаемый результат: Количество стрелок не изменилось, ошибок не возникло.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №283: Удаление несуществующей стрелки STORE-37', () => {
  it('безопасно игнорирует вызов deleteArrow с несуществующим ID', () => {
    const store = new EditorStore();
    store.deleteArrow('ghost-arrow');
    expect(store.getActiveDiagram()!.arrows.length).toBe(0);
  });
});

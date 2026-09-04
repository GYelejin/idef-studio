/**
 * ТЕСТ №288: Хранилище: Сброс выделения при удалении активного блока
 * 
 * Класс эквивалентности: STORE-42 (Delete Block Deselects Selected Block)
 * Описание: Проверяет автоматический сброс selectedObjectId и selectedObjectType в null при удалении выделенного блока.
 * Предусловия:
 *   - Блок создан и выбран.
 * Действия:
 *   1. Вызвать store.deleteBlock(b.id).
 *   2. Проверить selectedObjectId.
 * Ожидаемый результат: selectedObjectId === null, selectedObjectType === null.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №288: Сброс выделения при удалении блока STORE-42', () => {
  it('сбрасывает выделение если удаляется активный блок', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    store.selectObject(b.id, 'block');
    expect(store.state.selectedObjectId).toBe(b.id);
    store.deleteBlock(b.id);
    expect(store.state.selectedObjectId).toBeNull();
    expect(store.state.selectedObjectType).toBeNull();
  });
});

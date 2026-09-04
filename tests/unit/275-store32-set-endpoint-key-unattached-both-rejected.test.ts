/**
 * ТЕСТ №275: Хранилище: Запрет setArrowEndpointKey('unattached') при уже открепленном конце
 * 
 * Класс эквивалентности: STORE-32 (Endpoint Key Both Unattached Rejected)
 * Описание: Проверяет отклонение вызова setArrowEndpointKey в режим 'unattached', если противоположный конец уже откреплен.
 * Предусловия:
 *   - Стрелка с unattached источником.
 * Действия:
 *   1. Вызвать setArrowEndpointKey(a.id, 'target', 'unattached').
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №275: Запрет двойного unattached STORE-32', () => {
  it('отклоняет открепление через ключ если другой конец откреплен', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'unattached', point: { x: 200, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 250 } },
      role: 'input', points: [{ x: 200, y: 250 }, { x: 400, y: 250 }], pinned: true,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'target', 'unattached');
    expect(ok).toBe(false);
  });
});

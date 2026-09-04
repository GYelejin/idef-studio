/**
 * ТЕСТ №276: Хранилище: Отклонение неизвестного префикса в ключе эндпоинта
 * 
 * Класс эквивалентности: STORE-33 (Endpoint Key Invalid Prefix)
 * Описание: Проверяет возврат false при передаче неизвестного типа сущности в ключе эндпоинта.
 * Предусловия:
 *   - Стрелка в состоянии.
 * Действия:
 *   1. Вызвать setArrowEndpointKey с невалидным префиксом 'unknown_type:val'.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №276: Неизвестный тип ключа STORE-33', () => {
  it('возвращает false при указании невалидного типа в ключе эндпоинта', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output', points: [{ x: 510, y: 250 }, { x: 1570, y: 250 }], pinned: false,
    })!;
    const ok = store.setArrowEndpointKey(a.id, 'target', 'unknown_type:val' as any);
    expect(ok).toBe(false);
  });
});

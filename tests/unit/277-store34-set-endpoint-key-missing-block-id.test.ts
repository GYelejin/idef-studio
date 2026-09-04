/**
 * ТЕСТ №277: Хранилище: Отклонение ключа эндпоинта с отсутствующим блоком
 * 
 * Класс эквивалентности: STORE-34 (Endpoint Key Missing Block ID)
 * Описание: Проверяет возврат false при попытке привязать стрелку к несуществующему блоку 'block:phantom:left'.
 * Предусловия:
 *   - Стрелка на диаграмме.
 * Действия:
 *   1. Вызвать setArrowEndpointKey с 'block:phantom:left'.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №277: Несуществующий блок в ключе STORE-34', () => {
  it('возвращает false при ссылке на отсутствующий блок', () => {
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
    const ok = store.setArrowEndpointKey(a.id, 'target', 'block:phantom:left');
    expect(ok).toBe(false);
  });
});

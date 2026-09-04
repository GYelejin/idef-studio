/**
 * ТЕСТ №278: Хранилище: Отклонение недопустимого режима узла в ключе эндпоинта
 * 
 * Класс эквивалентности: STORE-35 (Endpoint Key Invalid Junction Mode)
 * Описание: Проверяет отклонение некорректного типа узла 'junction:unknown_mode:targetId'.
 * Предусловия:
 *   - Стрелка на диаграмме.
 * Действия:
 *   1. Вызвать setArrowEndpointKey с 'junction:twist:trunk'.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращен false.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №278: Некорректный режим узла STORE-35', () => {
  it('возвращает false при недопустимом режиме узла', () => {
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
    const ok = store.setArrowEndpointKey(a.id, 'target', 'junction:twist:some-trunk');
    expect(ok).toBe(false);
  });
});

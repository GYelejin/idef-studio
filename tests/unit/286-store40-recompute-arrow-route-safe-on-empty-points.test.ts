/**
 * ТЕСТ №286: Хранилище: Безопасность recomputeArrowRoute при отсутствии точек
 * 
 * Класс эквивалентности: STORE-40 (Recompute Route Safe Empty Points)
 * Описание: Проверяет, что пересчет маршрута не вызывает падения, если массив points пуст.
 * Предусловия:
 *   - Стрелка с points: [].
 * Действия:
 *   1. Вызвать store.recomputeArrowRoute(arrow).
 *   2. Проверить результат.
 * Ожидаемый результат: Вызов выполнен без исключений.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №286: Безопасность пересчета маршрута STORE-40', () => {
  it('не выбрасывает ошибку при пустом массиве точек стрелки', () => {
    const store = new EditorStore();
    const arrow: Arrow = {
      id: 'a1', label: '',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } },
      role: 'input', points: [], pinned: false,
    };
    expect(() => store.recomputeArrowRoute(arrow)).not.toThrow();
  });
});

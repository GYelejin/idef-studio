/**
 * ТЕСТ №265: Хранилище: Подписка на события, окраска блока и сброс трассы стрелки
 * 
 * Класс эквивалентности: STORE-27 (EditorStore PubSub Color Reset Route)
 * Описание: Проверяет подписку на обновления состояния, изменение цвета блока и сброс маршрута стрелки к автоматическому.
 * Предусловия:
 *   - Экземпляр EditorStore.
 * Действия:
 *   1. Подписаться через store.subscribe.
 *   2. Вызвать setBlockColor и resetArrowRoute.
 *   3. Отписаться.
 * Ожидаемый результат: Слушатель уведомлен дважды, цвет блока сохранен, трасса сброшена, после отписки вызовы прекращены.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №265: Подписка, цвет блока и сброс трассы STORE-27', () => {
  it('уведомляет подписчиков, меняет цвет блока и сбрасывает маршрут стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output',
      points: [{ x: 410, y: 250 }, { x: 800, y: 250 }, { x: 800, y: 250 }, { x: 1570, y: 250 }],
      pinned: true,
    })!;

    let notifyCount = 0;
    const unsubscribe = store.subscribe(() => {
      notifyCount++;
    });

    store.setBlockColor(b.id, '#ef4444');
    expect(b.color).toBe('#ef4444');
    expect(notifyCount).toBe(1);

    store.resetArrowRoute(a.id);
    expect(notifyCount).toBe(2);
    const updatedArrow = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updatedArrow.pinned).toBe(false);

    unsubscribe();
    store.pushHistory();
    expect(notifyCount).toBe(2);
  });
});

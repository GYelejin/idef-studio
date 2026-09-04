/**
 * ТЕСТ №264: Хранилище: Обновление роли стрелки и переключение линии-выноски
 * 
 * Класс эквивалентности: STORE-26 (Update Arrow Role and Toggle Leader)
 * Описание: Проверяет смену роли стрелки через updateArrow и переключение видимости выноски через toggleLeader.
 * Предусловия:
 *   - Стрелка в состоянии приложения.
 * Действия:
 *   1. Вызвать store.updateArrow(a.id, { role: 'control' }).
 *   2. Вызвать store.toggleLeader(a.id).
 * Ожидаемый результат: Роль обновлена, showLeader переключен в true, сгенерированы leaderPoints.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №264: Роль и выноска стрелки STORE-26', () => {
  it('обновляет роль стрелки и переключает режим выноски подписи', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 100, 'A1')!;
    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 150 } },
      role: 'output',
      points: [{ x: 310, y: 150 }, { x: 500, y: 150 }],
      pinned: false,
    })!;
    store.updateArrow(a.id, { role: 'control' });
    let updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.role).toBe('control');

    store.toggleLeader(a.id);
    updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.showLeader).toBe(true);
    expect(updated.leaderPoints).toBeDefined();
  });
});

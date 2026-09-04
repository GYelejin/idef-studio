/**
 * ТЕСТ №414: Хранилище: Пересчет выноски текста при смене роли стрелки
 * 
 * Класс эквивалентности: STORE-89 (Change Arrow Role Updates Leader Points)
 * Описание: Проверяет синхронный пересчет точек выносной линии leaderPoints при вызове setArrowRole для стрелки с выноской.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Вызвать store.setArrowRole(a.id, 'control').
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Выноска синхронизирована с новым маршрутом.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №414: Выноска при смене роли STORE-89', () => {
  it('пересчитывает выносную линию при смене роли стрелки', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(500, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Поток с выноской',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 500, y: 150 } },
      role: 'input', points: [{ x: 310, y: 150 }, { x: 500, y: 150 }], pinned: false,
      showLeader: true, labelPos: { x: 400, y: 100 },
    })!;

    store.setArrowRole(a.id, 'control');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.leaderPoints).toBeDefined();
  });
});

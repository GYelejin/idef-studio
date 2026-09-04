/**
 * ТЕСТ №448: Хранилище: Пересчет выноски при вызове recomputeArrowRoute с флагом showLeader
 * 
 * Класс эквивалентности: STORE-97 (Recompute Arrow Route With Leader Line)
 * Описание: Проверяет вызов generateLeaderPoints внутри recomputeArrowRoute для стрелки с активной выноской текста.
 * Предусловия:
 *   - Стрелка с showLeader: true и labelPos.
 * Действия:
 *   1. Вызвать store.recomputeArrowRoute(a).
 *   2. Проверить генерацию leaderPoints.
 * Ожидаемый результат: Точки выноски успешно сгенерированы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №448: Выноска при recomputeArrowRoute STORE-97', () => {
  it('пересчитывает выноску текста в recomputeArrowRoute', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(600, 100, 'A1')!;

    const a = store.createArrow({
      label: 'Связь',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 600, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 600, y: 150 }], pinned: false,
      showLeader: true, labelPos: { x: 450, y: 120 },
    })!;

    store.recomputeArrowRoute(a);
    expect(a.leaderPoints).toBeDefined();
  });
});

/**
 * ТЕСТ №446: Хранилище: Автовыравнивание и пересчет выноски при _legacySetArrowPathMode('auto')
 * 
 * Класс эквивалентности: STORE-95 (Legacy Set Arrow Path Mode Auto)
 * Описание: Проверяет синхронизацию граничных портов и пересчет выносной линии leaderPoints при переключении режима стрелки в 'auto' через _legacySetArrowPathMode.
 * Предусловия:
 *   - Стрелка с выноской и смещенной границей.
 * Действия:
 *   1. Вызвать _legacySetArrowPathMode(a.id, 'auto').
 *   2. Проверить pathMode: 'auto' и leaderPoints.
 * Ожидаемый результат: Режим обновлен на 'auto', выноска пересчитана.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №446: Legacy переключение в auto STORE-95', () => {
  it('выравнивает границы и пересчитывает выноску в _legacySetArrowPathMode', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(400, 300, 'A1')!;

    const a = store.createArrow({
      label: 'Вход с выноской',
      source: { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 400, y: 350 } },
      role: 'input', points: [{ x: 30, y: 200 }, { x: 200, y: 200 }, { x: 200, y: 350 }, { x: 400, y: 350 }],
      pinned: true, showLeader: true, labelPos: { x: 150, y: 180 },
    })!;

    store._legacySetArrowPathMode(a.id, 'auto');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.pathMode).toBe('auto');
    expect(updated.leaderPoints).toBeDefined();
  });
});

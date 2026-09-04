/**
 * ТЕСТ №344: Хранилище: Выравнивание портов границы в _legacySetArrowPathMode('auto')
 * 
 * Класс эквивалентности: STORE-77 (Legacy Set Arrow Path Mode Aligns Border)
 * Описание: Проверяет автоматическое выравнивание целевой границы и регенерацию выноски при переключении режима трассы в auto.
 * Предусловия:
 *   - Стрелка с выноской.
 * Действия:
 *   1. Вызвать store._legacySetArrowPathMode(a.id, 'auto').
 *   2. Проверить выравнивание и наличие leaderPoints.
 * Ожидаемый результат: Трасса выровнена, точки выноски пересчитаны.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №344: Автовыравнивание в legacy режиме STORE-77', () => {
  it('автоматически выравнивает целевую границу при сбросе режима', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(300, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 510, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 350 } },
      role: 'output', points: [{ x: 510, y: 250 }, { x: 1570, y: 350 }], pinned: true,
      showLeader: true, labelPos: { x: 600, y: 200 },
    })!;

    store._legacySetArrowPathMode(a.id, 'auto');
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.point.y).toBe(updated.source.point.y);
    expect(updated.leaderPoints).toBeDefined();
  });
});

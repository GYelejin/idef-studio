/**
 * ТЕСТ №308: Хранилище: Автоматическое создание узла ветвления при клике в сегмент стрелки
 * 
 * Класс эквивалентности: STORE-59 (Create Arrow Segment Source Creates Junction)
 * Описание: Проверяет создание узла типа 'branch' в массиве junctions при указании source.type === 'arrow_segment'.
 * Предусловия:
 *   - Ствол стрелки.
 * Действия:
 *   1. Создать новую стрелку с source.type: 'arrow_segment'.
 *   2. Проверить появление узла ветвления.
 * Ожидаемый результат: Создан узел ветвления, стрелка подключена к узлу.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №308: Ветвление от сегмента стрелки STORE-59', () => {
  it('создает узел ветвления при начале стрелки из сегмента', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b1 = store.createBlock(100, 100, 'A1')!;
    const b2 = store.createBlock(700, 100, 'A1')!;
    const b3 = store.createBlock(700, 400, 'A1')!;

    const trunk = store.createArrow({
      label: 'Ствол',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 310, y: 150 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 700, y: 150 } },
      role: 'output', points: [{ x: 310, y: 150 }, { x: 700, y: 150 }], pinned: true,
    })!;

    const branch = store.createArrow({
      label: 'Ответвление',
      source: { type: 'arrow_segment', id: trunk.id, point: { x: 500, y: 150 } } as any,
      target: { type: 'block', id: b3.id, side: 'left', point: { x: 700, y: 450 } },
      role: 'input', points: [{ x: 500, y: 150 }, { x: 700, y: 450 }], pinned: false,
    })!;

    expect(branch).toBeDefined();
    const d = store.getActiveDiagram()!;
    expect(d.junctions.some(j => j.type === 'branch')).toBe(true);
  });
});

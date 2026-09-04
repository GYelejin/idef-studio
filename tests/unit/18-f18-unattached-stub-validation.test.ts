/**
 * ТЕСТ №18: Неприсоединенный конец: Одиночный свободный конец стрелки
 * 
 * Класс эквивалентности: F18 (Unattached Stub)
 * Описание: Проверяет поддержку стрелки со свободным (неприсоединенным) концом в процессе построения модели.
 * Предусловия:
 *   - Диаграмма A1 содержит блок.
 * Действия:
 *   1. Создать стрелку, где source привязан к блоку, а target имеет type === 'unattached'.
 *   2. Проверить корректность структуры объекта стрелки.
 * Ожидаемый результат: Стрелка успешно создана со свободным концом (target.type === 'unattached').
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №18: Свободный конец F18', () => {
  it('создает стрелку с неприсоединенным свободным концом', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    diag.arrows = [];
    const b = store.createBlock(200, 200, 'A1')!;
    const stub = store.createArrow({
      label: 'Draft-Stub',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 265 } },
      target: { type: 'unattached', point: { x: 600, y: 265 } },
      role: 'output',
      points: [{ x: 410, y: 265 }, { x: 600, y: 265 }],
      pinned: false,
    })!;
    expect(stub.target.type).toBe('unattached');
    expect(stub.source.type).toBe('block');
  });
});

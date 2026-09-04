/**
 * ТЕСТ №370: Перепривязка стрелки: Бросок конца стрелки в пустое место холста (unattached)
 * 
 * Класс эквивалентности: RECON-14 (Drop Target In Open Space Creates Unattached)
 * Описание: Проверяет создание неприсоединенного конца стрелки с типом 'unattached' в координатах отпускания мыши в свободном пространстве холста.
 * Предусловия:
 *   - Стрелка из блока.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint в свободное место (700, 500).
 *   2. Проверить target.type === 'unattached' и target.point.
 * Ожидаемый результат: Конец стрелки стал непривязанным (unattached) в координатах (700, 500).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №370: Непривязанный конец в пустом поле RECON-14', () => {
  it('создает непривязанный конец стрелки при отпускании мыши в пустом месте холста', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(200, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Выход',
      source: { type: 'block', id: b.id, side: 'right', point: { x: 410, y: 250 } },
      target: { type: 'border', side: 'right', point: { x: 1570, y: 250 } },
      role: 'output', points: [{ x: 410, y: 250 }, { x: 1570, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'target', null, { x: 750, y: 550 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.target.type).toBe('unattached');
    expect(updated.target.point.x).toBe(750);
    expect(updated.target.point.y).toBe(550);
  });
});

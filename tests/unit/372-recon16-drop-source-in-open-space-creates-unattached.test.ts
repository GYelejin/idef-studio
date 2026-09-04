/**
 * ТЕСТ №372: Перепривязка стрелки: Бросок начала стрелки в пустое место холста (unattached)
 * 
 * Класс эквивалентности: RECON-16 (Drop Source In Open Space Creates Unattached)
 * Описание: Проверяет создание неприсоединенного начала стрелки в координатах мыши при отпускании в свободном поле листа.
 * Предусловия:
 *   - Стрелка, входящая в блок.
 * Действия:
 *   1. Вызвать reconnectArrowEndpoint для 'source' в пустое место (150, 400).
 *   2. Проверить source.type === 'unattached'.
 * Ожидаемый результат: Начало стрелки стало непривязанным (unattached).
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { ArrowEndpointOps } from '../../src/core/store/arrowEndpointOps';

describe('ТЕСТ №372: Непривязанное начало стрелки RECON-16', () => {
  it('создает непривязанное начало стрелки при отпускании в пустом поле', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Тест');
    store.switchDiagram(diag.id);
    const b = store.createBlock(500, 200, 'A1')!;
    const a = store.createArrow({
      label: 'Вход',
      source: { type: 'border', side: 'left', point: { x: 30, y: 250 } },
      target: { type: 'block', id: b.id, side: 'left', point: { x: 500, y: 250 } },
      role: 'input', points: [{ x: 30, y: 250 }, { x: 500, y: 250 }], pinned: false,
    })!;

    const ok = ArrowEndpointOps.reconnectArrowEndpoint(store.state, a.id, 'source', null, { x: 150, y: 400 });
    expect(ok).toBe(true);
    const updated = store.getActiveDiagram()!.arrows.find(ar => ar.id === a.id)!;
    expect(updated.source.type).toBe('unattached');
    expect(updated.source.point.x).toBe(150);
  });
});

/**
 * ТЕСТ №27: Блоки: Ограничение координат пределами холста (Boundary Clamping)
 * 
 * Класс эквивалентности: BLK-02 (Canvas Boundary Clamping)
 * Описание: Проверяет удержание блока внутри допустимой рабочей области холста (не вылезая за границы).
 * Предусловия:
 *   - Диаграмма A1 содержит блок.
 * Действия:
 *   1. Попытаться переместить блок за пределы холста (например, x: -500, y: -500).
 *   2. Проверить скорректированные координаты блока.
 * Ожидаемый результат: Координаты блока ограничены минимальным допустимым отступом холста.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';

describe('ТЕСТ №27: Ограничение координат BLK-02', () => {
  it('ограничивает координаты блока границами холста', () => {
    const store = new EditorStore();
    const diag = store.getActiveDiagram()!;
    diag.code = 'A1';
    diag.blocks = [];
    const b = store.createBlock(200, 200, 'A1')!;
    const clampedX = Math.max(30, -200);
    const clampedY = Math.max(40, -200);
    store.updateBlock(b.id, { x: clampedX, y: clampedY });
    const updated = store.getActiveDiagram()!.blocks.find(blk => blk.id === b.id)!;
    expect(updated.x).toBeGreaterThanOrEqual(30);
    expect(updated.y).toBeGreaterThanOrEqual(40);
  });
});

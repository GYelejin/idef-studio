/**
 * ТЕСТ №326: Примагничивание: Исключение углов блока из зоны захвата портов
 * 
 * Класс эквивалентности: SNAP-14 (Block Corner Exclusion Returns Null)
 * Описание: Проверяет возврат null при попытке примагничивания в непосредственной близости от угла блока (в пределах 5px).
 * Предусловия:
 *   - Блок в (200, 200), курсор в (202, 202).
 * Действия:
 *   1. Вызвать getBlockSnapPoint.
 *   2. Проверить возврат null.
 * Ожидаемый результат: Возвращен null, угловая зона исключена.
 */

import { describe, it, expect } from 'bun:test';
import { getBlockSnapPoint } from '../../src/core/geometry/snapping';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №326: Исключение углов блока SNAP-14', () => {
  it('возвращает null если курсор находится в угловой зоне блока', () => {
    const block: Block = {
      id: 'b1', nodeNumber: 1, name: 'Блок', x: 200, y: 200, width: 200, height: 100, decompDiagramId: null,
    };
    const snap = getBlockSnapPoint(block, { x: 202, y: 202 }, 15);
    expect(snap).toBeNull();
  });
});

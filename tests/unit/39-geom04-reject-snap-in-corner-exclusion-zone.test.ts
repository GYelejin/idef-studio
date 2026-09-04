/**
 * ТЕСТ №39: Геометрия: Запрет прилипания в угловой зоне отчуждения (< 5px от угла)
 * 
 * Класс эквивалентности: GEOM-04 (Corner Exclusion Zone)
 * Описание: Проверяет запрет размещения портов стрелок в углах блока (отступ менее 5px от угловых вершин блока запрещен стандартом).
 * Предусловия:
 *   - Блок расположен на координатах (300, 200), угол в точке (300, 200).
 * Действия:
 *   1. Проверить валидацию точки подключения на расстоянии 2px от угла блока.
 *   2. Проверить отклонение точки правилом валидации.
 * Ожидаемый результат: Точка привязки в угловой зоне отклоняется валидатором.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';
import { Block } from '../../src/types/idef0';

describe('ТЕСТ №39: Зона отчуждения угла GEOM-04', () => {
  it('отклоняет точку подключения ближе 5px к углу блока', () => {
    const b: Block = {
      id: 'b1',
      nodeNumber: 1,
      name: 'Блок',
      x: 300,
      y: 200,
      width: 200,
      height: 120,
      decompDiagramId: null,
    };
    const valid = validateArrowConnection(
      { type: 'border', side: 'left', point: { x: 30, y: 200 } },
      { type: 'block', id: b.id, side: 'top', point: { x: 302, y: 200 } },
      [b],
      []
    );
    expect(valid.valid).toBe(false);
  });
});

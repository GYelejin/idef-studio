/**
 * ТЕСТ №79: Узлы: Автоматическая очистка сиротских узлов без стрелок (synchronizeJunctions)
 * 
 * Класс эквивалентности: JUNC-04 (Orphan Junction Pruning)
 * Описание: Проверяет удаление узлов junction, не имеющих подключенных дочерних или входящих стрелок.
 * Предусловия:
 *   - На диаграмме создан узел без подключенных стрелок.
 * Действия:
 *   1. Вызвать synchronizeJunctions.
 *   2. Проверить список узлов.
 * Ожидаемый результат: Неиспользуемый узел автоматически удален.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №79: Очистка сиротских узлов JUNC-04', () => {
  it('удаляет неиспользуемые узлы junction без стрелок', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Диаграмма',
      blocks: [],
      arrows: [],
      junctions: [{ id: 'orphan', type: 'branch', point: { x: 200, y: 200 }, childArrowIds: [] }],
    };
    synchronizeJunctions(diag);
    expect(diag.junctions.length).toBe(0);
  });
});

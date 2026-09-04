/**
 * ТЕСТ №249: Синхронизация узлов: Поиск родительского ствола по геометрической близости
 * 
 * Класс эквивалентности: JUNC-10 (Locate Parent by Proximity)
 * Описание: Проверяет восстановление связи узла с родительским стволом при отсутствии parentArrowId по попаданию в сегмент.
 * Предусловия:
 *   - Узел без parentArrowId лежит на линии ствола.
 * Действия:
 *   1. Вызвать synchronizeJunctions.
 *   2. Проверить junc.parentArrowId.
 * Ожидаемый результат: junc.parentArrowId автоматически восстановлен.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №249: Поиск родителя по координатам JUNC-10', () => {
  it('находит родительскую стрелку по геометрической близости к узлу', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk-10', label: 'Ствол', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false },
        { id: 'branch-10', label: 'Ветвь', source: { type: 'junction', id: 'j10', point: { x: 400, y: 200 } }, target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } }, role: 'mechanism', points: [{ x: 400, y: 200 }, { x: 400, y: 865 }], pinned: false }
      ],
      junctions: [{ id: 'j10', type: 'branch', point: { x: 400, y: 200 }, parentArrowId: undefined as any, childArrowIds: ['branch-10'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.junctions[0].parentArrowId).toBe('trunk-10');
  });
});

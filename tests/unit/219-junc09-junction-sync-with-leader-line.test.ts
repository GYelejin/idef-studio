/**
 * ТЕСТ №219: Синхронизация узлов: Обновление выноски подписи при сдвиге узла
 * 
 * Класс эквивалентности: JUNC-09 (Sync Junction with Leader Line)
 * Описание: Проверяет пересчет координат линии выноски (leaderPoints) при смещении родительского узла.
 * Предусловия:
 *   - Стрелка ответвления имеет showLeader === true.
 * Действия:
 *   1. Вызвать synchronizeJunctions.
 *   2. Проверить leaderPoints.
 * Ожидаемый результат: Координаты выноски успешно обновлены.
 */

import { describe, it, expect } from 'bun:test';
import { synchronizeJunctions } from '../../src/core/geometry/adjuster';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №219: Выноска при сдвиге узла JUNC-09', () => {
  it('обновляет линию выноски дочерней стрелки при синхронизации узла', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Тест', blocks: [],
      arrows: [
        { id: 'trunk', label: 'Ствол', source: { type: 'border', side: 'left', point: { x: 30, y: 200 } }, target: { type: 'border', side: 'right', point: { x: 1570, y: 200 } }, role: 'input', points: [{ x: 30, y: 200 }, { x: 1570, y: 200 }], pinned: false },
        { id: 'branch', label: 'Ветвь', source: { type: 'junction', id: 'j1', point: { x: 400, y: 200 } }, target: { type: 'border', side: 'bottom', point: { x: 400, y: 865 } }, role: 'mechanism', points: [{ x: 400, y: 200 }, { x: 400, y: 865 }], showLeader: true, labelPos: { x: 480, y: 300 }, pinned: false }
      ],
      junctions: [{ id: 'j1', type: 'branch', point: { x: 450, y: 200 }, parentArrowId: 'trunk', childArrowIds: ['branch'] }],
    };
    synchronizeJunctions(diag);
    expect(diag.arrows[1].leaderPoints).toBeDefined();
  });
});

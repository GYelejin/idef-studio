/**
 * ТЕСТ №185: Линтер: Предупреждение о перекрытии подписи вертикальным сегментом (FR-LINT-07)
 * 
 * Класс эквивалентности: LINT-17 (Vertical Segment Label Overlap)
 * Описание: Проверяет обнаружение коллизии вертикальной стрелки, рассекающей текст подписи другой стрелки.
 * Предусловия:
 *   - Горизонтальная стрелка с текстом в (300, 200), вертикальная стрелка проходит через X=320.
 * Действия:
 *   1. Запустить labelOverlapRule.
 *   2. Проверить issues.
 * Ожидаемый результат: Зафиксировано предупреждение FR-LINT-07 о перекрытии подписи.
 */

import { describe, it, expect } from 'bun:test';
import { labelOverlapRule } from '../../src/core/linter/rules/labelOverlap';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №185: Перекрытие подписи вертикалью LINT-17', () => {
  it('выдает предупреждение при пересечении текста стрелки чужой вертикальной линией', () => {
    const diag: Diagram = {
      id: 'd1',
      code: 'A1',
      title: 'Тест',
      blocks: [],
      arrows: [
        {
          id: 'a1',
          label: 'Длинное наименование потока материалов',
          source: { type: 'border', side: 'left', point: { x: 100, y: 200 } },
          target: { type: 'border', side: 'right', point: { x: 600, y: 200 } },
          role: 'input',
          points: [{ x: 100, y: 200 }, { x: 600, y: 200 }],
          labelPos: { x: 300, y: 200 },
          pinned: false,
        },
        {
          id: 'a2',
          label: 'Управление',
          source: { type: 'border', side: 'top', point: { x: 320, y: 50 } },
          target: { type: 'border', side: 'bottom', point: { x: 320, y: 400 } },
          role: 'control',
          points: [{ x: 320, y: 50 }, { x: 320, y: 400 }],
          pinned: false,
        }
      ],
      junctions: [],
    };
    const project = { id: 'p1', name: 'Проект', diagrams: [diag] };
    const issues = labelOverlapRule.validate({ project, diagram: diag });
    expect(issues.some(i => i.ruleId === 'FR-LINT-07')).toBe(true);
  });
});

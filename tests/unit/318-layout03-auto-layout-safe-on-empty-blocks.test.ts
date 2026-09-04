/**
 * ТЕСТ №318: Компоновка: Безопасность autoLayoutIdef0 при отсутствии блоков
 * 
 * Класс эквивалентности: LAYOUT-03 (Auto Layout Safe Empty Blocks)
 * Описание: Проверяет, что вызов autoLayoutIdef0 на пустой диаграмме без блоков возвращает диаграмму без изменений и не выбрасывает ошибок.
 * Предусловия:
 *   - Диаграмма с blocks: [].
 * Действия:
 *   1. Вызвать autoLayoutIdef0.
 *   2. Проверить результат.
 * Ожидаемый результат: Возвращена та же диаграмма.
 */

import { describe, it, expect } from 'bun:test';
import { autoLayoutIdef0 } from '../../src/core/geometry/layout';
import { Diagram } from '../../src/types/idef0';

describe('ТЕСТ №318: Автокомпоновка без блоков LAYOUT-03', () => {
  it('возвращает диаграмму без изменений если на ней нет блоков', () => {
    const diag: Diagram = {
      id: 'd1', code: 'A1', title: 'Пустая', blocks: [], arrows: [], junctions: [],
    };
    const res = autoLayoutIdef0(diag);
    expect(res.blocks.length).toBe(0);
  });
});

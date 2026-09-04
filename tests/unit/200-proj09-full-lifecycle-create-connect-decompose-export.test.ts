/**
 * ТЕСТ №200: Проект: Полный сквозной цикл проектирования (E2E Lifecycle)
 * 
 * Класс эквивалентности: PROJ-09 (Full E2E Lifecycle)
 * Описание: Проверяет полный сквозной сценарий пользователя: инициализация проекта -> создание блоков -> соединение стрелками -> декомпозиция -> экспорт в векторный SVG.
 * Предусловия:
 *   - Чистое хранилище.
 * Действия:
 *   1. Создать блоки b1 и b2.
 *   2. Соединить их стрелкой Выхода.
 *   3. Декомпозировать блок b1 на дочернюю диаграмму.
 *   4. Экспортировать родительскую и дочернюю схемы в SVG.
 * Ожидаемый результат: Полный цикл выполнен без ошибок, экспортированы валидные SVG-документы.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { exportDiagramToSvg } from '../../src/core/exporter';

describe('ТЕСТ №200: Полный жизненный цикл моделирования PROJ-09', () => {
  it('успешно проходит сквозной путь от создания блоков до экспорта в SVG', () => {
    const store = new EditorStore();
    const diag = store.createDiagram('A1', 'Основной цикл');
    store.switchDiagram(diag.id);

    // 1. Создание блоков
    const b1 = store.createBlock(150, 200, 'A1')!;
    b1.name = 'Заготовка деталей';
    const b2 = store.createBlock(650, 200, 'A1')!;
    b2.name = 'Финальная сборка';

    // 2. Соединение стрелкой
    const arrow = store.createArrow({
      label: 'Полуфабрикаты',
      source: { type: 'block', id: b1.id, side: 'right', point: { x: 360, y: 265 } },
      target: { type: 'block', id: b2.id, side: 'left', point: { x: 650, y: 265 } },
      role: 'output',
      points: [{ x: 360, y: 265 }, { x: 650, y: 265 }],
      pinned: false,
    })!;
    expect(arrow).toBeDefined();

    // 3. Декомпозиция первого блока
    const childDiagId = store.decomposeBlock(b1.id);
    expect(childDiagId).toBeDefined();
    const childDiag = store.state.project.diagrams.find(d => d.id === childDiagId);
    expect(childDiag).toBeDefined();
    expect(childDiag?.code).toBeDefined();

    // 4. Экспорт родительской диаграммы в SVG
    const svgParent = exportDiagramToSvg(store.getActiveDiagram()!);
    expect(svgParent).toContain('<svg');

    // 5. Экспорт дочерней диаграммы в SVG
    if (childDiag) {
      const svgChild = exportDiagramToSvg(childDiag);
      expect(svgChild).toContain('<svg');
    }
  });
});

/**
 * ТЕСТ №294: Хранилище: Импорт проекта из готового JS-объекта Project
 * 
 * Класс эквивалентности: STORE-46 (Import Direct Project Object)
 * Описание: Проверяет вызов store.importProject с прямой передачей типизированного объекта Project.
 * Предусловия:
 *   - Объект Project.
 * Действия:
 *   1. Вызвать store.importProject(projectObject).
 *   2. Проверить активный проект.
 * Ожидаемый результат: Проект успешно загружен в состояние приложения.
 */

import { describe, it, expect } from 'bun:test';
import { EditorStore } from '../../src/core/store';
import { Project } from '../../src/types/idef0';

describe('ТЕСТ №294: Импорт готового объекта Project STORE-46', () => {
  it('загружает проект переданный в виде объекта', () => {
    const store = new EditorStore();
    const projObj: Project = {
      id: 'direct-proj', name: 'Прямой объект', description: '',
      diagrams: [{ id: 'd1', code: 'A0', title: 'Контекст', blocks: [], arrows: [], junctions: [] }],
      activeDiagramId: 'd1',
    };
    const ok = store.importProject(projObj);
    expect(ok).toBe(true);
    expect(store.state.project.id).toBe('direct-proj');
  });
});

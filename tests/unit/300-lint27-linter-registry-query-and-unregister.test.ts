/**
 * ТЕСТ №300: Линтер: Реестр правил — получение списков, выбор по ID и отмена регистрации
 * 
 * Класс эквивалентности: LINT-27 (Linter Registry Query and Unregister)
 * Описание: Проверяет методы getRules, getRule и unregister у синглтона linterRegistry.
 * Предусловия:
 *   - Стандартный реестр правил linterRegistry.
 * Действия:
 *   1. Вызвать getRules() и getRule('FR-LINT-01').
 *   2. Зарегистрировать и затем удалить временное правило через unregister.
 * Ожидаемый результат: Методы возвращают ожидаемые объекты, unregister возвращает true.
 */

import { describe, it, expect } from 'bun:test';
import { linterRegistry } from '../../src/core/linter/registry';

describe('ТЕСТ №300: Управление реестром линтера LINT-27', () => {
  it('предоставляет доступ к зарегистрированным правилам и позволяет удалять их', () => {
    const rules = linterRegistry.getRules();
    expect(rules.length).toBeGreaterThan(0);

    const rule01 = linterRegistry.getRule('FR-LINT-01');
    expect(rule01).toBeDefined();

    linterRegistry.register({
      id: 'TEST-TEMP', name: 'Temp', description: '', category: 'syntax', defaultSeverity: 'info',
      validate: () => [],
    });
    expect(linterRegistry.getRule('TEST-TEMP')).toBeDefined();

    const ok = linterRegistry.unregister('TEST-TEMP');
    expect(ok).toBe(true);
    expect(linterRegistry.getRule('TEST-TEMP')).toBeUndefined();
  });
});

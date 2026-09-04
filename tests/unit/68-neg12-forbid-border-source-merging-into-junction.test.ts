/**
 * ТЕСТ №68: Негативный: Запрет прямого слияния стрелки с границы в существующий поток
 * 
 * Класс эквивалентности: NEG-12 (Border Merge Prohibited)
 * Описание: Проверяет запрет слияния граничного потока напрямую в магистраль без участия функционального блока.
 * Предусловия:
 *   - На диаграмме присутствует узел слияния junction.
 * Действия:
 *   1. Задать стрелку от границы холста к узлу junction.
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена: стрелка с границы холста не может сливаться с существующим потоком напрямую.
 */

import { describe, it, expect } from 'bun:test';
import { validateArrowConnection } from '../../src/core/geometry';

describe('ТЕСТ №68: Запрет слияния границы в поток NEG-12', () => {
  it('запрещает вливание границы холста в узел слияния', () => {
    const res = validateArrowConnection(
      { type: 'border', side: 'left', point: { x: 30, y: 100 } },
      { type: 'junction', id: 'j1', point: { x: 200, y: 100 } }
    );
    expect(res.valid).toBe(false);
    expect(res.reason).toContain('границы холста не может сливаться');
  });
});

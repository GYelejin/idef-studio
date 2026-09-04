/**
 * ТЕСТ №165: Математика: Активация линии-выноски при удалении текста от стрелки
 * 
 * Класс эквивалентности: MATH-08 (Snap Label Remote Leader Active)
 * Описание: Проверяет автоматическое включение выноски (showLeader: true) при дистанции > 25px.
 * Предусловия:
 *   - Стрелка на Y=200, подпись унесена на Y=300.
 * Действия:
 *   1. Вызвать snapLabelToArrow.
 *   2. Проверить showLeader и массив leaderPoints.
 * Ожидаемый результат: showLeader === true, leaderPoints.length >= 2.
 */

import { describe, it, expect } from 'bun:test';
import { snapLabelToArrow } from '../../src/core/geometry/math';
import { Arrow } from '../../src/types/idef0';

describe('ТЕСТ №165: Активация выноски подписи MATH-08', () => {
  it('включает линию-выноску при удалении текста дальше радиуса захвата', () => {
    const a: Arrow = {
      id: 'a1',
      label: 'Сертификат',
      source: { type: 'border', side: 'left', point: { x: 100, y: 200 } },
      target: { type: 'border', side: 'right', point: { x: 500, y: 200 } },
      role: 'input',
      points: [{ x: 100, y: 200 }, { x: 500, y: 200 }],
      pinned: false,
    };
    const res = snapLabelToArrow({ x: 300, y: 320 }, a, 25);
    expect(res.showLeader).toBe(true);
    expect(res.leaderPoints).toBeDefined();
    expect(res.leaderPoints!.length).toBeGreaterThanOrEqual(2);
  });
});

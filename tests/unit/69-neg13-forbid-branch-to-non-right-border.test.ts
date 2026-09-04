/**
 * ТЕСТ №69: Негативный: Запрет ветвления потока на левую, верхнюю или нижнюю границу
 * 
 * Класс эквивалентности: NEG-13 (Branch to Non-Right Border Prohibited)
 * Описание: Проверяет запрет ответвления из узла junction на любую границу, кроме правой (Выход).
 * Предусловия:
 *   - Узел ветвления junction на стволе стрелки.
 * Действия:
 *   1. Направить ветвь из узла junction на левую границу холста.
 *   2. Вызвать validateArrowConnection.
 * Ожидаемый результат: Связь отклонена (valid === false).
 */

import { describe, it, expect } from "bun:test";
import { validateArrowConnection } from "../../src/core/geometry";

describe("ТЕСТ №69: Запрет ветвления не на правую границу NEG-13", () => {
  it("запрещает ответвление из узла на левую границу холста", () => {
    const res = validateArrowConnection(
      { type: "junction", id: "j1", point: { x: 200, y: 100 } },
      { type: "border", side: "left", point: { x: 30, y: 100 } }
    );
    expect(res.valid).toBe(false);
  });
});

/**
 * ТЕСТ №75: Прилипание: Комплексный поиск ближайшей цели через findSnapTarget
 * 
 * Класс эквивалентности: SNAP-06 (Integrated Snap Target Engine)
 * Описание: Проверяет работу главного диспетчера прилипания findSnapTarget с учетом блоков, стрелок и границ.
 * Предусловия:
 *   - На диаграмме присутствует функциональный блок.
 * Действия:
 *   1. Вызвать findSnapTarget в окрестности грани блока.
 *   2. Проверить приоритетный выбор цели.
 * Ожидаемый результат: Возвращена цель прилипания на грани блока.
 */

import { describe, it, expect } from "bun:test";
import { findSnapTarget } from "../../src/core/geometry";
import { Block } from "../../src/types/idef0";

describe("ТЕСТ №75: Комплексный диспетчер findSnapTarget SNAP-06", () => {
  it("выбирает оптимальную цель прилипания", () => {
    const b: Block = { id: "b1", nodeNumber: 1, name: "Блок", x: 400, y: 200, width: 210, height: 130, decompDiagramId: null };
    const target = findSnapTarget({ x: 395, y: 265 }, [b], [], 25);
    expect(target).toBeDefined();
    expect(target!.type).toBe("block");
    expect(target!.side).toBe("left");
  });
});

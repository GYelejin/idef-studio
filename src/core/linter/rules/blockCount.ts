import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../geometry';

/**
 * FR-LINT-01: Количество блоков на диаграмме декомпозиции (от 3 до 6 по РД IDEF0 - 2000),
 * а также проверка корректности размеров и положения блоков внутри листа.
 */
export const blockCountRule: LinterRule = {
  id: 'FR-LINT-01',
  name: 'Количество, размеры и положение функциональных блоков',
  description: 'Диаграмма декомпозиции должна содержать от 3 до 6 функциональных блоков, блоки должны находиться внутри листа и иметь допустимые размеры',
  category: 'syntax',
  defaultSeverity: 'warning',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];
    const isDecomp = diagram.parentBlockId !== null || (diagram.code !== 'A-0' && diagram.code !== 'A0');

    // 1. Проверка количества блоков
    if (isDecomp) {
      const blockCount = diagram.blocks.length;
      if (blockCount < 3 || blockCount > 6) {
        issues.push({
          id: `lint-01-${diagram.id}`,
          ruleId: 'FR-LINT-01',
          severity: 'warning',
          message: `Диаграмма декомпозиции содержит ${blockCount} блоков (рекомендуется от 3 до 6)`,
          elementId: diagram.id,
          elementType: 'diagram',
        });
      }
    }

    // 2. Проверка размеров и нахождения блоков внутри холста
    for (const b of diagram.blocks) {
      // Проверка минимальных/максимальных размеров
      if (b.width < 100 || b.height < 60) {
        issues.push({
          id: `lint-01-size-min-${b.id}`,
          ruleId: 'FR-LINT-01',
          severity: 'error',
          message: `Блок «${b.name.replace(/\n/g, ' ')}» имеет недопустимо малый размер (${b.width}x${b.height}px, минимум 100x60px)`,
          elementId: b.id,
          elementType: 'block',
          blockId: b.id,
        });
      }

      if (b.width > 800 || b.height > 600) {
        issues.push({
          id: `lint-01-size-max-${b.id}`,
          ruleId: 'FR-LINT-01',
          severity: 'warning',
          message: `Блок «${b.name.replace(/\n/g, ' ')}» имеет слишком большой размер (${b.width}x${b.height}px)`,
          elementId: b.id,
          elementType: 'block',
          blockId: b.id,
        });
      }

      // Проверка выхода за границы холста A4
      if (b.x < 20 || b.y < 30 || b.x + b.width > CANVAS_WIDTH - 20 || b.y + b.height > CANVAS_HEIGHT - 30) {
        issues.push({
          id: `lint-01-bounds-${b.id}`,
          ruleId: 'FR-LINT-01',
          severity: 'error',
          message: `Блок «${b.name.replace(/\n/g, ' ')}» выходит за границы холста`,
          elementId: b.id,
          elementType: 'block',
          blockId: b.id,
        });
      }
    }

    return issues;
  },
};

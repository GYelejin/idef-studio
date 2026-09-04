import { LinterRule, LinterContext } from '../types';
import { LinterIssue } from '../../../types/idef0';
import { isOrthogonal, CANVAS_WIDTH, CANVAS_HEIGHT } from '../../geometry';

/**
 * FR-LINT-03: Геометрия стрелок, ортогональность, нахождение внутри холста и точная привязка к сторонам блоков
 */
export const geometryOrthoRule: LinterRule = {
  id: 'FR-LINT-03',
  name: 'Ортогональность, границы холста и привязка стрелок',
  description: 'Все стрелки должны состоять из строго ортогональных сегментов, лежать целиком внутри листа A4 и строго привязываться к граням блоков',
  category: 'geometry',
  defaultSeverity: 'error',

  validate({ diagram }: LinterContext): LinterIssue[] {
    const issues: LinterIssue[] = [];

    for (const arrow of diagram.arrows) {
      // 1. Проверка существования блоков
      if (arrow.source.type === 'block' && arrow.source.id) {
        const exists = diagram.blocks.some(b => b.id === arrow.source.id);
        if (!exists) {
          issues.push({
            id: `lint-03-src-${arrow.id}`,
            ruleId: 'FR-LINT-03',
            severity: 'error',
            message: `Стрелка «${arrow.label || arrow.id}» ссылается на несуществующий блок-источник`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }
      }
      if (arrow.target.type === 'block' && arrow.target.id) {
        const exists = diagram.blocks.some(b => b.id === arrow.target.id);
        if (!exists) {
          issues.push({
            id: `lint-03-tgt-${arrow.id}`,
            ruleId: 'FR-LINT-03',
            severity: 'error',
            message: `Стрелка «${arrow.label || arrow.id}» ссылается на несуществующий блок-цель`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }
      }

      // 2. Проверка привязки к граням блоков (не висит в воздухе за пределами стороны блока)
      if (arrow.source.type === 'block' && arrow.source.id) {
        const b = diagram.blocks.find(blk => blk.id === arrow.source.id);
        if (b) {
          const pt = arrow.source.point || arrow.points[0];
          const side = arrow.source.side;
          if (side === 'top' || side === 'bottom') {
            if (pt.x < b.x - 1 || pt.x > b.x + b.width + 1) {
              issues.push({
                id: `lint-03-src-boundary-${arrow.id}`,
                ruleId: 'FR-LINT-03',
                severity: 'error',
                message: `Стрелка «${arrow.label || arrow.id}» начинается вне границ блока «${b.name.replace(/\n/g, ' ')}» (X=${pt.x} вне [${b.x}, ${b.x + b.width}])`,
                elementId: arrow.id,
                elementType: 'arrow',
                arrowId: arrow.id,
              });
            }
          } else if (side === 'left' || side === 'right') {
            if (pt.y < b.y - 1 || pt.y > b.y + b.height + 1) {
              issues.push({
                id: `lint-03-src-boundary-${arrow.id}`,
                ruleId: 'FR-LINT-03',
                severity: 'error',
                message: `Стрелка «${arrow.label || arrow.id}» начинается вне границ блока «${b.name.replace(/\n/g, ' ')}» (Y=${pt.y} вне [${b.y}, ${b.y + b.height}])`,
                elementId: arrow.id,
                elementType: 'arrow',
                arrowId: arrow.id,
              });
            }
          }
        }
      }

      if (arrow.target.type === 'block' && arrow.target.id) {
        const b = diagram.blocks.find(blk => blk.id === arrow.target.id);
        if (b) {
          const pt = arrow.target.point || arrow.points[arrow.points.length - 1];
          const side = arrow.target.side;
          if (side === 'top' || side === 'bottom') {
            if (pt.x < b.x - 1 || pt.x > b.x + b.width + 1) {
              issues.push({
                id: `lint-03-tgt-boundary-${arrow.id}`,
                ruleId: 'FR-LINT-03',
                severity: 'error',
                message: `Стрелка «${arrow.label || arrow.id}» оканчивается в воздухе вне границ блока «${b.name.replace(/\n/g, ' ')}» (X=${pt.x} вне [${b.x}, ${b.x + b.width}])`,
                elementId: arrow.id,
                elementType: 'arrow',
                arrowId: arrow.id,
              });
            }
          } else if (side === 'left' || side === 'right') {
            if (pt.y < b.y - 1 || pt.y > b.y + b.height + 1) {
              issues.push({
                id: `lint-03-tgt-boundary-${arrow.id}`,
                ruleId: 'FR-LINT-03',
                severity: 'error',
                message: `Стрелка «${arrow.label || arrow.id}» оканчивается в воздухе вне границ блока «${b.name.replace(/\n/g, ' ')}» (Y=${pt.y} вне [${b.y}, ${b.y + b.height}])`,
                elementId: arrow.id,
                elementType: 'arrow',
                arrowId: arrow.id,
              });
            }
          }
        }
      }

      // 3. Проверка ортогональности и нахождения точек стрелки внутри холста A4
      for (let i = 0; i < arrow.points.length - 1; i++) {
        const p1 = arrow.points[i];
        const p2 = arrow.points[i + 1];

        if (!isOrthogonal(p1, p2)) {
          issues.push({
            id: `lint-03-ortho-${arrow.id}-${i}`,
            ruleId: 'FR-LINT-03',
            severity: 'error',
            message: `Стрелка «${arrow.label || arrow.id}» содержит неортогональный сегмент (${p1.x},${p1.y}) -> (${p2.x},${p2.y})`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }

        if (
          p1.x < 15 || p1.x > CANVAS_WIDTH - 15 || p1.y < 20 || p1.y > CANVAS_HEIGHT - 20 ||
          p2.x < 15 || p2.x > CANVAS_WIDTH - 15 || p2.y < 20 || p2.y > CANVAS_HEIGHT - 20
        ) {
          issues.push({
            id: `lint-03-bounds-${arrow.id}-${i}`,
            ruleId: 'FR-LINT-03',
            severity: 'error',
            message: `Стрелка «${arrow.label || arrow.id}» выходит за пределы листа холста A4`,
            elementId: arrow.id,
            elementType: 'arrow',
            arrowId: arrow.id,
          });
        }
      }
    }

    return issues;
  },
};
